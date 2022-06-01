import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChallengeDialogContentComponent } from './challenge-dialog-content.component';

describe('ChallengeDialogContentComponent', () => {
  let component: ChallengeDialogContentComponent;
  let fixture: ComponentFixture<ChallengeDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChallengeDialogContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChallengeDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
