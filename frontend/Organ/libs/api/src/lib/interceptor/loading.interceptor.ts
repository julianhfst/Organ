import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { finalize, Observable } from 'rxjs';
import { LoadingService } from '../loading.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
  private requests: HttpRequest<any>[] = [];

  constructor(private loadingService: LoadingService) {}

  private removeRequest(req: HttpRequest<any>) {
    const index = this.requests.indexOf(req);
    if (index >= 0) {
      this.requests.splice(index, 1);
    }
  }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    console.log('📝 {LoadingInterceptor}');
    console.log('📝 {LoadingInterceptor}: new Request', request.url);
    this.requests.push(request);
    this.loadingService.isLoading.next(true); //set Loading
    return next.handle(request).pipe(
      finalize(() => {
        this.removeRequest(request);
        this.loadingService.isLoading.next(this.requests.length > 0); //if no request left set loading false
        console.log('📝 {LoadingInterceptor}: Request finished', request.url);
        console.log('📝 {LoadingInterceptor}: Missing Requests', this.requests);
      })
    );
  }
}
