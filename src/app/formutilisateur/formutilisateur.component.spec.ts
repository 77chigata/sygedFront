import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormutilisateurComponent } from './formutilisateur.component';

describe('FormutilisateurComponent', () => {
  let component: FormutilisateurComponent;
  let fixture: ComponentFixture<FormutilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormutilisateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormutilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
