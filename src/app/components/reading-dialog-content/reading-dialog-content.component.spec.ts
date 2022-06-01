import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingDialogContentComponent } from './reading-dialog-content.component';

describe('ReadingDialogContentComponent', () => {
  let component: ReadingDialogContentComponent;
  let fixture: ComponentFixture<ReadingDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingDialogContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
