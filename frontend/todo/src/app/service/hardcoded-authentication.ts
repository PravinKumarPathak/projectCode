import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HardcodedAuthentication {

  authenticate(userName: string, password: string){
    // console.log('Before: ' + this.isUserLoggedIn())
    if(userName==='in28minutes' && password==='dummy'){
      sessionStorage.setItem('authenticateUser', userName);
      // console.log('After: ' + this.isUserLoggedIn());
      return true;
    }
    return false;
  }

  
  isUserLoggedIn(){
    let user = sessionStorage.getItem('authenticateUser');
    return !(user == null);
  }


logout(){
  sessionStorage.removeItem('authenticateUser');
}
}
