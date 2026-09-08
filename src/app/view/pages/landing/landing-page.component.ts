/**
 * LandingPageComponent - Página pública de bienvenida de MiCOVI.
 *
 * Muestra hero con marca, planes de suscripción, sección de video
 * y footer con información de contacto. Botones enlazan al login.
 */
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing-page',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss',
})
export class LandingPageComponent {}
