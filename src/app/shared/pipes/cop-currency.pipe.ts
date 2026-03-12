import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe para formatear valores numéricos en formato COP (pesos colombianos).
 * Ejemplo: 500000 → "$ 500.000"
 */
@Pipe({ name: 'copCurrency', standalone: false })
export class CopCurrencyPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value == null) {
      return '$ 0';
    }
    const formatted = value.toLocaleString('es-CO', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    });
    return `$ ${formatted}`;
  }
}
