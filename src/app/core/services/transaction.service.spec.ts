import { TestBed } from '@angular/core/testing';
import { TransactionService } from './transaction.service';
import { Transaction } from '../models/transaction.model';

describe('TransactionService', () => {
  let service: TransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have no transactions initially', () => {
    let txns: Transaction[] = [];
    service.transactions$.subscribe(t => txns = t);
    expect(txns.length).toBe(0);
  });

  it('should add a subscription transaction', () => {
    const txn = service.addTransaction({
      fundId: 1,
      fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
      type: 'subscription',
      amount: 75000,
      notificationMethod: 'email',
    });

    expect(txn.id).toBeTruthy();
    expect(txn.date).toBeInstanceOf(Date);
    expect(txn.type).toBe('subscription');
    expect(txn.fundName).toBe('FPV_BTG_PACTUAL_RECAUDADORA');
  });

  it('should add a cancellation transaction', () => {
    const txn = service.addTransaction({
      fundId: 1,
      fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
      type: 'cancellation',
      amount: 75000,
    });

    expect(txn.type).toBe('cancellation');
    expect(txn.notificationMethod).toBeUndefined();
  });

  it('should emit transactions via observable', () => {
    service.addTransaction({
      fundId: 1,
      fundName: 'FUND_A',
      type: 'subscription',
      amount: 50000,
    });

    let txns: Transaction[] = [];
    service.transactions$.subscribe(t => txns = t);
    expect(txns.length).toBe(1);
  });

  it('should order most recent first', () => {
    service.addTransaction({
      fundId: 1,
      fundName: 'FIRST',
      type: 'subscription',
      amount: 50000,
    });
    service.addTransaction({
      fundId: 2,
      fundName: 'SECOND',
      type: 'subscription',
      amount: 100000,
    });

    const txns = service.getTransactions();
    expect(txns[0].fundName).toBe('SECOND');
    expect(txns[1].fundName).toBe('FIRST');
  });

  it('should generate unique IDs', () => {
    const txn1 = service.addTransaction({
      fundId: 1,
      fundName: 'A',
      type: 'subscription',
      amount: 50000,
    });
    const txn2 = service.addTransaction({
      fundId: 2,
      fundName: 'B',
      type: 'subscription',
      amount: 50000,
    });

    expect(txn1.id).not.toBe(txn2.id);
  });
});
