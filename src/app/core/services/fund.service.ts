import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Fund } from '../models';

/** Datos iniciales de los fondos disponibles */
const INITIAL_FUNDS: Fund[] = [
  { id: 1, name: 'FPV_BTG_PACTUAL_RECAUDADORA', minAmount: 75000, category: 'FPV' },
  { id: 2, name: 'FPV_BTG_PACTUAL_ECOPETROL', minAmount: 125000, category: 'FPV' },
  { id: 3, name: 'DEUDAPRIVADA', minAmount: 50000, category: 'FIC' },
  { id: 4, name: 'FDO-ACCIONES', minAmount: 250000, category: 'FIC' },
  { id: 5, name: 'FPV_BTG_PACTUAL_DINAMICA', minAmount: 100000, category: 'FPV' },
];

/**
 * Servicio para gestionar los fondos de inversión disponibles.
 * Proporciona la lista de fondos como un observable reactivo.
 */
@Injectable({ providedIn: 'root' })
export class FundService {
  private readonly fundsSubject = new BehaviorSubject<Fund[]>(INITIAL_FUNDS);

  /** Observable con la lista de fondos disponibles */
  readonly funds$: Observable<Fund[]> = this.fundsSubject.asObservable();

  /** Obtiene un fondo por su ID */
  getFundById(id: number): Fund | undefined {
    return this.fundsSubject.getValue().find(fund => fund.id === id);
  }
}
