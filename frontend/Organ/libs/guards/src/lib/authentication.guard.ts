import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router, UrlTree } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { Observable, tap } from 'rxjs';
import { AuthState, selectAuthStatus } from 'store';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationGuard implements CanActivate, CanLoad {
  bool = false;
  constructor(private store: Store<AuthState>, private router: Router) {}
  canLoad():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.store.pipe(
      select(selectAuthStatus),
      tap((selectAuthStatus) => {
        if (!selectAuthStatus) this.router.navigateByUrl('/');
      })
    );
  }

  canActivate():
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.store.pipe(
      select(selectAuthStatus),
      tap((selectAuthStatus) => {
        if (!selectAuthStatus) this.router.navigateByUrl('/');
      })
    );
  }
}
