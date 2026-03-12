import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SubscriptionsRoutingModule } from './subscriptions-routing.module';
import { SubscriptionListComponent } from './subscription-list/subscription-list.component';

/**
 * Módulo de la funcionalidad de suscripciones.
 * Incluye la lista de suscripciones activas con opción de cancelar.
 */
@NgModule({
  declarations: [
    SubscriptionListComponent,
  ],
  imports: [
    SharedModule,
    SubscriptionsRoutingModule,
  ],
})
export class SubscriptionsModule {}
