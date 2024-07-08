import { Component, inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router, RouterModule } from "@angular/router";

import { AuthService } from "../../services/auth.service";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [ReactiveFormsModule, RouterModule],
    templateUrl: './login.component.html',
    styleUrl: './login.component.css'
})

export class LoginComponent implements OnInit {
    authService = inject(AuthService);
    router = inject(Router);

    protected loginForm = new FormGroup({
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    })

    ngOnInit() {
        if (this.authService.isLoggedIn()) {
            this.router.navigate(['/chat']);
        }
    }

    onSubmit() {
        this.authService.login(this.loginForm.value)
            .subscribe((data: any) => {
                if (this.authService.isLoggedIn()) {
                    this.router.navigate(['/chat']);
                }
            });
    }
}