/**
 * Contexto pegajoso del flujo entrenador (deportista → plan → ciclo → sesión).
 *
 * Vacío en esta etapa: el chip del header muestra «Sin ciclo activo».
 * Los módulos posteriores escribirán estas señales sin tocar el shell.
 */
import { computed, Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class TrainingContextService {
  readonly athleteId = signal<string | null>(null);
  readonly athleteName = signal<string | null>(null);
  readonly planId = signal<string | null>(null);
  readonly planName = signal<string | null>(null);
  readonly macrocicloId = signal<string | null>(null);
  readonly macrocicloName = signal<string | null>(null);
  readonly microcicloId = signal<string | null>(null);
  readonly microcicloName = signal<string | null>(null);
  readonly sessionId = signal<string | null>(null);
  readonly sessionName = signal<string | null>(null);

  readonly hasContext = computed(
    () =>
      !!this.athleteId() ||
      !!this.planId() ||
      !!this.microcicloId() ||
      !!this.sessionId(),
  );

  readonly chipLabel = computed(() => {
    const parts = [
      this.athleteName(),
      this.microcicloName(),
      this.sessionName(),
    ].filter((part): part is string => !!part);
    return parts.length ? parts.join(' · ') : 'Sin ciclo activo';
  });

  clear(): void {
    this.athleteId.set(null);
    this.athleteName.set(null);
    this.planId.set(null);
    this.planName.set(null);
    this.macrocicloId.set(null);
    this.macrocicloName.set(null);
    this.microcicloId.set(null);
    this.microcicloName.set(null);
    this.sessionId.set(null);
    this.sessionName.set(null);
  }
}
