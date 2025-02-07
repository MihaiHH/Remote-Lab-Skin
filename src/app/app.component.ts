import { Component } from '@angular/core';
import { MatToolbar } from '@angular/material/toolbar';
import { ControllerContainerComponent } from './controller-container/controller-container.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-root',
  imports: [MatToolbar, MatButtonModule,  ControllerContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Remote-Lab-Skin';
}
