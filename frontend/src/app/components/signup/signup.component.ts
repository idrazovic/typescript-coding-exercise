import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [ReactiveFormsModule, RouterModule],
    templateUrl: './signup.component.html',
    styleUrl: './signup.component.css'
})

export class SignupComponent {
    authService = inject(AuthService);
    router = inject(Router);

    protected signupForm = new FormGroup({
        name: new FormControl('', [Validators.required]),
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
    })

    onSubmit() {
        if (this.signupForm.valid) {
            console.log(this.signupForm.value);
            this.authService.signup(this.signupForm.value)
                .subscribe({
                    next: (data: any) => {
                        console.log(data);
                        this.router.navigate(['/login']);
                    },
                    error: (err) => console.log(err)
                });
        }
    }
}