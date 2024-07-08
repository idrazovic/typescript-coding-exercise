import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

import { ChatComponent } from './components/chat/chat.component';
import { CreateMessageComponent } from './components/create-message/create-message.component';
import { AuthService } from './services/auth.service';

@Component({
    selector: 'app-root',
    standalone: true,
    imports: [
        ChatComponent,
        CreateMessageComponent,
        RouterModule
    ],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    authService = inject(AuthService);
    router = inject(Router);

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }
}
