import { Component, inject } from '@angular/core';
import { HardcodedAuthentication } from '../service/hardcoded-authentication';

@Component({
  selector: 'app-logout',
  imports: [],
  templateUrl: './logout.html',
  styleUrl: './logout.css',
})
export class Logout {
  private hardcodedAuthenticationService = inject(HardcodedAuthentication);

  
  ngOnInit(){
    this.hardcodedAuthenticationService.logout();
  }
}
