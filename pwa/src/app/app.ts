import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { MatCheckbox } from '@angular/material/checkbox';
import { MatToolbar } from '@angular/material/toolbar';
@Component({
  selector: 'app-root',
  imports: [RouterOutlet,HttpClientModule,MatCheckbox, MatToolbar],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('pwa');
}
