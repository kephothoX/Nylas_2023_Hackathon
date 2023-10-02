import { TestBed } from '@angular/core/testing';

import { AuthGuard } from './auth0.guard';

describe('AuthGuard', () => {
  const guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
