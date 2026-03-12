import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FundListComponent } from './fund-list.component';
import { FundsModule } from '../funds.module';
import { FundService } from '../../../core/services/fund.service';
import { UserService } from '../../../core/services/user.service';
import { TransactionService } from '../../../core/services/transaction.service';
import { BehaviorSubject, of } from 'rxjs';
import { Fund } from '../../../core/models/fund.model';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

const MOCK_FUNDS: Fund[] = [
  { id: 1, name: 'FPV_BTG_PACTUAL_RECAUDADORA', minAmount: 75000, category: 'FPV' },
  { id: 3, name: 'DEUDAPRIVADA', minAmount: 50000, category: 'FIC' },
];

describe('FundListComponent', () => {
  let component: FundListComponent;
  let fixture: ComponentFixture<FundListComponent>;
  let fundServiceMock: any;
  let userServiceMock: any;
  let transactionServiceMock: any;
  let dialogMock: any;
  let snackBarMock: any;

  beforeEach(async () => {
    const fundsSubject = new BehaviorSubject<Fund[]>(MOCK_FUNDS);
    fundServiceMock = {
      funds$: fundsSubject.asObservable(),
    } as any;

    userServiceMock = {
      isSubscribed: vi.fn().mockReturnValue(false),
      getBalance: vi.fn().mockReturnValue(500000),
      addSubscription: vi.fn().mockReturnValue(true),
      subscriptions$: of([]),
      balance$: of(500000),
    } as any;

    transactionServiceMock = {
      addTransaction: vi.fn(),
    } as any;

    dialogMock = {
      open: vi.fn().mockReturnValue({ afterClosed: () => of(undefined) }),
    } as any;

    snackBarMock = {
      open: vi.fn(),
    } as any;

    await TestBed.configureTestingModule({
      imports: [FundsModule, NoopAnimationsModule],
      providers: [
        { provide: FundService, useValue: fundServiceMock },
        { provide: UserService, useValue: userServiceMock },
        { provide: TransactionService, useValue: transactionServiceMock },
        { provide: MatDialog, useValue: dialogMock },
        { provide: MatSnackBar, useValue: snackBarMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FundListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display page title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Fondos Disponibles');
  });

  it('should display fund cards', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('FPV_BTG_PACTUAL_RECAUDADORA');
    expect(compiled.textContent).toContain('DEUDAPRIVADA');
  });

  it('should show subscribe buttons for non-subscribed funds', () => {
    const buttons = fixture.nativeElement.querySelectorAll('button');
    const subscribeButtons = Array.from(buttons as NodeListOf<HTMLElement>).filter(
      (btn) => btn.textContent?.includes('Suscribirse')
    );
    expect(subscribeButtons.length).toBe(2);
  });

  it('should call isSubscribed for each fund', () => {
    expect(userServiceMock.isSubscribed).toHaveBeenCalled();
  });

  it('should open dialog on subscribe click', () => {
    component.onSubscribe(MOCK_FUNDS[0]);
    expect(dialogMock.open).toHaveBeenCalled();
  });

  it('should process subscription when dialog returns result', () => {
    const dialogResult = { fundId: 1, notificationMethod: 'email' as const };
    dialogMock.open.mockReturnValue({
      afterClosed: () => of(dialogResult),
    } as any);

    component.onSubscribe(MOCK_FUNDS[0]);

    expect(userServiceMock.addSubscription).toHaveBeenCalled();
    expect(transactionServiceMock.addTransaction).toHaveBeenCalled();
    expect(snackBarMock.open).toHaveBeenCalled();
  });

  it('should show error snackbar when subscription fails', () => {
    userServiceMock.addSubscription.mockReturnValue(false);
    const dialogResult = { fundId: 1, notificationMethod: 'email' as const };
    dialogMock.open.mockReturnValue({
      afterClosed: () => of(dialogResult),
    } as any);

    component.onSubscribe(MOCK_FUNDS[0]);

    expect(snackBarMock.open).toHaveBeenCalledWith(
      expect.stringContaining('No tiene saldo disponible'),
      'Cerrar',
      expect.any(Object)
    );
  });
});
