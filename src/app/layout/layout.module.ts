import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';

/**
 * Módulo para los componentes de layout (header, footer, sidebar).
 */
@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    SharedModule,
    RouterModule,
  ],
  exports: [
    HeaderComponent,
  ],
})
export class LayoutModule {}
