import { TestBed } from '@angular/core/testing';
import { FundService } from './fund.service';

describe('FundService', () => {
  let service: FundService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FundService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should emit 5 initial funds', () => {
    let funds: any[] = [];
    service.funds$.subscribe(f => funds = f);
    expect(funds.length).toBe(5);
  });

  it('should have FPV_BTG_PACTUAL_RECAUDADORA as first fund', () => {
    let funds: any[] = [];
    service.funds$.subscribe(f => funds = f);
    expect(funds[0].name).toBe('FPV_BTG_PACTUAL_RECAUDADORA');
    expect(funds[0].minAmount).toBe(75000);
    expect(funds[0].category).toBe('FPV');
  });

  it('should return fund by id', () => {
    const fund = service.getFundById(3);
    expect(fund).toBeDefined();
    expect(fund!.name).toBe('DEUDAPRIVADA');
    expect(fund!.category).toBe('FIC');
  });

  it('should return undefined for non-existent fund id', () => {
    const fund = service.getFundById(999);
    expect(fund).toBeUndefined();
  });

  it('should have correct min amounts for all funds', () => {
    const expectedAmounts: Record<number, number> = {
      1: 75000,
      2: 125000,
      3: 50000,
      4: 250000,
      5: 100000,
    };

    for (const [id, amount] of Object.entries(expectedAmounts)) {
      const fund = service.getFundById(Number(id));
      expect(fund?.minAmount).toBe(amount);
    }
  });
});
