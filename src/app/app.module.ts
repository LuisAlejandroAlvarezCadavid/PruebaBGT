import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { App } from './app';
import { LayoutModule } from './layout/layout.module';
import { SharedModule } from './shared/shared.module';

/**
 * Módulo raíz de la aplicación.
 * Configura el routing principal, importa los módulos globales
 * y declara el componente raíz.
 */
@NgModule({
  declarations: [App],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    SharedModule,
    LayoutModule,
  ],
  bootstrap: [App],
})
export class AppModule {}
