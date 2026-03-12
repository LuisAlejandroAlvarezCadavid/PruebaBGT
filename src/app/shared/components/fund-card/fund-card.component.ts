import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { Fund } from '../../../core/models';

/**
 * Componente reutilizable que muestra la información de un fondo.
 * Puede mostrar un botón de acción configurable (suscribir, cancelar, etc.).
 */
@Component({
  selector: 'app-fund-card',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './fund-card.component.html',
  styleUrl: './fund-card.component.scss',
})
export class FundCardComponent {
  /** Fondo a mostrar */
  readonly fund = input.required<Fund>();
  /** Indica si el usuario está suscrito a este fondo */
  readonly isSubscribed = input<boolean>(false);
}
