import { AuthHelperService } from './../services/authHelper.service';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpErrorResponse,
    HttpResponse,
    HttpHeaders
} from '@angular/common/http';
import { Router } from '@angular/router';
import { OverlayService } from '../overlay-settings/services/overlay.service';


// import 'rxjs/add/operator/do';
// import 'rxjs/add/operator/delay';
// import 'rxjs/add/operator/retry';

// import { LoaderService } from '../loaders-services/loader.service';

@Injectable()
export class HttpRequestLoaderInterceptor implements HttpInterceptor {
    constructor(
        private router: Router,
        private authSer: AuthHelperService,
        private overlayS: OverlayService
    ) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // this.showLoader();
        this.overlayS.showLoader();

        let token = this.authSer.getAuthToken;
        // req.headers.set('auth-token', token)
        if (req.params.get('isDifferent')) {
            req = req.clone({
                url: `${req.url}`,
            });
        } else if (token) {
            req = req.clone({
                url: environment.baseUrl + req.url,
                setHeaders: {
                    'auth-token': token
                }
            });
        } else if (!token) {
            req = req.clone({
                url: environment.baseUrl + req.url
            });
        }


        return next.handle(req).pipe(tap((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                this.overlayS.hideLoader();
                // this.onEnd();
            }
        },
            (err: any) => {
                this.overlayS.hideLoader();
                return throwError(err);
                // this.onEnd();
            }));
    }
    // private onEnd(): void {
    //     this.hideLoader();
    // }
    // private showLoader(): void {
    //     this.loaderService.show();
    // }
    // private hideLoader(): void {
    //     this.loaderService.hide();
    // }
}