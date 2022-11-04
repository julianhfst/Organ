import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log('⛔️ {ErrorInterceptor}');
        console.log(
          '⛔️ {ErrorInterceptor}',
          error.status + ': ' + error.error + '\n' + error.message
        );
        // alert(error.status + ': ' + error.error);
        return throwError(error);
      })
    );
  }
}
