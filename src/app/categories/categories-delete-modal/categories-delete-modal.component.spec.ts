import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesDeleteModalComponent } from './categories-delete-modal.component';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule, MatDialogModule, MAT_DIALOG_DATA, MatDialogRef, MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CategoriesDeleteModalComponent', () => {
  let component: CategoriesDeleteModalComponent;
  let fixture: ComponentFixture<CategoriesDeleteModalComponent>;

  const matDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClose']);
  const matDialogData = jasmine.createSpyObj('MAT_DIALOG_DATA', ['']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        FormsModule,
        MatDialogModule,
        MatFormFieldModule,
        MatInputModule
      ],
      declarations: [ CategoriesDeleteModalComponent ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: matDialogData }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
