import { Component, ViewEncapsulation } from '@angular/core';
import {
  MatSidenavModule,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatTabsModule, MatTabGroup } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  AVAILABLE_CONTROLLERS,
  ESP32_CODE_EXAMPLE,
  EXAMPLE_CODES,
} from '../../constants/code-examples.constants';
import { MatListItem, MatNavList } from '@angular/material/list';
import { ControllerCodeEditorComponent } from '../controller-code-editor/controller-code-editor.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDivider, MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import {MatMenuModule, MatMenuTrigger} from '@angular/material/menu';



@Component({
  selector: 'app-controller-container',
  imports: [
    MatSidenavModule,
    MatTabsModule,
    MatSidenavContent,
    MatTabGroup,
    MatSidenavContainer,
    MatTooltipModule,
    MatNavList,
    MatListItem,
    ControllerCodeEditorComponent,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatDivider,
    MatMenuModule,
    MatMenuTrigger
  ],
  templateUrl: './controller-container.component.html',
  styleUrl: './controller-container.component.scss',
})
export class ControllerContainerComponent {
  /** TODO Añadir funcionalidad de ocua mostrar sidenav */
  // isSidenavOpen: boolean = true;
  code = ESP32_CODE_EXAMPLE;
  exampleCodes = EXAMPLE_CODES;
  availableControllers = AVAILABLE_CONTROLLERS;

  /** TODO Añadir funcionalidad de ocua mostrar sidenav */
  // toggleSidenav(sidenav: any): void {
  //   sidenav.toggle();
  //   this.isSidenavOpen = sidenav.opened;
  // }
}
