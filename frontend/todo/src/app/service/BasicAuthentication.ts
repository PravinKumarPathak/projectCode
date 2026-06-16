import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';
import { API_URL } from '../app.constants';


export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticateUser';

@Injectable({
  providedIn: 'root',
})
export class BasicAuthentication {

  private http = inject(HttpClient);



// BASIC AUTHENTICATION =>

  executeAuthenticationService(username: string, password: string){

    let basicAuthHeaderString ='Basic ' + window.btoa(username + ':' + password);

    let headers = new HttpHeaders({
      Authorization: basicAuthHeaderString
    })


    return this.http.get<AuthenticationBean>(`${API_URL}/basic-auth`, {headers}).pipe(
      map(
        (response) => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, basicAuthHeaderString);
          return response;
        }
      )
    )
  }




// JWT AUTHENTICATION =>

  executeJWTAuthenticationService(username: string, password: string){

    return this.http.post<any>(`${API_URL}/authenticate`, {username, password}).pipe(
      map(
        (response) => {
          sessionStorage.setItem(AUTHENTICATED_USER, username);
          sessionStorage.setItem(TOKEN, `Bearer ${response.token}`);
          return response;
        }
      )
    )
  }



  getAuthenticatedUser(){
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }


  getAuthenticatedToken(){
    return sessionStorage.getItem(TOKEN);
  }

  
  isUserLoggedIn(){
    let user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }


  logout(){
    sessionStorage.removeItem(AUTHENTICATED_USER);
    sessionStorage.removeItem(TOKEN);
  }
}


export class AuthenticationBean{
  constructor(public message:string){}
}
