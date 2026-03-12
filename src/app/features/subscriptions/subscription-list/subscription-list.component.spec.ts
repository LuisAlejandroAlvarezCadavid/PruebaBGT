import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SubscriptionListComponent } from './subscription-list.component';
import { SubscriptionsModule } from '../subscriptions.module';
import { UserService } from '../../../core/services/user.service';
import { TransactionService } from '../../../core/services/transaction.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { Subscription } from '../../../core/models/user.model';

const MOCK_SUBSCRIPTIONS: Subscription[] = [
  {
    fundId: 1,
    fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
    amount: 75000,
    notificationMethod: 'email',
    date: new Date(2026, 2, 10),
  },
];

describe('SubscriptionListComponent', () => {
  let component: SubscriptionListComponent;
  let fixture: ComponentFixture<SubscriptionListComponent>;
  let userServiceMock: any;
  let transactionServiceMock: any;
  let snackBarMock: any;
  let subscriptionsSubject: BehaviorSubject<Subscription[]>;

  beforeEach(async () => {
    subscriptionsSubject = new BehaviorSubject<Subscription[]>(MOCK_SUBSCRIPTIONS);

    userServiceMock = {
      subscriptions$: subscriptionsSubject.asObservable(),
      balance$: of(425000),
      removeSubscription: vi.fn().mockReturnValue(true),
    };

    transactionServiceMock = {
      addTransaction: vi.fn(),
    };

    snackBarMock = {
      open: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [SubscriptionsModule, NoopAnimationsModule, RouterModule.forRoot([])],
      providers: [
        { provide: UserService, useValue: userServiceMock },
        { provide: TransactionService, useValue: transactionServiceMock },
        { provide: MatSnackBar, useValue: snackBarMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SubscriptionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display page title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Mis Suscripciones');
  });

  it('should display subscribed fund', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('FPV_BTG_PACTUAL_RECAUDADORA');
  });

  it('should display formatted amount', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('75.000');
  });

  it('should display cancel button', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Cancelar suscripción');
  });

  it('should call removeSubscription on cancel', () => {
    component.onCancel(1, 'FPV_BTG_PACTUAL_RECAUDADORA', 75000);
    expect(userServiceMock.removeSubscription).toHaveBeenCalledWith(1);
  });

  it('should register cancellation transaction', () => {
    component.onCancel(1, 'FPV_BTG_PACTUAL_RECAUDADORA', 75000);
    expect(transactionServiceMock.addTransaction).toHaveBeenCalledWith({
      fundId: 1,
      fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
      type: 'cancellation',
      amount: 75000,
    });
  });

  it('should show success snackbar on cancel', () => {
    component.onCancel(1, 'FPV_BTG_PACTUAL_RECAUDADORA', 75000);
    expect(snackBarMock.open).toHaveBeenCalledWith(
      expect.stringContaining('cancelada exitosamente'),
      'Cerrar',
      expect.any(Object)
    );
  });

  it('should show empty state when no subscriptions', () => {
    subscriptionsSubject.next([]);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No tiene suscripciones activas');
  });

  it('should not register transaction if removal fails', () => {
    userServiceMock.removeSubscription.mockReturnValue(false);
    component.onCancel(999, 'NONEXISTENT', 50000);
    expect(transactionServiceMock.addTransaction).not.toHaveBeenCalled();
  });
});
