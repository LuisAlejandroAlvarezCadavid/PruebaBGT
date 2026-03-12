import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Subscription } from '../../../core/models';
import { UserService, TransactionService } from '../../../core/services';

/**
 * Componente que muestra las suscripciones activas del usuario.
 * Permite cancelar suscripciones y recuperar el monto al saldo.
 */
@Component({
  selector: 'app-subscription-list',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './subscription-list.component.html',
  styleUrl: './subscription-list.component.scss',
})
export class SubscriptionListComponent {
  /** Suscripciones activas del usuario */
  readonly subscriptions$: Observable<Subscription[]>;

  constructor(
    private readonly userService: UserService,
    private readonly transactionService: TransactionService,
    private readonly snackBar: MatSnackBar,
  ) {
    this.subscriptions$ = this.userService.subscriptions$;
  }

  /** Cancela la suscripción a un fondo y devuelve el monto al saldo */
  onCancel(fundId: number, fundName: string, amount: number): void {
    const success = this.userService.removeSubscription(fundId);

    if (success) {
      this.transactionService.addTransaction({
        fundId,
        fundName,
        type: 'cancellation',
        amount,
      });

      this.snackBar.open(
        `Suscripción al fondo ${fundName} cancelada exitosamente.`,
        'Cerrar',
        { duration: 5000, panelClass: 'success-snackbar' }
      );
    }
  }
}
