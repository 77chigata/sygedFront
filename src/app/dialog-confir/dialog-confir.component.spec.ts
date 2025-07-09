import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirComponent } from './dialog-confir.component';

describe('DialogConfirComponent', () => {
  let component: DialogConfirComponent;
  let fixture: ComponentFixture<DialogConfirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogConfirComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogConfirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
