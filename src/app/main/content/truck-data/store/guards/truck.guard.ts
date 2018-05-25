import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Observable, of, throwError } from 'rxjs';
import { Store, Select } from '@ngxs/store';
import { TruckState } from '../states/truck.state';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import * as TruckActions from '../actions/truck.actions';

@Injectable()
export class TruckGuard implements CanActivate {
  @Select(TruckState.trucksLoaded) loaded$: Observable<boolean>;

  constructor(private store: Store) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.getTrucks().pipe(
      switchMap(() => of(true)),
      catchError(() => of(false))
    );
  }

  getTrucks() {
    return this.loaded$.pipe(
      tap(loaded => {
        if (!loaded) {
          this.store.dispatch(new TruckActions.GetData(25, 0, null, null));
        }
      }),
      filter(loaded => {
        return loaded;
      }),
      take(1)
    );
  }
}
