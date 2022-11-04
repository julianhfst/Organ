import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { IUserProfile } from 'libs/models/src';
import { map } from 'rxjs';
import { logout } from 'store';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit {
  constructor(private route: ActivatedRoute, private store: Store) {}
  user: IUserProfile | undefined;

  logout() {
    this.store.dispatch(logout());
  }

  ngOnInit(): void {
    this.route.data.pipe(map((data) => data['user'])).subscribe({
      next: (res: IUserProfile) => {
        this.user = res;
        this.user.creationDate = formatDate(
          res.creationDate,
          'dd. MMMM, y, H:mm',
          'de-DE'
        );
      },
    });
  }
}
