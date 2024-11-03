import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  let isAuthenticated: boolean = false;

  auth.isAuthenticated$.subscribe((loggedIn) => {
    isAuthenticated = loggedIn;
  });

  if (!isAuthenticated) {
    router.navigate(['/login']);
  }

  return isAuthenticated;
};
