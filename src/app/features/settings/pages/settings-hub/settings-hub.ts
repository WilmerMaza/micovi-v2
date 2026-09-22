/**
 * Hub de Configuración (y sub-hub de catálogos).
 *
 * Lista densa al estilo de atajos del dashboard: no es un segundo shell ni
 * un inner-nav permanente. Las entradas se filtran por permiso.
 */
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { PermissionService } from '../../../../core/permissions/permission.service';
import {
  SETTINGS_HUBS,
  SettingsHubKey,
} from './settings-hub.config';

@Component({
  selector: 'app-settings-hub',
  standalone: true,
  imports: [RouterLink, MatIconModule],
  templateUrl: './settings-hub.html',
  styleUrl: './settings-hub.scss',
})
export class SettingsHub {
  private readonly route = inject(ActivatedRoute);
  private readonly permissions = inject(PermissionService);
  private readonly data = toSignal(this.route.data, {
    initialValue: this.route.snapshot.data,
  });

  private readonly definition = computed(() => {
    const key = (this.data()['hub'] as SettingsHubKey) ?? 'root';
    return SETTINGS_HUBS[key] ?? SETTINGS_HUBS.root;
  });

  readonly title = computed(() => this.definition().title);
  readonly description = computed(() => this.definition().description);
  readonly entries = computed(() =>
    this.definition().entries.filter((entry) =>
      this.permissions.hasAny(entry.permissions),
    ),
  );
}
