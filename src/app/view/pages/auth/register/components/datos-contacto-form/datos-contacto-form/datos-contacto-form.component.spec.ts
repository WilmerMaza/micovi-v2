/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { DatosContactoFormComponent } from './datos-contacto-form.component';

describe('DatosContactoFormComponent', () => {
  let component: DatosContactoFormComponent;
  let fixture: ComponentFixture<DatosContactoFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatosContactoFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatosContactoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
