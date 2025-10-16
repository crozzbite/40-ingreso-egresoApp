import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

export const authGuard: CanActivateFn = () => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isAuth().pipe(
    map( isAuth => {
      if (isAuth) {
        return true;
      }
      return router.createUrlTree(['/login']);
    })
  ) as Observable<boolean | UrlTree>;
};
