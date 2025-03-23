import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
// import { LoginComponent } from './auth/login/login.component';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'book-app';
}
