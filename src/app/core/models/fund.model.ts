/** Categoría de fondo */
export type FundCategory = 'FPV' | 'FIC';

/** Representa un fondo de inversión disponible */
export interface Fund {
  id: number;
  name: string;
  minAmount: number;
  category: FundCategory;
}
