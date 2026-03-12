import { TestBed } from '@angular/core/testing';
import { UserService } from './user.service';
import { Subscription } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;

  const mockSubscription: Subscription = {
    fundId: 1,
    fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
    amount: 75000,
    notificationMethod: 'email',
    date: new Date(),
  };

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('initial state', () => {
    it('should have initial balance of 500000', () => {
      expect(service.getBalance()).toBe(500000);
    });

    it('should emit initial balance via balance$', () => {
      let balance = 0;
      service.balance$.subscribe(b => balance = b);
      expect(balance).toBe(500000);
    });

    it('should have no subscriptions initially', () => {
      let subs: Subscription[] = [];
      service.subscriptions$.subscribe(s => subs = s);
      expect(subs.length).toBe(0);
    });

    it('should not be subscribed to any fund initially', () => {
      expect(service.isSubscribed(1)).toBe(false);
    });
  });

  describe('addSubscription', () => {
    it('should add subscription and deduct balance', () => {
      const result = service.addSubscription(mockSubscription);
      expect(result).toBe(true);
      expect(service.getBalance()).toBe(500000 - 75000);
      expect(service.isSubscribed(1)).toBe(true);
    });

    it('should emit updated subscriptions', () => {
      service.addSubscription(mockSubscription);
      let subs: Subscription[] = [];
      service.subscriptions$.subscribe(s => subs = s);
      expect(subs.length).toBe(1);
      expect(subs[0].fundId).toBe(1);
    });

    it('should not allow duplicate subscription', () => {
      service.addSubscription(mockSubscription);
      const result = service.addSubscription(mockSubscription);
      expect(result).toBe(false);
    });

    it('should not allow subscription with insufficient balance', () => {
      const expensiveSub: Subscription = {
        fundId: 99,
        fundName: 'EXPENSIVE_FUND',
        amount: 600000,
        notificationMethod: 'sms',
        date: new Date(),
      };
      const result = service.addSubscription(expensiveSub);
      expect(result).toBe(false);
      expect(service.getBalance()).toBe(500000);
    });

    it('should allow multiple different subscriptions', () => {
      service.addSubscription(mockSubscription);

      const secondSub: Subscription = {
        fundId: 3,
        fundName: 'DEUDAPRIVADA',
        amount: 50000,
        notificationMethod: 'sms',
        date: new Date(),
      };
      const result = service.addSubscription(secondSub);
      expect(result).toBe(true);
      expect(service.getBalance()).toBe(500000 - 75000 - 50000);
    });
  });

  describe('removeSubscription', () => {
    it('should remove subscription and restore balance', () => {
      service.addSubscription(mockSubscription);
      const result = service.removeSubscription(1);
      expect(result).toBe(true);
      expect(service.getBalance()).toBe(500000);
      expect(service.isSubscribed(1)).toBe(false);
    });

    it('should return false for non-existent subscription', () => {
      const result = service.removeSubscription(999);
      expect(result).toBe(false);
    });

    it('should emit updated subscriptions after removal', () => {
      service.addSubscription(mockSubscription);
      service.removeSubscription(1);
      let subs: Subscription[] = [];
      service.subscriptions$.subscribe(s => subs = s);
      expect(subs.length).toBe(0);
    });
  });
});
