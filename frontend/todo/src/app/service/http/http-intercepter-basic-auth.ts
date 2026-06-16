import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BasicAuthentication } from '../BasicAuthentication';

@Injectable({
  providedIn: 'root',
})
export class HttpIntercepterBasicAuth implements HttpInterceptor{
  
  private basicAuthenticationService= inject(BasicAuthentication);

  intercept(request: HttpRequest<any>, next: HttpHandler){
    let username = this.basicAuthenticationService.getAuthenticatedUser();
    let basicAuthHeaderString = this.basicAuthenticationService.getAuthenticatedToken();

    if(username && basicAuthHeaderString){
       request = request.clone({
        setHeaders : {
          Authorization : basicAuthHeaderString
        }
    })
    }
    
    return next.handle(request);
  }

}
