import { CodeEditor } from '@acrodata/code-editor';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AVAILABLE_EDITOR_LANGUAGES } from '../../constants/languages.constants';
import { CamDialogComponent } from '../cam-dialog/cam-dialog.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';

@Component({
  selector: 'app-controller-code-editor',
  imports: [CodeEditor, FormsModule, CamDialogComponent, MatIconModule, MatButtonModule, MatTooltip],
  templateUrl: './controller-code-editor.component.html',
  styleUrl: './controller-code-editor.component.scss',
})
export class ControllerCodeEditorComponent {
  @Input() code!: string;
  languages = AVAILABLE_EDITOR_LANGUAGES;
}
