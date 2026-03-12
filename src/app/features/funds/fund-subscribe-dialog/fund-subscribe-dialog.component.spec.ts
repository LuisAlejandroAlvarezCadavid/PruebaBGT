import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FundSubscribeDialogComponent, SubscribeDialogData } from './fund-subscribe-dialog.component';
import { FundsModule } from '../funds.module';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('FundSubscribeDialogComponent', () => {
  let component: FundSubscribeDialogComponent;
  let fixture: ComponentFixture<FundSubscribeDialogComponent>;
  let dialogRefMock: { close: ReturnType<typeof vi.fn> };

  const mockData: SubscribeDialogData = {
    fund: {
      id: 1,
      name: 'FPV_BTG_PACTUAL_RECAUDADORA',
      minAmount: 75000,
      category: 'FPV',
    },
    currentBalance: 500000,
  };

  async function createComponent(data: SubscribeDialogData = mockData) {
    dialogRefMock = { close: vi.fn() };

    await TestBed.configureTestingModule({
      imports: [FundsModule, NoopAnimationsModule],
      providers: [
        { provide: MAT_DIALOG_DATA, useValue: data },
        { provide: MatDialogRef, useValue: dialogRefMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(FundSubscribeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }

  describe('with sufficient balance', () => {
    beforeEach(() => createComponent());

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should display fund name', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('FPV_BTG_PACTUAL_RECAUDADORA');
    });

    it('should display fund category', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('FPV');
    });

    it('should display formatted min amount', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('75.000');
    });

    it('should display current balance', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('500.000');
    });

    it('should have hasSufficientBalance as true', () => {
      expect(component.hasSufficientBalance).toBe(true);
    });

    it('should show notification selector', () => {
      const radios = fixture.nativeElement.querySelectorAll('mat-radio-button');
      expect(radios.length).toBe(2);
    });

    it('should show confirm button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('Confirmar suscripción');
    });

    it('should not confirm with invalid form', () => {
      component.onConfirm();
      expect(dialogRefMock.close).not.toHaveBeenCalled();
    });

    it('should confirm with valid notification selection', () => {
      component.notificationControl.setValue('email');
      component.onConfirm();
      expect(dialogRefMock.close).toHaveBeenCalledWith({
        fundId: 1,
        notificationMethod: 'email',
      });
    });

    it('should confirm with SMS notification', () => {
      component.notificationControl.setValue('sms');
      component.onConfirm();
      expect(dialogRefMock.close).toHaveBeenCalledWith({
        fundId: 1,
        notificationMethod: 'sms',
      });
    });
  });

  describe('with insufficient balance', () => {
    beforeEach(() => createComponent({
      fund: { id: 4, name: 'FDO-ACCIONES', minAmount: 250000, category: 'FIC' },
      currentBalance: 100000,
    }));

    it('should have hasSufficientBalance as false', () => {
      expect(component.hasSufficientBalance).toBe(false);
    });

    it('should show error message', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).toContain('No tiene saldo disponible');
    });

    it('should not show confirm button', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.textContent).not.toContain('Confirmar suscripción');
    });

    it('should not show notification selector', () => {
      const radios = fixture.nativeElement.querySelectorAll('mat-radio-button');
      expect(radios.length).toBe(0);
    });
  });
});
