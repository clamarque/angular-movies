import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesAddModalComponent } from './categories-add-modal.component';

describe('CategoriesAddModalComponent', () => {
  let component: CategoriesAddModalComponent;
  let fixture: ComponentFixture<CategoriesAddModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesAddModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesAddModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
