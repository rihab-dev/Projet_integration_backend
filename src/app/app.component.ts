import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <header>
      <nav>
        <ul>
          <li><a routerLink="/list" routerLinkActive="active">Liste des locations</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    header {
      background: #007bff;
      padding: 1rem;
    }
    
    nav ul {
      list-style: none;
      margin: 0;
      padding: 0;
      display: flex;
      gap: 1rem;
    }
    
    nav a {
      color: white;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 4px;
    }
    
    nav a:hover {
      background: rgba(255, 255, 255, 0.1);
    }
    
    nav a.active {
      background: rgba(255, 255, 255, 0.2);
    }
    
    main {
      padding: 2rem;
    }
  `]
})
export class AppComponent {
  title = 'locations-app';
}