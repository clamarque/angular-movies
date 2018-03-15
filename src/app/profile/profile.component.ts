import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../core/auth/auth.service';
import { DatabaseService } from '../shared/database/database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {
  displayName: string;
  email: string;
  emailVerified: boolean;
  photoURL: any;
  notPhotoURL: string;
  selectedOption: string;
  sub: Subscription;
  error: string;

  constructor(
    private authService: AuthService,
    private databaseService: DatabaseService,
    private snackbar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog) { }

  deleteAccountDialog() {
    const dialogRef = this.dialog.open(DialogDeleteUser);
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'yes') { this.deleteAccount(); }
    });
  }
  deleteAccount() {
    this.authService.deleteUser((error) => {
      if (error) {
        this.error = error;
        this.snackbar.open(this.error, 'hide', { duration: 10000 });
      } else {
        this.snackbar.open('Good bye ! We hope that our site has pleased you.', '', { duration: 5000 });
        this.router.navigate(['/movies/list/now-playing']);
      }
    });
  }

  ngOnInit() {
    this.sub = this.authService.readUser().subscribe(authData => {
      if (authData) {
        this.displayName = authData.displayName;
        this.email = authData.email;
        this.emailVerified = authData.emailVerified;
        this.photoURL = authData.photoURL;
        this.notPhotoURL = authData.displayName.slice(0, 1);
      }
    });
  }

  ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

@Component({
  selector: 'app-dialog-delete-user',
  template: `
  <h1 mat-dialog-title>Delete your account ?</h1>
    <button mat-raised-button color="primary" (click)="dialogRef.close('yes')">Yes</button>
    <button mat-raised-button color="primary" (click)="dialogRef.close('no')">No</button>
 `
})

export class DialogDeleteUser {
  constructor(public dialogRef: MatDialogRef<DialogDeleteUser>) { }

}
