import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MeasureDialogContentComponent } from './measure-dialog-content.component';

describe('MeasureDialogContentComponent', () => {
  let component: MeasureDialogContentComponent;
  let fixture: ComponentFixture<MeasureDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MeasureDialogContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MeasureDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
