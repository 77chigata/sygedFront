import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutDocComponent } from './ajout-doc.component';

describe('AjoutDocComponent', () => {
  let component: AjoutDocComponent;
  let fixture: ComponentFixture<AjoutDocComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AjoutDocComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjoutDocComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
