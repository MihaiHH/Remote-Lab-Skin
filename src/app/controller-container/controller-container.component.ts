import { Component } from '@angular/core';
import {
  MatSidenavModule,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatTabsModule, MatTabGroup } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  ESP32_CODE_EXAMPLE,
  EXAMPLE_CODES,
} from '../../constants/code-examples.constants';
import { MatListItem, MatNavList } from '@angular/material/list';
import { ControllerCodeEditorComponent } from '../controller-code-editor/controller-code-editor.component';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

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
