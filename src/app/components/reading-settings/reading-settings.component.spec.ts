import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingSettingsComponent } from './reading-settings.component';

describe('ReadingSettingsComponent', () => {
  let component: ReadingSettingsComponent;
  let fixture: ComponentFixture<ReadingSettingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReadingSettingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadingSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
