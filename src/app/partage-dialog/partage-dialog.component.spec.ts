import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartageDialogComponent } from './partage-dialog.component';

describe('PartageDialogComponent', () => {
  let component: PartageDialogComponent;
  let fixture: ComponentFixture<PartageDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PartageDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartageDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
