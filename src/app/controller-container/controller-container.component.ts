import { Component } from '@angular/core';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-controller-container',
  imports: [
    MatSidenav,
    MatTab,
    MatSidenavContent,
    MatTabGroup,
    MatSidenavContainer,
    MatTooltip,
  ],
  templateUrl: './controller-container.component.html',
  styleUrl: './controller-container.component.scss',
})
export class ControllerContainerComponent {
  isSidenavOpen: boolean = true;

  toggleSidenav(sidenav: any): void {
    sidenav.toggle();
    this.isSidenavOpen = sidenav.opened;
  }
}
