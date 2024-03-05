import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userGuard } from './user.guard';
import { RouterTestingModule } from '@angular/router/testing';

describe('userGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
    });
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
