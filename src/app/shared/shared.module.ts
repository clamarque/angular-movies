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
  MatSelectModule,
  MatListModule,
  MatProgressBarModule,
  MatCardModule,
  MatSidenavModule,
  MatTabsModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatTooltipModule} from '@angular/material';


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
    MatTabsModule,
    MatSelectModule
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
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTableModule,
    MatTooltipModule,
    MatSelectModule
  ]
})
export class SharedModule { }
