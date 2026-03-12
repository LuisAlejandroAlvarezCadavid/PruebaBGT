import { NotificationMethod } from './transaction.model';

/** Representa la suscripción activa de un usuario a un fondo */
export interface Subscription {
  fundId: number;
  fundName: string;
  amount: number;
  notificationMethod: NotificationMethod;
  date: Date;
}

/** Representa el estado del usuario */
export interface User {
  id: string;
  name: string;
  balance: number;
  subscriptions: Subscription[];
}
