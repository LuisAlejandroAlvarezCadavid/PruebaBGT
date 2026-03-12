import { Component, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../../core/services';

/**
 * Componente del header principal de la aplicación.
 * Incluye navegación y saldo del usuario.
 */
@Component({
  selector: 'app-header',
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  readonly balance$;

  constructor(private readonly userService: UserService) {
    this.balance$ = this.userService.balance$;
  }
}
