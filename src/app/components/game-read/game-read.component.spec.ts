import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameReadComponent } from './game-read.component';

describe('GameReadComponent', () => {
  let component: GameReadComponent;
  let fixture: ComponentFixture<GameReadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameReadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GameReadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
