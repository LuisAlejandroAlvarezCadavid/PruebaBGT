import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';

/**
 * Módulo de la funcionalidad de transacciones.
 * Incluye el historial de suscripciones y cancelaciones.
 */
@NgModule({
  declarations: [
    TransactionHistoryComponent,
  ],
  imports: [
    SharedModule,
    TransactionsRoutingModule,
  ],
})
export class TransactionsModule {}
