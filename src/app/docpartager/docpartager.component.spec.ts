import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DocpartagerComponent } from './docpartager.component';

describe('DocpartagerComponent', () => {
  let component: DocpartagerComponent;
  let fixture: ComponentFixture<DocpartagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DocpartagerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DocpartagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
