import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlquilanComponent } from './alquilan.component';

describe('AlquilanComponent', () => {
  let component: AlquilanComponent;
  let fixture: ComponentFixture<AlquilanComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlquilanComponent]
    });
    fixture = TestBed.createComponent(AlquilanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
