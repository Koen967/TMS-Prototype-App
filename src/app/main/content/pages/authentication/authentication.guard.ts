import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AuthenticationState } from '../../pages/authentication/store/states/authentication.state';
import { take, filter, tap, switchMap, catchError } from 'rxjs/operators';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  @Select(AuthenticationState.userName) userName$: Observable<string>;

  constructor(private store: Store, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.isLoggedIn(state).pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  isLoggedIn(state) {
    console.log('test');
    return this.userName$.pipe(
      tap(userName => {
        if (!userName) {
          this.router.navigate(['/pages/auth/login'], {
            queryParams: { returnUrl: state.url }
          });
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
