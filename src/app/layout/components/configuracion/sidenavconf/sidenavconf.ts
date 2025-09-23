import {Component} from '@angular/core';
import { MatListModule } from '@angular/material/list';
import {MatSidenavModule} from '@angular/material/sidenav';
import { RouterModule } from '@angular/router';

/** @title Basic drawer */
@Component({
  standalone: true,
  selector: 'app-sidenav-conf',
  templateUrl: './sidenavconf.html',
  styleUrl: './sidenavconf.scss',
  imports: [MatSidenavModule, MatListModule, RouterModule],
})
export class SidenavConf {}

