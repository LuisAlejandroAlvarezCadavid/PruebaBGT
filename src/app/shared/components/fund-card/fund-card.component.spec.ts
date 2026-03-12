import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FundCardComponent } from './fund-card.component';
import { SharedModule } from '../../shared.module';
import { Fund } from '../../../core/models/fund.model';
import { Component, NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  standalone: false,
  template: `<app-fund-card [fund]="fund" [isSubscribed]="isSubscribed" />`,
})
class TestHostComponent {
  fund: Fund = {
    id: 1,
    name: 'FPV_BTG_PACTUAL_RECAUDADORA',
    minAmount: 75000,
    category: 'FPV',
  };
  isSubscribed = false;
}

@NgModule({
  declarations: [TestHostComponent],
  imports: [SharedModule],
})
class TestModule {}

describe('FundCardComponent', () => {
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
    const fundCard = hostFixture.nativeElement.querySelector('app-fund-card');
    expect(fundCard).toBeTruthy();
  });

  it('should display fund name', () => {
    hostFixture.detectChanges();
    const compiled = hostFixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('FPV_BTG_PACTUAL_RECAUDADORA');
  });

  it('should display fund category', () => {
    hostFixture.detectChanges();
    const compiled = hostFixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('FPV');
  });

  it('should display formatted min amount', () => {
    hostFixture.detectChanges();
    const compiled = hostFixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('75.000');
  });

  it('should show "Suscrito" badge when subscribed', () => {
    hostComponent.isSubscribed = true;
    hostFixture.detectChanges();
    const compiled = hostFixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('Suscrito');
  });

  it('should not show "Suscrito" badge when not subscribed', () => {
    hostFixture.detectChanges();
    const badge = hostFixture.nativeElement.querySelector('.subscribed-badge');
    expect(badge).toBeNull();
  });
});
