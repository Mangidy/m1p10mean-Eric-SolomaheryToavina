import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl(''),
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
      this.auth.logClient({email:this.loginForm.value.email,password:this.loginForm.value.password}).subscribe(val => { if(val.message=='LOGIN SUCCESSFULLY'){
        this.router.navigate(['/client']);
        }
        else{
          alert('Incorrect email or password ');
        }
      }); 
    /* this.auth.logClient({email:this.loginForm.value.email,password:this.loginForm.value.password}).subscribe(val => { if(val.message=='LOGIN SUCCESSFULLY'){
      this.router.navigate(['/client']);
      }
      else{
        alert('Incorrect email or password ');
      }
    }); */
        
    
     
//this.auth.logAdmin({username:'admin',password:'admin'}).subscribe((val => console.log(val)));
      
   
     //console.log(this.auth.getAllClient().subscribe((val => console.log(val))));
  //console.log(this.auth.getAdmin().subscribe((val => console.log(val))));
     //this.auth.addAdmin(({ usernameAdmin:'admin99', passwordAdmin:'admin',roleAdmin:'1'})).subscribe((val => console.log(val)));
    }
    
  }
  
}

