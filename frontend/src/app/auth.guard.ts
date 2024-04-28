import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const loggedinGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  return auth.isloggedin();
};
