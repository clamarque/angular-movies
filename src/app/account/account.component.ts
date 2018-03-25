import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Subscription } from 'rxjs/Subscription';
import { AuthService } from '../core/auth/auth.service';
import { AccountDeleteModalComponent } from './account-delete-modal/account-delete-modal.component';
import * as moment from 'moment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit, OnDestroy {
  displayName: string;
  email: string;
  photoURL: any;
  notPhotoURL: string;
  sub: Subscription;
  creationTime: any;

  constructor(
    private authService: AuthService,
    private snackbar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.sub = this.authService.readUser().subscribe(authData => {
      if (authData) {
        this.displayName = authData.displayName;
        this.email = authData.email;
        this.photoURL = authData.photoURL;
        this.notPhotoURL = authData.displayName.slice(0, 1);
        this.creationTime = moment(authData.metadata['creationTime']).format('YYYY-MM-D');
      }
    });
  }

  ngOnDestroy() {
        this.sub.unsubscribe();
    }

  deleteAccountDialog() {
    const dialogRef = this.dialog.open(AccountDeleteModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.deleteUser(error => {
          if (error) {
            this.snackbar.open(error, 'hide', { duration: 5000})
          } else {
            this.snackbar.open('Good bye ! We hope that our site has pleased you.', '', { duration: 5000 });
            this.router.navigate(['/movies/list/now-playing']);
          }
        })
      }
    });
  }

}
