import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AtelierGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      if( Number(localStorage.getItem('privilage'))==2 &&this.auth.isLoggedIn()){
      return this.auth.isLoggedIn();
      }
      else{
        if(localStorage.getItem('token')!=null)
        {
          this.router.navigate(['notfound']);
        }
        else{
          this.router.navigate(['login']);
        }
      
      return false;
      }
   
  }
  
}
