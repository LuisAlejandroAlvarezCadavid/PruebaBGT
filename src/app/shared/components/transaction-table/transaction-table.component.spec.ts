import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TransactionTableComponent } from './transaction-table.component';
import { SharedModule } from '../../shared.module';
import { Transaction } from '../../../core/models/transaction.model';
import { Component, NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  standalone: false,
  template: `<app-transaction-table [transactions]="transactions" />`,
})
class TestHostComponent {
  transactions: Transaction[] = [];
}

@NgModule({
  declarations: [TestHostComponent],
  imports: [SharedModule],
})
class TestModule {}

describe('TransactionTableComponent', () => {
  let hostFixture: ComponentFixture<TestHostComponent>;
  let hostComponent: TestHostComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestModule, NoopAnimationsModule],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
  });

  it('should create', () => {
    hostFixture.detectChanges();
    const table = hostFixture.nativeElement.querySelector('app-transaction-table');
    expect(table).toBeTruthy();
  });

  it('should show empty state when no transactions', () => {
    hostFixture.detectChanges();
    const compiled = hostFixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('No hay transacciones registradas');
  });

  it('should show table when transactions exist', () => {
    hostComponent.transactions = [
      {
        id: 'txn-1',
        fundId: 1,
        fundName: 'FPV_BTG_PACTUAL_RECAUDADORA',
        type: 'subscription',
        amount: 75000,
        notificationMethod: 'email',
        date: new Date(2026, 2, 11),
      },
    ];
    hostFixture.detectChanges();

    const table = hostFixture.nativeElement.querySelector('table');
    expect(table).toBeTruthy();
  });

  it('should display transaction fund name', () => {
    hostComponent.transactions = [
      {
        id: 'txn-1',
        fundId: 1,
        fundName: 'DEUDAPRIVADA',
        type: 'cancellation',
        amount: 50000,
        date: new Date(2026, 2, 11),
      },
    ];
    hostFixture.detectChanges();

    const compiled = hostFixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('DEUDAPRIVADA');
  });

  it('should display formatted amount', () => {
    hostComponent.transactions = [
      {
        id: 'txn-1',
        fundId: 1,
        fundName: 'FUND_A',
        type: 'subscription',
        amount: 125000,
        date: new Date(2026, 2, 11),
      },
    ];
    hostFixture.detectChanges();

    const compiled = hostFixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('125.000');
  });

  it('should display subscription type label', () => {
    hostComponent.transactions = [
      {
        id: 'txn-1',
        fundId: 1,
        fundName: 'FUND_A',
        type: 'subscription',
        amount: 50000,
        date: new Date(2026, 2, 11),
      },
    ];
    hostFixture.detectChanges();

    const compiled = hostFixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Suscripción');
  });

  it('should display cancellation type label', () => {
    hostComponent.transactions = [
      {
        id: 'txn-1',
        fundId: 1,
        fundName: 'FUND_A',
        type: 'cancellation',
        amount: 50000,
        date: new Date(2026, 2, 11),
      },
    ];
    hostFixture.detectChanges();

    const compiled = hostFixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Cancelación');
  });
});
