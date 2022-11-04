import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'api';
import { IUserLogin } from 'libs/models/src';
import { login } from 'store';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
})
export class LoginPageComponent implements OnInit {
  constructor(private authService: AuthService, private store: Store) {}

  ngOnInit(): void {}

  clickSubmit(user: IUserLogin) {
    this.authService.login(user).subscribe({
      next: (res) => {
        this.store.dispatch(login({ token: res }));
      },
    });
  }
}
