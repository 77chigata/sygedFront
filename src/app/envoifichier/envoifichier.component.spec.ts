import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvoifichierComponent } from './envoifichier.component';

describe('EnvoifichierComponent', () => {
  let component: EnvoifichierComponent;
  let fixture: ComponentFixture<EnvoifichierComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EnvoifichierComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvoifichierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
