import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {
  error: string;

  constructor(
    private router: Router,
    private authService: AuthService,
    private snackbar: MatSnackBar) { }

  login(name: string) {
    this.authService.oAuthLogin(name, (error) => {
      if (error) {
        this.error = error;
        this.snackbar.open(this.error, 'hide', { duration: 10000 });
      } else {
        this.authService.readUser().subscribe(authData => {
          if (authData) {
            this.snackbar.open('Welcome ' + authData.displayName + ' !', '', { duration: 5000 });
            this.router.navigate(['/movies/list/now-playing']);
          }
        });
      }
    });
  }
}
