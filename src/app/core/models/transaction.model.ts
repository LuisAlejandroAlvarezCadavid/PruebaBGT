/** Tipo de transacción */
export type TransactionType = 'subscription' | 'cancellation';

/** Método de notificación seleccionado */
export type NotificationMethod = 'email' | 'sms';

/** Representa una transacción de suscripción o cancelación */
export interface Transaction {
  id: string;
  fundId: number;
  fundName: string;
  type: TransactionType;
  amount: number;
  notificationMethod?: NotificationMethod;
  date: Date;
}
