import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PredefinedBooksPageComponent } from './predefined-books-page.component';

describe('PredefinedBooksPageComponent', () => {
  let component: PredefinedBooksPageComponent;
  let fixture: ComponentFixture<PredefinedBooksPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PredefinedBooksPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PredefinedBooksPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
