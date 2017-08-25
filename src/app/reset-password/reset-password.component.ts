import { Component } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../shared/index';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html'
})
export class ResetPasswordComponent {
  error: string;

  constructor(private router: Router, private authService: AuthService, private snackbar: MdSnackBar) { }

  onSubmit(formData) {
      this.authService.resetPasswordEmail(formData.email, (error) => {
        if (error) {
          this.error = error
          this.snackbar.open(this.error, 'hide', { duration: 10000 })
        }
        else {
          this.snackbar.open('Email sent', '', { duration: 5000 })
          this.router.navigate(['/movies/now-playing'])
        }
      })
  }
}