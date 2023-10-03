import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditadosComponent } from './editados.component';

describe('EditadosComponent', () => {
  let component: EditadosComponent;
  let fixture: ComponentFixture<EditadosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditadosComponent]
    });
    fixture = TestBed.createComponent(EditadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
