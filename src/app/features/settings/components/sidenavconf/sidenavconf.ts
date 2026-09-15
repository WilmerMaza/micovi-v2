/**
 * Sidenav de la pantalla de configuración.
 *
 * Layout denso alineado a tokens Micovi (lienzo/superficie).
 * El pie legal © vive aquí (no en el menú de perfil).
 * Sin lógica de negocio nueva: lista stub hasta features reales (P2).
 */
import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-sidenav-conf',
  templateUrl: './sidenavconf.html',
  styleUrl: './sidenavconf.scss',
  imports: [MatSidenavModule, MatListModule, RouterModule],
})
export class SidenavConf {}
