import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthService } from 'api';
import { IUserRegister } from 'libs/models/src';
import { login } from 'store';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.scss'],
})
export class RegisterPageComponent implements OnInit {
  constructor(private authService: AuthService, private store: Store) {}

  ngOnInit(): void {}

  clickSubmit(user: IUserRegister) {
    this.authService.register(user).subscribe({
      next: (res) => {
        this.store.dispatch(login({ token: res }));
      },
    });
  }
}
