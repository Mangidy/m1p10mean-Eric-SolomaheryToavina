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
    state: RouterStateSnapshot): any {
 
    
      this.auth.getAdmin().subscribe(val => {
        console.log(val.admin.roleAdmin,this.auth.isLoggedInAdmin());
        if(val.admin.roleAdmin=='ATELIER'&&this.auth.isLoggedInAdmin())
      {
        return this.auth.isLoggedInAdmin();
      }
      else{
        if(localStorage.getItem('tokenAdmin')!=null)
        {
          console.log(localStorage.getItem('tokenAdmin'));
          this.router.navigate(['home']);
        }
        else{
          this.router.navigate(['login']);
        }
      
      return false;
    }});
  }
  
}
