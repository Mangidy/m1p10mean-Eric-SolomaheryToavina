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
      
      //console.log(this.auth.getAllCar().subscribe((val => console.log(val))));
  
        //this.auth.logClient({email:'butcher@gmail.com',password:'butcher'}).subscribe((val => console.log(val)));
     
this.auth.logAdmin({username:'admin',password:'admin'}).subscribe((val => console.log(val)));
      
   
     //console.log(this.auth.getAllClient().subscribe((val => console.log(val))));
  //console.log(this.auth.getAdmin().subscribe((val => console.log(val))));
     //this.auth.addAdmin(({ usernameAdmin:'admin99', passwordAdmin:'admin',roleAdmin:'1'})).subscribe((val => console.log(val)));
      this.auth.login(this.loginForm.value).subscribe(
        (result) => {
          console.log(result);
          if(this.auth.getPrivilage()==1){
            this.router.navigate(['/client']);
          }
          if(this.auth.getPrivilage()==2){
            this.router.navigate(['/atelier']);
          }
          if(this.auth.getPrivilage()==3){
            this.router.navigate(['/financier']);
          }
          if(this.auth.getPrivilage()==4){
            this.router.navigate(['/admin']);
          }
          
        },
        (err: Error) => {
          alert(err.message);
        }
      );
    }
    
  }
  
}

