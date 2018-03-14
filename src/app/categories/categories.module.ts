import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
import { MatTabsModule, MatIconModule, MatTooltipModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    SharedModule
  ],
  declarations: [CategoriesComponent]
})
export class CategoriesModule { }
