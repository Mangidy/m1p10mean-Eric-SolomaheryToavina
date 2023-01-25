import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class ClientGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router){}
connected:any;


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
 
    
      this.auth.getClient().subscribe(val => {if(val.message=='USER CONNECTED'&&this.auth.isLoggedInClient())
      {
        return this.auth.isLoggedInClient();
      }
      else{
        if(localStorage.getItem('tokenClient')!=null)
        {
          console.log(localStorage.getItem('tokenClient'));
          this.router.navigate(['home']);
        }
        else{
          this.router.navigate(['login']);
        }
      
      return false;
    }});
  }
}
