/**
 * Placeholder del router-outlet del shell home.
 *
 * Variantes según ruta destino: dashboard (KPI/banner) o tabla (listados).
 * Solo presentación; el delay de aparición lo controla el layout padre.
 */
import { Component, input } from '@angular/core';
import { TableSkeletonComponent } from '../../../../shared/components/table-skeleton/table-skeleton';

export type OutletPlaceholderVariant = 'dashboard' | 'table';

@Component({
  selector: 'app-outlet-placeholder',
  standalone: true,
  imports: [TableSkeletonComponent],
  templateUrl: './outlet-placeholder.html',
  styleUrl: './outlet-placeholder.scss',
})
export class OutletPlaceholder {
  readonly variant = input<OutletPlaceholderVariant>('dashboard');
}
