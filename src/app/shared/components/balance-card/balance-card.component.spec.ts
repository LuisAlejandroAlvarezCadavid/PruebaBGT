import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BalanceCardComponent } from './balance-card.component';
import { SharedModule } from '../../shared.module';
import { UserService } from '../../../core/services/user.service';
import { BehaviorSubject } from 'rxjs';

describe('BalanceCardComponent', () => {
  let component: BalanceCardComponent;
  let fixture: ComponentFixture<BalanceCardComponent>;
  let balanceSubject: BehaviorSubject<number>;

  beforeEach(async () => {
    balanceSubject = new BehaviorSubject<number>(500000);

    const userServiceMock = {
      balance$: balanceSubject.asObservable(),
    };

    await TestBed.configureTestingModule({
      imports: [SharedModule],
      providers: [
        { provide: UserService, useValue: userServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BalanceCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the balance', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('500.000');
  });

  it('should display "Saldo disponible" label', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Saldo disponible');
  });

  it('should update when balance changes', () => {
    balanceSubject.next(300000);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('300.000');
  });
});
