import { Component } from '@angular/core';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatTooltip } from '@angular/material/tooltip';
import {
  ESP32_CODE_EXAMPLE,
  EXAMPLE_CODES,
} from '../../constants/code-examples.constants';
import { MatListItem, MatNavList } from '@angular/material/list';
import { ControllerCodeEditorComponent } from '../controller-code-editor/controller-code-editor.component';

@Component({
  selector: 'app-controller-container',
  imports: [
    MatSidenav,
    MatTab,
    MatSidenavContent,
    MatTabGroup,
    MatSidenavContainer,
    MatTooltip,
    MatNavList,
    MatListItem,
    ControllerCodeEditorComponent,
  ],
  templateUrl: './controller-container.component.html',
  styleUrl: './controller-container.component.scss',
})
export class ControllerContainerComponent {
  isSidenavOpen: boolean = true;
  code = ESP32_CODE_EXAMPLE;
  exampleCodes = EXAMPLE_CODES;

  toggleSidenav(sidenav: any): void {
    sidenav.toggle();
    this.isSidenavOpen = sidenav.opened;
  }
}
