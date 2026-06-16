import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { API_URL } from '../../app.constants';


export class HelloWorldBean{
  constructor(public message:string){}
}

@Injectable({
  providedIn: 'root',
})
export class WelcomeData {


  private http = inject(HttpClient)
  
  executeHelloWorldBeanService(){
    return this.http.get<HelloWorldBean>('http://localhost:8080/hello-world-bean')
  }


  executeHelloWorldBeanServiceWithPathVariable(name: string){
    // let basicAuthHeaderString = this.createBasicAuthenticationHttpHeader();

    // let headers = new HttpHeaders({
    //   Authorization: basicAuthHeaderString
    // })


    return this.http.get<HelloWorldBean>(`${API_URL}/hello-world/path-variable/${name}`,
     // {headers}
    )
  }

  // createBasicAuthenticationHttpHeader(){
  //   let username = 'in28minutes'
  //   let password = 'dummy'
  //   let basicAuthHeaderString ='Basic ' + window.btoa(username + ':' + password);
  //   return basicAuthHeaderString;
  // }
}
