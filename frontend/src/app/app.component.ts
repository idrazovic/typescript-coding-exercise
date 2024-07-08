import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { ChatComponent } from './components/chat.component';
import { CreateMessageComponent } from './components/create-message.component';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        ChatComponent,
        CreateMessageComponent,
        RouterModule
    ],
    template: `
    <div class="max-w-full mx-auto px-4">
        <div class="header">
            <a class="text-2xl px-4" routerLink="/chat">Chat App</a>
            <div>
                @if (this.authService.isLoggedIn()) {
                    <button class="ml-4" (click)="logout()">Logout</button>
                } @else {
                    <button class="ml-4" routerLink="/login">Sign in</button>
                }
            </div>
        </div>
      <router-outlet></router-outlet>
    </div>
  `,
    styles: `
    .header {
      height: 60px;
      background-color: rgb(96 165 250);
      color: white;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 20px;
    }
  `
})
export class AppComponent {
    authService = inject(AuthService);
    router = inject(Router);

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
