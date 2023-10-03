import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicionesComponent } from './ediciones.component';

describe('EdicionesComponent', () => {
  let component: EdicionesComponent;
  let fixture: ComponentFixture<EdicionesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EdicionesComponent]
    });
    fixture = TestBed.createComponent(EdicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
