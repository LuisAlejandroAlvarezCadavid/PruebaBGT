import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

// Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatRadioModule } from '@angular/material/radio';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTooltipModule } from '@angular/material/tooltip';

// Componentes compartidos
import { BalanceCardComponent } from './components/balance-card/balance-card.component';
import { FundCardComponent } from './components/fund-card/fund-card.component';
import { TransactionTableComponent } from './components/transaction-table/transaction-table.component';

// Pipes
import { CopCurrencyPipe } from './pipes/cop-currency.pipe';

/** Módulos de Angular Material usados en la aplicación */
const MATERIAL_MODULES = [
  MatCardModule,
  MatButtonModule,
  MatIconModule,
  MatChipsModule,
  MatTableModule,
  MatDialogModule,
  MatRadioModule,
  MatToolbarModule,
  MatSnackBarModule,
  MatProgressSpinnerModule,
  MatTooltipModule,
];

/**
 * Módulo compartido que centraliza los imports de Angular Material,
 * componentes reutilizables y pipes de la aplicación.
 */
@NgModule({
  declarations: [
    BalanceCardComponent,
    FundCardComponent,
    TransactionTableComponent,
    CopCurrencyPipe,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
  ],
  exports: [
    // Re-exportar módulos para que estén disponibles en los feature modules
    CommonModule,
    ReactiveFormsModule,
    ...MATERIAL_MODULES,
    // Componentes compartidos
    BalanceCardComponent,
    FundCardComponent,
    TransactionTableComponent,
    CopCurrencyPipe,
  ],
})
export class SharedModule {}
