import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Transaction } from '../models';

/**
 * Servicio para gestionar el historial de transacciones.
 * Registra suscripciones y cancelaciones con su fecha y detalles.
 */
@Injectable({ providedIn: 'root' })
export class TransactionService {
  private readonly transactionsSubject = new BehaviorSubject<Transaction[]>([]);

  /** Observable con el historial de transacciones */
  readonly transactions$: Observable<Transaction[]> = this.transactionsSubject.asObservable();

  /** Genera un ID único para cada transacción */
  private generateId(): string {
    return `txn-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }

  /** Registra una nueva transacción en el historial */
  addTransaction(transaction: Omit<Transaction, 'id' | 'date'>): Transaction {
    const newTransaction: Transaction = {
      ...transaction,
      id: this.generateId(),
      date: new Date(),
    };

    const current = this.transactionsSubject.getValue();
    this.transactionsSubject.next([newTransaction, ...current]);

    return newTransaction;
  }

  /** Obtiene todas las transacciones ordenadas por fecha (más reciente primero) */
  getTransactions(): Transaction[] {
    return this.transactionsSubject.getValue();
  }
}
