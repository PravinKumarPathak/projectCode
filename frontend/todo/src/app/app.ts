import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {Welcome} from './welcome/welcome';
import {Login} from './login/login';
import { Menu } from './menu/menu';
import { Footer } from './footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
            Welcome,
            Login,
            Menu,
            Footer
          ],
  templateUrl: './app.html',
  // template: '<h1>{{title()}}</h1>',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo');
  message = 'Welcome to in28Minutes';
}

