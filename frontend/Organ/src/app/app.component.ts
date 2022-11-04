import { Component, OnInit } from '@angular/core';
import { AuthService } from 'libs/api/src/lib/auth.service';
import { LoadingService } from 'libs/api/src/lib/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  loading$ = this.loadingService.loading$;

  constructor(
    private authService: AuthService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.authService.autoLogin();
  }
}
