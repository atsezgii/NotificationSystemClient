import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../Shared/Services/auth.service';
import { LoginModel } from '../Shared/Models/login';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private router: Router,private authService: AuthService) {}
  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }
  onSubmit() {
    const credentials: LoginModel = this.loginForm.value;
    this.authService.login(credentials).subscribe({
      next: (response) => {
        console.log("response",response)
        // JWT token'ı localStorage veya sessionStorage'a kaydedin
        localStorage.setItem('accessToken', response.token);
        localStorage.setItem('expirationDate', response.expirationDate);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Login failed', err);
        alert('Login failed');
      },
    });
  }
}


