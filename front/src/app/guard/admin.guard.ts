import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth:AuthService,private router:Router){}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): any {
 
    
      if (!this.auth.isLoggedInAdmin('admin')) {
       
        this.router.navigate(['/adminlogin']);
      }
      else if(this.auth.isLoggedInAdmin('admin')!=null){
    
      
      return this.auth.isLoggedInAdmin('admin');
      }
      else{
        this.router.navigate(['/home']);
      }
    }
  }