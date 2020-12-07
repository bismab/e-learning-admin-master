import { TestBed, async, inject } from '@angular/core/testing';

import { AuthRoutesAppearanceGuard } from './auth-routes-appearance.guard';

describe('AuthRoutesAppearanceGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthRoutesAppearanceGuard]
    });
  });

  it('should ...', inject([AuthRoutesAppearanceGuard], (guard: AuthRoutesAppearanceGuard) => {
    expect(guard).toBeTruthy();
  }));
});
