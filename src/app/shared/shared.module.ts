import { NgModule, ModuleWithProviders } from '@angular/core';
import { CdkTableModule } from '@angular/cdk/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedMaterialModule } from './shared-material.module';


import { ShareModalComponent } from './component/share-modal/share-modal.component'
import { DatabaseService } from './service/database/database.service';
import { TmdbService } from './service/tmdb/tmdb.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    CdkTableModule,
    SharedMaterialModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ShareModalComponent,
    CdkTableModule,
    SharedMaterialModule
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
