import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Complements } from './complements';

describe('Complements', () => {
  let component: Complements;
  let fixture: ComponentFixture<Complements>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Complements]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Complements);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
