/**
 * Miga de pan del AppShell.
 *
 * Consume BreadcrumbService (ruta activa). Oculta el rastro cuando solo
 * está Inicio para no competir con el saludo del dashboard.
 */
import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbService } from '../../../../core/breadcrumbs/breadcrumb.service';

@Component({
  selector: 'app-shell-breadcrumb',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './breadcrumb.html',
  styleUrl: './breadcrumb.scss',
})
export class ShellBreadcrumb {
  readonly breadcrumbs = inject(BreadcrumbService);
}
