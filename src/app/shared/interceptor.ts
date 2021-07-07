import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

export class Interceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if(localStorage.getItem('access_token') !== null) {
            const token = localStorage.getItem('access_token');
            const headers = new HttpHeaders().set('access_token', token);
            const authRequest = request.clone({headers: headers});
            return next.handle(authRequest);
        } else {
            return next.handle(request);
        }
    }
}