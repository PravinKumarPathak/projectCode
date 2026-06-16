import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { HardcodedAuthentication } from './hardcoded-authentication';

@Injectable({
  providedIn: 'root',
})
export class RouteGuard implements CanActivate {

  private router = inject(Router);

  private hardcodedAuthenticationService = inject(HardcodedAuthentication);

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    if(this.hardcodedAuthenticationService.isUserLoggedIn()){
      return true;
    }

    this.router.navigate(['/login']);
    return false;
  }
}
