import { NgModule, ModuleWithProviders } from '@angular/core';
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
  MatSidenavModule,
  MatTabsModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatTooltipModule} from '@angular/material';

import { ShareModalComponent } from './component/share-modal/share-modal.component'
import { DatabaseService } from './service/database/database.service';
import { TmdbService } from './service/tmdb/tmdb.service';

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
    CdkTableModule,
    MatSidenavModule,
    MatTabsModule,
    MatSelectModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ShareModalComponent,
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
    CdkTableModule,
    MatSidenavModule,
    MatProgressSpinnerModule,
    MatTabsModule,
    MatTableModule,
    MatTooltipModule,
    MatSelectModule
  ],
  declarations: [
    ShareModalComponent
  ],
  entryComponents: [
    ShareModalComponent
  ],
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [
        DatabaseService,
        TmdbService
      ]
    }
  }

}
