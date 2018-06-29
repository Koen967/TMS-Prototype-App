import { State, Selector, Action, StateContext, Store } from '@ngxs/store';
import { AuthenticationService } from '../../authentication.service';

import * as AuthenticationActions from './../actions/authentication.actions';
import { tap, catchError } from 'rxjs/operators';
import { DialogService } from '../../../../../dialog/dialog.service';
import { of } from 'rxjs/internal/observable/of';
import { Router } from '@angular/router';

export class AuthenticationStateModel {
  token: string;
  username: string;
}

@State<AuthenticationStateModel>({
  name: 'authentication'
})
export class AuthenticationState {
  constructor(
    private service: AuthenticationService,
    private dialogService: DialogService
  ) {}

  @Selector()
  static token(state: AuthenticationStateModel) {
    return state.token;
  }

  @Selector()
  static userName(state: AuthenticationStateModel) {
    return state.username;
  }

  @Action(AuthenticationActions.Login)
  login(
    ctx: StateContext<AuthenticationStateModel>,
    action: AuthenticationActions.Login
  ) {
    return this.service.login(action.user).pipe(
      tap(result => {
        ctx.patchState({
          username: result
        });
      })
    );
  }

  @Action(AuthenticationActions.Logout)
  logout(
    ctx: StateContext<AuthenticationStateModel>,
    action: AuthenticationActions.Logout
  ) {
    ctx.setState({
      token: null,
      username: null
    });
  }

  @Action(AuthenticationActions.Token)
  token(
    ctx: StateContext<AuthenticationStateModel>,
    action: AuthenticationActions.Token
  ) {
    ctx.patchState({
      token: action.token
    });
  }
}
