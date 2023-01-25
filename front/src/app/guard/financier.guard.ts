import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FinancierGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
 
    
      this.auth.getAdmin().subscribe(val => {if(val.admin.roleAdmin=='FINANCIER'&&this.auth.isLoggedInAdmin())
      {
        return this.auth.isLoggedInAdmin();
      }
      else{
        if(localStorage.getItem('tokenAdmin')!=null)
        {
          this.router.navigate(['home']);
        }
        else{
          this.router.navigate(['login']);
        }
      
      return false;
    }});
  }
}
