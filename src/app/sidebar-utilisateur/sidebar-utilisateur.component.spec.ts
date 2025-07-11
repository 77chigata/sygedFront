import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarUtilisateurComponent } from './sidebar-utilisateur.component';

describe('SidebarUtilisateurComponent', () => {
  let component: SidebarUtilisateurComponent;
  let fixture: ComponentFixture<SidebarUtilisateurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SidebarUtilisateurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidebarUtilisateurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
