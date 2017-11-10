import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthService } from '../shared/index';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
})
export class ProfileComponent implements OnInit {
  displayName: string;
  email: string;
  emailVerified: boolean;
  photoURL: any;
  selectedOption: string;
  sub: Subscription;
  error: string;
 
  constructor(private authService: AuthService, private snackbar: MatSnackBar, private router: Router, private dialog: MatDialog) { }

  confirmDialog() {
    let dialogRef = this.dialog.open(DialogDeleteUser)
    //this.dialogRef = this.dialog.open(DialogDeleteUser, {
      //disableClose: true
    //});
     /*
    this.sub = this.dialogRef.afterClosed().subscribe(result => {
      this.dialogRef = null;
      if (result === 'yes') this.deleteAccount()
      else console.log('cancel')
    });*/
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') this.deleteAccount();
    })
  }
  deleteAccount() {
    this.authService.deleteDatafromUser()
    this.authService.deleteUser((error) => {
      if (error) {
        this.error = error
        this.snackbar.open(this.error, 'hide', { duration: 10000 })
      }
      else {
        this.snackbar.open('Good bye ! We hope that our site has pleased you.', '', { duration: 5000 })
        this.router.navigate(['/movies/now-playing'])
      }
    })
  }
  onSubmit(formData) {
    if (formData.valid) {
      this.authService.updateUser(formData, (error) => {
        if (error) {
          this.error = error
          this.snackbar.open(this.error, 'hide', { duration: 10000 })
        }
        else {
          this.snackbar.open('Success ! Your modifications was been applicated', '', { duration: 5000 })
          this.router.navigate(['/profile'])
        }
      })
    }
  }

  ngOnInit() {
    this.sub = this.authService.readUser().subscribe(authData => {
      if (authData) {
        this.displayName = authData.displayName
        this.email = authData.email;
        this.emailVerified = authData.emailVerified
        this.photoURL = authData.photoURL;
      }
    })
  }

  ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

@Component({
  selector: 'dialog-delete-user',
  template: ` 
  <h1 mat-dialog-title>Delete your account ?</h1>
    <button mat-raised-button color="primary" (click)="dialogRef.close('yes')">Yes</button>
    <button mat-raised-button color="primary" (click)="dialogRef.close('no')">No</button>
 `
})

export class DialogDeleteUser {
  constructor(public dialogRef: MatDialogRef<DialogDeleteUser>) { }

}