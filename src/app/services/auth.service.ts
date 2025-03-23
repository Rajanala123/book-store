import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{

  constructor(private router:Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const currentUserEmail = localStorage.getItem('currentUserEmail');
    if (currentUserEmail) {
      // If logged in, allow access
      return true;
    } else {
      // If not logged in, redirect to login page
      this.router.navigate(['login']);
      return false;
    }
  }
}
