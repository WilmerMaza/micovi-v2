import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateEntrenadorComponent } from './createEntrenador.component';

describe('CreateEntrenadorComponent', () => {
  let component: CreateEntrenadorComponent;
  let fixture: ComponentFixture<CreateEntrenadorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEntrenadorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateEntrenadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
