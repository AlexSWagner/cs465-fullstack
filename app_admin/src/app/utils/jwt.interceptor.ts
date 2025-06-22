import { Injectable, Provider } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

    constructor(private authenticationService: AuthenticationService) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // Check if user is logged in and has a token
        const isLoggedIn = this.authenticationService.isLoggedIn();
        const token = this.authenticationService.getToken();

        // Check if the request is to our API and not to the auth endpoints
        const isApiUrl = request.url.startsWith('http://localhost:3000/api');
        const isAuthEndpoint = request.url.includes('/login') || request.url.includes('/register');

        if (isLoggedIn && isApiUrl && !isAuthEndpoint) {
            // Clone the request and add the authorization header
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`
                }
            });
        }

        return next.handle(request);
    }
}

// Provider to be added to the main application module
export const authInterceptProvider: Provider =
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true };
