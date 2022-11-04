import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { select, Store } from '@ngrx/store';
import { AuthState } from 'libs/store/src/lib/auth/auth.reducer';
import {
  selectAuthState,
  selectAuthStatus,
} from 'libs/store/src/lib/auth/auth.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  nav_collapse: boolean = true;
  loggedin: boolean = false;
  nav_button_text: string = '';
  nav_button_route: string = '';

  constructor(private store: Store<AuthState>) {}

  ngOnInit(): void {
    this.store.pipe(select(selectAuthStatus)).subscribe((response) => {
      this.loggedin = response;
      this.change_nav_items(response);
    });
  }

  change_nav_items(loggedin: boolean) {
    if (!loggedin) {
      this.nav_button_text = 'Login';
      this.nav_button_route = '/auth/login';
    } else {
      this.nav_button_text = 'Profile';
      this.nav_button_route = '/auth/profile';
    }
  }

  toggle_nav() {
    this.nav_collapse = !this.nav_collapse;
  }
}
