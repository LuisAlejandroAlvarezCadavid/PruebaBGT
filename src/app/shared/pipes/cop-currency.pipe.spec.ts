import { CopCurrencyPipe } from './cop-currency.pipe';

describe('CopCurrencyPipe', () => {
  let pipe: CopCurrencyPipe;

  beforeEach(() => {
    pipe = new CopCurrencyPipe();
  });

  it('should create', () => {
    expect(pipe).toBeTruthy();
  });

  it('should format 500000 as "$ 500.000"', () => {
    expect(pipe.transform(500000)).toBe('$ 500.000');
  });

  it('should format 75000 as "$ 75.000"', () => {
    expect(pipe.transform(75000)).toBe('$ 75.000');
  });

  it('should format 0 as "$ 0"', () => {
    expect(pipe.transform(0)).toBe('$ 0');
  });

  it('should return "$ 0" for null', () => {
    expect(pipe.transform(null)).toBe('$ 0');
  });

  it('should return "$ 0" for undefined', () => {
    expect(pipe.transform(undefined)).toBe('$ 0');
  });

  it('should format 1000000 correctly', () => {
    expect(pipe.transform(1000000)).toBe('$ 1.000.000');
  });

  it('should format small values', () => {
    expect(pipe.transform(100)).toBe('$ 100');
  });
});
