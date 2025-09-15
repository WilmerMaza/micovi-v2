import {Component} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';

/** @title Basic drawer */
@Component({
  selector: 'app-sidenav-conf',
  templateUrl: './sidenavconf.html',
  styleUrl: './sidenavconf.scss',
  imports: [MatSidenavModule],
})
export class SidenavConf {}
