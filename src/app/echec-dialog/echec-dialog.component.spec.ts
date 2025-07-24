import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EchecDialogComponent } from './echec-dialog.component';

describe('EchecDialogComponent', () => {
  let component: EchecDialogComponent;
  let fixture: ComponentFixture<EchecDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EchecDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EchecDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
