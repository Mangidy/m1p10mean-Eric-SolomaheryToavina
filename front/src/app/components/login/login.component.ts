import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {  Router } from '@angular/router';
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
