import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountDeleteModalComponent } from './account-delete-modal.component';
import { MatDialogModule, MatDialogRef } from '@angular/material';

describe('AccountDeleteModalComponent', () => {
  let component: AccountDeleteModalComponent;
  let fixture: ComponentFixture<AccountDeleteModalComponent>;

  const matDialogRef = jasmine.createSpyObj('MatDialogRef', ['afterClose']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatDialogModule
      ],
      declarations: [ AccountDeleteModalComponent ],
      providers: [
        { provide: MatDialogRef, useValue: matDialogRef },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountDeleteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
