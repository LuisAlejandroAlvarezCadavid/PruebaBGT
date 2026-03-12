import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Transaction } from '../../../core/models';

/**
 * Componente reutilizable que muestra una tabla de transacciones.
 * Puede usarse en el historial completo o en vistas parciales.
 */
@Component({
  selector: 'app-transaction-table',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './transaction-table.component.html',
  styleUrl: './transaction-table.component.scss',
})
export class TransactionTableComponent {
  /** Lista de transacciones a mostrar */
  readonly transactions = input.required<Transaction[]>();

  /** Columnas visibles en la tabla */
  readonly displayedColumns = ['type', 'fundName', 'amount', 'date', 'notification'];
}
