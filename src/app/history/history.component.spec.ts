import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryComponent } from './history.component';
import { MatPaginatorModule, MatSnackBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('HistoryComponent', () => {
  let component: HistoryComponent;
  let fixture: ComponentFixture<HistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatPaginatorModule,
        MatSnackBarModule,
        RouterTestingModule
      ],
      declarations: [ HistoryComponent ]
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
