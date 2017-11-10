import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { 
  MatToolbarModule, 
  MatButtonModule, 
  MatCheckboxModule,
  MatInputModule, 
  MatDialogModule,
  MatFormFieldModule,
  MatIconModule, 
  MatGridListModule,
  MatMenuModule, 
  MatSnackBarModule, 
  MatListModule, 
  MatProgressBarModule, 
  MatCardModule, 
  MatSidenavModule, 
  MatTabsModule,
  MatTableModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule,
    FormsModule, 
    MatDialogModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatCheckboxModule,
    MatInputModule, 
    MatFormFieldModule, 
    MatIconModule, 
    MatGridListModule, 
    MatMenuModule, 
    MatSnackBarModule, 
    MatListModule, 
    MatProgressBarModule, 
    MatCardModule, 
    CdkTableModule,
    MatSidenavModule,
    MatTabsModule
  ],
  exports: [ 
    CommonModule, 
    FormsModule, 
    MatDialogModule,
    MatToolbarModule, 
    MatButtonModule, 
    MatCheckboxModule,
    MatInputModule, 
    MatFormFieldModule, 
    MatIconModule, 
    MatGridListModule, 
    MatMenuModule, 
    MatSnackBarModule, 
    MatListModule, 
    MatProgressBarModule, 
    MatCardModule, 
    CdkTableModule, 
    MatSidenavModule, 
    MatTabsModule,
    MatTableModule]
})
export class SharedModule { }