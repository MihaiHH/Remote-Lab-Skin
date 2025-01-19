import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { ControllerContainerComponent } from './controller-container/controller-container.component';

@Component({
  selector: 'app-root',
  imports: [MatToolbar, ControllerContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Remote-Lab-Skin';
}
