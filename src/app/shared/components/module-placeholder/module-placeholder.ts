/**
 * Página placeholder de un dominio aún no implementado.
 *
 * Copy desde `route.data` (title, description, status). Sirve para validar
 * rutas, breadcrumbs y permisos sin inventar tablas ni CRUDs.
 */
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-module-placeholder',
  standalone: true,
  templateUrl: './module-placeholder.html',
  styleUrl: './module-placeholder.scss',
})
export class ModulePlaceholderComponent {
  private readonly route = inject(ActivatedRoute);
  private readonly data = toSignal(this.route.data, {
    initialValue: this.route.snapshot.data,
  });

  readonly title = computed(
    () => (this.data()['title'] as string) ?? 'Módulo',
  );
  readonly description = computed(
    () =>
      (this.data()['description'] as string) ??
      'Esta sección formará parte del flujo de trabajo de Micovi.',
  );
  readonly status = computed(
    () =>
      (this.data()['status'] as string) ??
      'Este módulo será implementado posteriormente.',
  );
}
