import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../../../core/services';

/**
 * Componente reutilizable que muestra el saldo actual del usuario.
 * Se actualiza reactivamente cuando cambia el saldo.
 */
@Component({
  selector: 'app-balance-card',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './balance-card.component.html',
  styleUrl: './balance-card.component.scss',
})
export class BalanceCardComponent {
  readonly balance$;

  constructor(private readonly userService: UserService) {
    this.balance$ = this.userService.balance$;
  }
}
