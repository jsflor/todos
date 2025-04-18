import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  email = '';
  password = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    if (this.authService.register(this.email, this.password)) {
      this.router.navigate(['/home']);
    } else {
      this.error = 'Registration failed';
    }
  }
}
