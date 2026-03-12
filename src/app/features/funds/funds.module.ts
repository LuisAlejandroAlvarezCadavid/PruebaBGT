import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { FundsRoutingModule } from './funds-routing.module';
import { FundListComponent } from './fund-list/fund-list.component';
import { FundSubscribeDialogComponent } from './fund-subscribe-dialog/fund-subscribe-dialog.component';

/**
 * Módulo de la funcionalidad de fondos.
 * Incluye la lista de fondos y el diálogo de suscripción.
 */
@NgModule({
  declarations: [
    FundListComponent,
    FundSubscribeDialogComponent,
  ],
  imports: [
    SharedModule,
    FundsRoutingModule,
  ],
})
export class FundsModule {}
