import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router
} from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { Select, Store } from '@ngxs/store';
import { AuthenticationState } from '../../pages/authentication/store/states/authentication.state';
import { take, filter, tap, switchMap, catchError } from 'rxjs/operators';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  @Select(AuthenticationState.userName) userName$: Observable<string>;

  constructor(
    private store: Store,
    private router: Router,
    private service: AuthenticationService,
    private jwtHelper: JwtHelperService
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    const page = next.data['page'] as string;

    return this.isLoggedIn(state, page);
  }

  // Should read JWT token
  isLoggedIn(state, page) {
    const token = localStorage.getItem('authentication.token');
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      const hasRights = this.userHasRights(
        page,
        this.jwtHelper.decodeToken(token)
      );
      if (hasRights) {
        return true;
      }
      return false;
    } else {
      this.router.navigate(['/pages/auth/login'], {
        queryParams: { returnUrl: state.url }
      });
      return false;
    }
  }

  userHasRights(page: string, token) {
    const rights = this.service.getUserRights(token.role);
    if (rights.includes(page)) {
      return true;
    } else if (!this.service.rightExistsInDb(page)) {
      this.service.addRightToDb(page);
    }
    return false;
  }
}
