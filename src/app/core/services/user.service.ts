import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { User, Subscription } from '../models';

/** Saldo inicial del usuario en COP */
const INITIAL_BALANCE = 500000;

/**
 * Servicio para gestionar el estado del usuario.
 * Maneja saldo, suscripciones activas y operaciones sobre ellas.
 */
@Injectable({ providedIn: 'root' })
export class UserService {
  private readonly userSubject = new BehaviorSubject<User>({
    id: 'user-001',
    name: 'Usuario BTG',
    balance: INITIAL_BALANCE,
    subscriptions: [],
  });

  /** Observable con el estado completo del usuario */
  readonly user$: Observable<User> = this.userSubject.asObservable();

  /** Observable con el saldo actual */
  readonly balance$: Observable<number> = this.user$.pipe(
    map(user => user.balance)
  );

  /** Observable con las suscripciones activas */
  readonly subscriptions$: Observable<Subscription[]> = this.user$.pipe(
    map(user => user.subscriptions)
  );

  /** Retorna el saldo actual del usuario */
  getBalance(): number {
    return this.userSubject.getValue().balance;
  }

  /** Verifica si el usuario está suscrito a un fondo */
  isSubscribed(fundId: number): boolean {
    return this.userSubject.getValue().subscriptions.some(s => s.fundId === fundId);
  }

  /**
   * Agrega una suscripción al usuario y descuenta el monto del saldo.
   * @returns true si la suscripción fue exitosa, false si no hay saldo suficiente o ya está suscrito.
   */
  addSubscription(subscription: Subscription): boolean {
    const user = this.userSubject.getValue();

    if (user.balance < subscription.amount) {
      return false;
    }

    if (this.isSubscribed(subscription.fundId)) {
      return false;
    }

    this.userSubject.next({
      ...user,
      balance: user.balance - subscription.amount,
      subscriptions: [...user.subscriptions, subscription],
    });

    return true;
  }

  /**
   * Cancela una suscripción y devuelve el monto al saldo.
   * @returns true si la cancelación fue exitosa.
   */
  removeSubscription(fundId: number): boolean {
    const user = this.userSubject.getValue();
    const subscription = user.subscriptions.find(s => s.fundId === fundId);

    if (!subscription) {
      return false;
    }

    this.userSubject.next({
      ...user,
      balance: user.balance + subscription.amount,
      subscriptions: user.subscriptions.filter(s => s.fundId !== fundId),
    });

    return true;
  }
}
