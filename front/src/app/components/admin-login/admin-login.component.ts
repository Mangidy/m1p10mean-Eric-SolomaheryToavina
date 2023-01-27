import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
    loginForm = new FormGroup({
      username: new FormControl(''),
      password: new FormControl(''),
    });
  
    constructor(private auth:AuthService, private router: Router){
  
    }
    onSubmit():void{
      if (this.loginForm.valid) {
        console.log(this.loginForm.value);
         //this.auth.addAdmin(({ usernameAdmin:'ad', passwordAdmin:'admin',roleAdmin:'ADMIN'})).subscribe((val => console.log(val)));
        //console.log(this.auth.getAllCar().subscribe((val => console.log(val))));
        this.auth.removeAllToken();
      this.auth.logAdmin({username:this.loginForm.value.username,password:this.loginForm.value.password}).subscribe(val => { console.log(val.message)
        if(val.message=='LOGIN SUCCESSFULLY'){
        this.auth.getAdmin().subscribe( val => {this.auth.setTokenAdmin('abcdefghijklmnopqrstuvwxyz',val.admin.roleAdmin.toString().toLowerCase() );
        this.router.navigate([val.admin.roleAdmin.toString().toLowerCase() ]);+'/'});
          
        }
       
       
        else{
        alert('Incorrect username or password ');
      }
      });
}
    }
  }
