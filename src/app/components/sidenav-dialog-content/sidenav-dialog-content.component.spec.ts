import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavDialogContentComponent } from './sidenav-dialog-content.component';

describe('SidenavDialogContentComponent', () => {
  let component: SidenavDialogContentComponent;
  let fixture: ComponentFixture<SidenavDialogContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SidenavDialogContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SidenavDialogContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
