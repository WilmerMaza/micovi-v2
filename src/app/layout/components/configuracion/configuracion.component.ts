import { Component } from '@angular/core';
import { SidenavConf } from './sidenavconf/sidenavconf';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http';
import { Nav } from '../nav/nav';


@Component({
  selector: 'app-configuracion',
  standalone: true,
  imports: [Nav, SidenavConf],
  templateUrl: './configuracion.component.html',
  styleUrls: ['./configuracion.component.scss']
})
export class ConfiguracionComponent {
  
}
bootstrapApplication(SidenavConf, {
  providers: [provideHttpClient()],
}).catch(err => console.error(err));

