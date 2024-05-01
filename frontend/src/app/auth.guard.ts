import { CanActivateFn } from '@angular/router';
import { AuthService } from './auth.service';
import { inject } from '@angular/core';

export const loggedinGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.isloggedin();
};
