import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  imports: [CommonModule, FormsModule, MatInputModule, MatButtonModule, RouterModule],
  templateUrl: './sign-up.html',
  styleUrl: './sign-up.css'
})
export class SignUp {
  email: string = '';
  password: string = '';
  error: string = '';

  constructor(private router: Router, private authService: AuthService) {}

  async signUpEmail() {
    try {
      const result = await this.authService.signUpEmail(this.email, this.password);
      this.error = '';
      this.router.navigate(['/player-input']); // Redirect to login after sign up
    } catch (err: any) {
      this.error = err.message;
    }
  }

  async signInGoogle() {
    try {
      const result = await this.authService.signInGoogle();
      this.error = '';
      this.router.navigate(['/player-input']); // Redirect to login after sign up
    } catch (err: any) {
      this.error = err.message;
    }
  }
}
