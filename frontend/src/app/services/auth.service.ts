import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly baseUrl = 'http://127.0.0.1:3000';
    private readonly httpClient = inject(HttpClient);

    signup(data: any) {
        return this.httpClient.post(`${this.baseUrl}/auth/signup`, data);
    }

    login(data: any) {
        return this.httpClient.post<{ token: string, userId: string }>(`${this.baseUrl}/auth/login`, data)
            .pipe(tap((result) => {
                localStorage.setItem('token', JSON.stringify(result.token));
                localStorage.setItem('userId', JSON.stringify(result.userId));
            }));
    }

    logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}