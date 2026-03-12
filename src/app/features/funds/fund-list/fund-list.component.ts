import { Component, ChangeDetectionStrategy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { Fund, Subscription } from '../../../core/models';
import { FundService, UserService, TransactionService } from '../../../core/services';
import {
  FundSubscribeDialogComponent,
  SubscribeDialogData,
  SubscribeDialogResult,
} from '../fund-subscribe-dialog/fund-subscribe-dialog.component';

/**
 * Componente que muestra la lista de fondos disponibles.
 * Permite al usuario suscribirse a un fondo mediante un diálogo.
 */
@Component({
  selector: 'app-fund-list',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './fund-list.component.html',
  styleUrl: './fund-list.component.scss',
})
export class FundListComponent {
  /** Lista de fondos disponibles */
  readonly funds$: Observable<Fund[]>;

  constructor(
    private readonly fundService: FundService,
    private readonly userService: UserService,
    private readonly transactionService: TransactionService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar,
  ) {
    this.funds$ = this.fundService.funds$;
  }

  /** Verifica si el usuario está suscrito a un fondo */
  isSubscribed(fundId: number): boolean {
    return this.userService.isSubscribed(fundId);
  }

  /** Abre el diálogo de suscripción para un fondo */
  onSubscribe(fund: Fund): void {
    const dialogData: SubscribeDialogData = {
      fund,
      currentBalance: this.userService.getBalance(),
    };

    const dialogRef = this.dialog.open(FundSubscribeDialogComponent, {
      width: '480px',
      data: dialogData,
      disableClose: false,
    });

    dialogRef.afterClosed().subscribe((result: SubscribeDialogResult | undefined) => {
      if (result) {
        this.processSubscription(fund, result);
      }
    });
  }

  /** Procesa la suscripción después de confirmar el diálogo */
  private processSubscription(fund: Fund, result: SubscribeDialogResult): void {
    const subscription: Subscription = {
      fundId: fund.id,
      fundName: fund.name,
      amount: fund.minAmount,
      notificationMethod: result.notificationMethod,
      date: new Date(),
    };

    const success = this.userService.addSubscription(subscription);

    if (success) {
      this.transactionService.addTransaction({
        fundId: fund.id,
        fundName: fund.name,
        type: 'subscription',
        amount: fund.minAmount,
        notificationMethod: result.notificationMethod,
      });

      this.snackBar.open(
        `Suscripción exitosa al fondo ${fund.name}. Notificación por ${result.notificationMethod === 'email' ? 'Email' : 'SMS'}.`,
        'Cerrar',
        { duration: 5000, panelClass: 'success-snackbar' }
      );
    } else {
      this.snackBar.open(
        `No tiene saldo disponible para vincularse al fondo ${fund.name}`,
        'Cerrar',
        { duration: 5000, panelClass: 'error-snackbar' }
      );
    }
  }
}
