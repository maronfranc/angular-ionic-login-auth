import { Injectable, Injector } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';

import { flatMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private injector: Injector) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req);
  }

  /*
  * FIXME: Interceptor está mandando POST no token constantemente.
  * Isto talvez esteja relacionado ao fato de a busca "get token()"
  * do auth.service.ts ser um observador e talvez também por estar
  * usando um operador errado do rxjs;
  */
  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   const tokenProvider = this.injector.get(AuthService);
  //   return tokenProvider.token.pipe(
  //     flatMap((accessToken) => {
  //       if (!accessToken) {
  //         return next.handle(req);
  //       }
  //       const request = req.clone({
  //           setHeaders: {
  //             Authorization: `Bearer ${accessToken}`
  //           }
  //       });
  //       return next.handle(request);
  //       })
  //   );
  // }
}
