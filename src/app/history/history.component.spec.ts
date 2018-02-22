import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MatPaginatorModule, MatSnackBarModule, MatTableModule, MatProgressSpinnerModule, MatIconModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk/table';

import { HistoryComponent } from './history.component';

import { DatabaseService } from '../shared/database/database.service';
import { AngularFireAuthModule } from 'angularfire2/auth';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        CdkTableModule,
        MatIconModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSnackBarModule,
        MatTableModule,
        RouterTestingModule
      ],
      declarations: [ HistoryComponent ],
      providers: [
        DatabaseService,
        AngularFireAuthModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
