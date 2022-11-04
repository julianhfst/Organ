import { Injectable } from '@angular/core';
import { IUserLogin, IUserProfile, IUserRegister } from 'libs/models/src';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { autoLogin, logout } from 'store';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private store: Store) {}

  login(user: IUserLogin) {
    const url = environment.api_base_url + 'Auth/login';
    return this.http.post(
      url,
      {
        username: user.username,
        password: user.password,
      },
      { responseType: 'text' }
    );
  }

  register(user: IUserRegister) {
    const url = environment.api_base_url + 'Auth/register';
    return this.http.post(
      url,
      {
        username: user.username,
        password: user.password,
        email: user.email,
      },
      { responseType: 'text' }
    );
  }

  autoLogin() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem('jwt');
    if (!token) return;
    const expDay = helper.getTokenExpirationDate(token);
    if (expDay) {
      const newExpDate = new Date(expDay);
      newExpDate.setDate(newExpDate.getDate() - 1);
      const today = new Date();
      if (today < newExpDate) this.store.dispatch(autoLogin());
      else this.store.dispatch(logout());
    }
  }

  getProfile() {
    const url = environment.api_base_url + 'Auth/profile';
    return this.http.get<IUserProfile>(url, { responseType: 'json' });
  }
}
