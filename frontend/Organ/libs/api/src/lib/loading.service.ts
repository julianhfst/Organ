import { Injectable } from '@angular/core';
import { BehaviorSubject, delay } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  public isLoading = new BehaviorSubject(false);
  public readonly loading$ = this.isLoading.asObservable().pipe(delay(0));
}
