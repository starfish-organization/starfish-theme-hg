import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpHandler,
  HttpRequest,
  HttpEvent,
  HttpHeaders,
  HttpResponse
} from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { tap } from 'rxjs/operators';
import 'rxjs/add/observable/of';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  private cacheMapByUrl = {};

  private sendRequest(req: HttpRequest<any>, next: HttpHandler, urlId: string): Observable<HttpEvent<any>> {
    const noHeaderReq = req.clone({ headers: new HttpHeaders() });

    return next.handle(noHeaderReq).pipe(
      tap(event => {
        if (event instanceof HttpResponse) {
          this.cacheMapByUrl[urlId] = event;
        }
      })
    );
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const urlId: string = req.url;
    const cachedResponse = this.cacheMapByUrl[urlId];
    return cachedResponse ? Observable.of(cachedResponse) : this.sendRequest(req, next, urlId);
  }
}
