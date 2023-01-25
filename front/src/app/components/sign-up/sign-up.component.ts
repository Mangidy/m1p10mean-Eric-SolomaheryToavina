import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  signupForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    username: new FormControl(''),
    email: new FormControl(''),
    adress: new FormControl(''),
    phone: new FormControl(''),
    password1: new FormControl(''), 
    password2: new FormControl(''),
  });
  

  constructor(private auth:AuthService, private router: Router){}
    onSubmit():void {
      if (this.signupForm.valid) {

        console.log(this.signupForm.value);
       //this.auth.logAdmin({username:'admin',password:'admin'}).subscribe((val => console.log(val)));
       //console.log(this.auth.getAllClient().subscribe((val => console.log(val))));
    //console.log(this.auth.getAdmin().subscribe((val => console.log(val))));
    if(this.signupForm.value.password1==this.signupForm.value.password2){
       this.auth.addClient(({ username:this.signupForm.value.username, password:this.signupForm.value.password2,nom:this.signupForm.value.firstName,prenom:this.signupForm.value.lastName,adress:this.signupForm.value.adress,phone:this.signupForm.value.phone,email:this.signupForm.value.email })).subscribe((val => console.log(val)));
        this.router.navigate(['/login']);
      }
    }
}
}

