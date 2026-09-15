import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';

import { AuthService, AuthUserState } from '../../../core/services/auth';
import { ProfileMenu } from './profile-menu';

describe('ProfileMenu', () => {
  let component: ProfileMenu;
  let fixture: ComponentFixture<ProfileMenu>;

  const mockUser = signal<AuthUserState | null>({
    id: '1',
    email: 'wilmer@example.com',
    role: 'entrenador',
    schoolId: null,
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileMenu],
      providers: [
        provideRouter([]),
        {
          provide: AuthService,
          useValue: {
            userSignal: () => mockUser.asReadonly(),
            logout: () => of({ ok: true as const }),
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProfileMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
