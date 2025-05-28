import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepectoireComponent } from './repectoire.component';

describe('RepectoireComponent', () => {
  let component: RepectoireComponent;
  let fixture: ComponentFixture<RepectoireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RepectoireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepectoireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

