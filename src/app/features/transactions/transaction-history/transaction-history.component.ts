import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { Transaction } from '../../../core/models';
import { TransactionService } from '../../../core/services';

/**
 * Componente que muestra el historial completo de transacciones.
 * Incluye suscripciones y cancelaciones con sus detalles.
 */
@Component({
  selector: 'app-transaction-history',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.scss',
})
export class TransactionHistoryComponent {
  /** Historial de transacciones */
  readonly transactions$: Observable<Transaction[]>;

  constructor(private readonly transactionService: TransactionService) {
    this.transactions$ = this.transactionService.transactions$;
  }
}
