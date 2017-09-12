import { NgModule } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '@angular/material';


@NgModule({
  imports: [
    CommonModule, FormsModule, MaterialModule, CdkTableModule
  ],
  exports: [ CommonModule, FormsModule, MaterialModule, CdkTableModule]
})
export class SharedModule { }