import { Component, ChangeDetectionStrategy, Inject } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Fund, NotificationMethod } from '../../../core/models';

/** Datos que recibe el diálogo de suscripción */
export interface SubscribeDialogData {
  fund: Fund;
  currentBalance: number;
}

/** Resultado del diálogo al confirmar */
export interface SubscribeDialogResult {
  fundId: number;
  notificationMethod: NotificationMethod;
}

/**
 * Diálogo modal para confirmar la suscripción a un fondo.
 * Muestra información del fondo, saldo actual y selector de notificación.
 */
@Component({
  selector: 'app-fund-subscribe-dialog',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './fund-subscribe-dialog.component.html',
  styleUrl: './fund-subscribe-dialog.component.scss',
})
export class FundSubscribeDialogComponent {
  /** Control del formulario para el método de notificación */
  readonly notificationControl = new FormControl<NotificationMethod | null>(null, Validators.required);

  /** Indica si el saldo es suficiente para suscribirse */
  readonly hasSufficientBalance: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) readonly data: SubscribeDialogData,
    private readonly dialogRef: MatDialogRef<FundSubscribeDialogComponent>,
  ) {
    this.hasSufficientBalance = this.data.currentBalance >= this.data.fund.minAmount;
  }

  /** Confirma la suscripción y cierra el diálogo con el resultado */
  onConfirm(): void {
    this.notificationControl.markAsTouched();
    if (this.notificationControl.valid) {
      const result: SubscribeDialogResult = {
        fundId: this.data.fund.id,
        notificationMethod: this.notificationControl.value!,
      };
      this.dialogRef.close(result);
    }
  }
}
