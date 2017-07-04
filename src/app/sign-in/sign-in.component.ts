import { Component } from '@angular/core';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../shared/index';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent {

  error: string;
  sub: Subscription;

  constructor(private router: Router, private authService: AuthService, private snackbar: MdSnackBar) { }

  onSubmit(formData) {
    this.authService.signIn(formData.email, formData.password, (error) => {
      if (error) {
        this.error = error
        this.snackbar.open(this.error, 'hide', { duration: 10000 })
      }
      else {
        this.authService.readUser().subscribe(authData => {
          if (authData) {
            this.snackbar.open('Welcome ' + authData.displayName + ' !', '', { duration: 5000 })
            this.router.navigate(['/movies/now-playing'])
          }
        })
      }
    })
  }

  login(name: string) {
    this.authService.signInAccount(name, (error) => {
      if (error) {
        this.error = error
        this.snackbar.open(this.error, 'hide', { duration: 10000 })
      }
      else {
        this.sub = this.authService.readUser().subscribe(authData => {
          if (authData) {
            this.snackbar.open('Welcome ' + authData.displayName + ' !', '', { duration: 5000 })
            this.router.navigate(['/movies/now-playing'])
          }
        })
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}