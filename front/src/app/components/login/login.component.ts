import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loader: boolean;
  get email() {
    return this.loginForm.get('email');
  }
  get password() {
    return this.loginForm.get('password');
  }
  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private auth: AuthService, private router: Router) {
    this.loader = false;
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loader = true;
      console.log(this.loginForm.value);
      //this.auth.addAdmin(({ usernameAdmin:'ad', passwordAdmin:'admin',roleAdmin:'ADMIN'})).subscribe((val => console.log(val)));
      //console.log(this.auth.getAllCar().subscribe((val => console.log(val))));
      this.auth.removeAllToken();
      this.auth
        .logClient({
          email: this.loginForm.value.email,
          password: this.loginForm.value.password,
        })
        .subscribe((val) => {
          this.loader = false;
          if (val.message == 'LOGIN SUCCESSFULLY') {
            this.router.navigate(['/client/home']);
          } else {
            Swal.fire('Erreur', 'Email ou mot de passe incorrect', 'error');
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
