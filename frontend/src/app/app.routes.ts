import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./components/chat.component').then(m => m.ChatComponent),
    },
    {
        path: 'login',
        loadComponent: () => import('./components/login.component').then(m => m.LoginComponent)
    },
];
