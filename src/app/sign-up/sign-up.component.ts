import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/index';
import { MdSnackBar, MdSnackBarConfig } from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  error: string;
  constructor(private authService: AuthService, private router: Router, private snackbar: MdSnackBar) { }

  onSubmit(formData) {
    this.authService.signUp(formData, (error) => {
      if (error) {
        this.error = error
        this.snackbar.open(this.error, 'hide', { duration: 10000 })
      }
      else {
        this.authService.readUser().subscribe(authData => {
          if (authData) {
            this.snackbar.open('✓ Welcome ' + authData.displayName, 'Your account was been created', { duration: 5000 })
            this.router.navigate(['/index'])
          }
        })
      }
    })
  }

  ngOnInit() {

  }
}
