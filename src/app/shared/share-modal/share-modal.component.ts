import { Component, Inject } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';


@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss']
})
export class ShareModalComponent {

  constructor(
    public dialogRef: MatDialogRef<ShareModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  copyLink(movieId) {
    const inputElement = document.getElementById('inputId');
    (<any>inputElement).select();
    document.execCommand('copy');
    inputElement.blur();
    this.snackBar.open('The link has been copied', null, { duration: 2000});
    this.dialogRef.close();
  }

}
