import { NgModule } from '@angular/core';

import { AuthGuard } from './guard/auth.guard';
import { AuthService } from './auth/auth.service';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

@NgModule({
  imports: [
    AngularFireAuthModule,
    AngularFirestoreModule
  ],
  providers: [
    AuthGuard,
    AuthService
  ]
})
export class CoreModule { }
