import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayChallengeComponent } from './play-challenge.component';

describe('PlayChallengeComponent', () => {
  let component: PlayChallengeComponent;
  let fixture: ComponentFixture<PlayChallengeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlayChallengeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlayChallengeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
