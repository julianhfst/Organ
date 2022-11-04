import { Injectable } from '@angular/core';
import { Router, Resolve } from '@angular/router';
import { AuthService } from 'api';
import { IUserProfile } from 'libs/models/src';
import { catchError, EMPTY, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserprofileResolver implements Resolve<IUserProfile> {
  constructor(private authService: AuthService, private router: Router) {}

  resolve(): Observable<IUserProfile> {
    return this.authService.getProfile().pipe(
      catchError(() => {
        this.router.navigate(['']);
        return EMPTY;
      })
    );
  }
}
