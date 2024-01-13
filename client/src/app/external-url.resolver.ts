import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExternalUrlResolver implements Resolve<any> {
  constructor() {}

  resolve(route: ActivatedRouteSnapshot): Observable<any> {
    const url = route.queryParamMap.get('url');
    if (url) {
      window.location.href = url;
    }
    return of(null);
  }
}
