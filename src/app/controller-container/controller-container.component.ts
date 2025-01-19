import { Component } from '@angular/core';
import {
  MatSidenav,
  MatSidenavContainer,
  MatSidenavContent,
} from '@angular/material/sidenav';
import { MatTab, MatTabGroup } from '@angular/material/tabs';
import { MatTooltip } from '@angular/material/tooltip';
import { CodeEditor } from '@acrodata/code-editor';
import { FormsModule } from '@angular/forms';
import { ESP32_CODE_EXAMPLE, EXAMPLE_CODES } from '../../constants/code-examples.constants';
import { AVAILABLE_EDITOR_LANGUAGES } from '../../constants/languages.constants';
import { MatListItem, MatNavList } from '@angular/material/list';

@Component({
  selector: 'app-controller-container',
  imports: [
    MatSidenav,
    MatTab,
    MatSidenavContent,
    MatTabGroup,
    MatSidenavContainer,
    MatTooltip,
    CodeEditor,
    FormsModule,
    MatNavList,
    MatListItem,
  ],
  templateUrl: './controller-container.component.html',
  styleUrl: './controller-container.component.scss',
})
export class ControllerContainerComponent {
  isSidenavOpen: boolean = true;
  value = ESP32_CODE_EXAMPLE;
  languages = AVAILABLE_EDITOR_LANGUAGES;
  exampleCodes = EXAMPLE_CODES;

  toggleSidenav(sidenav: any): void {
    sidenav.toggle();
    this.isSidenavOpen = sidenav.opened;
  }
}
