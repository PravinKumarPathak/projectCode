import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HardcodedAuthentication } from '../service/hardcoded-authentication';
import { BasicAuthentication } from '../service/BasicAuthentication';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule
  ],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  userName = 'in28minutes';
  password = '';
  errorMessage = 'Invalid Credentials';
  invalidLogin = signal(false);

  private router = inject(Router);

  private hardcodedAuthenticationService = inject(HardcodedAuthentication);
  private basicAuthenticationService = inject(BasicAuthentication);

  handleLogin(){
    if(this.hardcodedAuthenticationService.authenticate(this.userName, this.password)){
      this.router.navigate(['/welcome', this.userName]);
      this.invalidLogin.set(false);
    }
    else{
      this.invalidLogin.set(true);
    }
  }


// BASIC AUTHENTICATION =>

  handleBasicAuthLogin(){
      this.basicAuthenticationService.executeAuthenticationService(this.userName, this.password).subscribe({ 
        next: (response) => {
          console.log(response);
          this.router.navigate(['/welcome', this.userName]);
          this.invalidLogin.set(false);
        },

        error: (error) => {
          console.log(error);
          this.invalidLogin.set(true);
        }
      })
  }


  // JWT AUTHENTICATION =>

  handleJWTAuthLogin(){
      this.basicAuthenticationService.executeJWTAuthenticationService(this.userName, this.password).subscribe({ 
        next: (response) => {
          console.log(response);
          this.router.navigate(['/welcome', this.userName]);
          this.invalidLogin.set(false);
        },

        error: (error) => {
          console.log(error);
          this.invalidLogin.set(true);
        }
      })
  }

  
}
