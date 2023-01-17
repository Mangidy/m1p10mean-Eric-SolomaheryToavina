import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AtelierGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router){

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if( this.auth.getPrivilage()==2 &&this.auth.isLoggedIn()){
      return this.auth.isLoggedIn();
      }
      else{
      this.router.navigate(['login']);
      return false;
      }
   
  }
  
}
