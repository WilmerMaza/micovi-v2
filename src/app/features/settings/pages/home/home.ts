/**
 * Página raíz de configuración.
 *
 * Envuelve el sidenav de ajustes; sin lógica de negocio adicional.
 */
import { Component } from '@angular/core';
import { SidenavConf } from '../../components/sidenavconf/sidenavconf';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidenavConf],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
