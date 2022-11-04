import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('🔒 {AuthInterceptor}');
    const token = localStorage.getItem('jwt');
    if (token) {
      request = request.clone({
        setHeaders: { Authorization: 'Bearer ' + token },
      });
    }
    return next.handle(request);
  }
}
