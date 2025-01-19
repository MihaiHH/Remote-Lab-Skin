import { CodeEditor } from '@acrodata/code-editor';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AVAILABLE_EDITOR_LANGUAGES } from '../../constants/languages.constants';
import { CamDialogComponent } from '../cam-dialog/cam-dialog.component';

@Component({
  selector: 'app-controller-code-editor',
  imports: [CodeEditor, FormsModule, CamDialogComponent],
  templateUrl: './controller-code-editor.component.html',
  styleUrl: './controller-code-editor.component.scss',
})
export class ControllerCodeEditorComponent {
  @Input() code!: string;
  languages = AVAILABLE_EDITOR_LANGUAGES;
}
