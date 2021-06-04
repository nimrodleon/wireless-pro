import {Injectable} from '@angular/core';
import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  // intercept(req, next) {
  //   const tokenizeReq = req.clone({
  //     setHeaders: {
  //       Authorization: `Bearer ${this.authService.getToken()}`,
  //       'Content-Type': 'application/json'
  //     }
  //   });
  //   return next.handle(tokenizeReq);
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const tokenizeReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${this.authService.getToken()}`,
        'Content-Type': 'application/json'
      }
    });
    return next.handle(tokenizeReq)
      .pipe(map((event: HttpEvent<any>) => {
          if (event instanceof HttpResponse) {
            // console.log('event--->>>', event);
          }
          return event;
        }),
        catchError((error: HttpErrorResponse) => {
          console.log(error.status);
          // Cuando el estado de la la respuesta sea: Unauthorized 401
          // se debe cerrar la sesión automáticamente.
          // TODO: comentar `this.authService.logout()` para testear.
          if (error.status === 401) {
            // this.authService.logout();
          }
          return throwError(error);
        }));
  }

}
