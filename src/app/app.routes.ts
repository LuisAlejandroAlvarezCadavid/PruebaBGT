import { Routes } from '@angular/router';

/**
 * Rutas principales de la aplicación.
 * Los feature modules se cargan con lazy loading.
 */
export const routes: Routes = [
  {
    path: 'fondos',
    loadChildren: () => import('./features/funds/funds.module').then(m => m.FundsModule),
  },
  {
    path: 'suscripciones',
    loadChildren: () => import('./features/subscriptions/subscriptions.module').then(m => m.SubscriptionsModule),
  },
  {
    path: 'transacciones',
    loadChildren: () => import('./features/transactions/transactions.module').then(m => m.TransactionsModule),
  },
  {
    path: '',
    redirectTo: 'fondos',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'fondos',
  },
];
