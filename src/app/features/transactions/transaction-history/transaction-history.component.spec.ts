import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionHistoryComponent } from './transaction-history.component';
import { TransactionsModule } from '../transactions.module';
import { TransactionService } from '../../../core/services/transaction.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BehaviorSubject } from 'rxjs';
import { Transaction } from '../../../core/models/transaction.model';

const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: 'txn-1',
    fundId: 1,
    fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
    type: 'subscription',
    amount: 75000,
    notificationMethod: 'email',
    date: new Date(2026, 2, 10),
  },
  {
    id: 'txn-2',
    fundId: 1,
    fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
    type: 'cancellation',
    amount: 75000,
    date: new Date(2026, 2, 11),
  },
];

describe('TransactionHistoryComponent', () => {
  let component: TransactionHistoryComponent;
  let fixture: ComponentFixture<TransactionHistoryComponent>;
  let transactionsSubject: BehaviorSubject<Transaction[]>;

  beforeEach(async () => {
    transactionsSubject = new BehaviorSubject<Transaction[]>(MOCK_TRANSACTIONS);

    const transactionServiceMock = {
      transactions$: transactionsSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      imports: [TransactionsModule, NoopAnimationsModule],
      providers: [
        { provide: TransactionService, useValue: transactionServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TransactionHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display page title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Historial de Transacciones');
  });

  it('should display transactions', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('FPV_BTG_PACTUAL_RECAUDADORA');
  });

  it('should show empty state when no transactions', () => {
    transactionsSubject.next([]);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No hay transacciones registradas');
  });
});
