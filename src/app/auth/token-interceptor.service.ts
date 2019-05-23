import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { flatMap, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenProvider = this.injector.get(AuthService);
    return tokenProvider.token.pipe(
      take(2),
      flatMap((accessToken) => {
        if (!accessToken) {
          console.log(req);
          return next.handle(req);
        }
        const request = req.clone({
            setHeaders: {
              Authorization: `Bearer ${accessToken}`,
            },
            url: environment.bearerUrl,
            method: 'GET'
        });
        console.log(request);
        return next.handle(request);
        })
    );
  }
}
