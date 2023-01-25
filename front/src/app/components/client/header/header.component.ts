import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(private auth:AuthService,private router:Router){}
  logout(){
    this.auth.logoutTokenClient();
    this.auth.logoutClient().subscribe((val => console.log(val)));
  }

  takeHome():void{
    if(Number(localStorage.getItem('privilage'))==1){
      this.router.navigate(['client']);
      //console.log(this.auth.addCarClient({ numero:'CH 242 GP', marque:'Audi', modele:'r8', annee:'2006'}).subscribe((val => console.log(val))));
    }
    else if(Number(localStorage.getItem('privilage'))==2){
      this.router.navigate(['atelier']);
      
    }
    else if(Number(localStorage.getItem('privilage'))==3){
      this.router.navigate(['financier']);
    }
    else if(Number(localStorage.getItem('privilage'))==4){
      this.router.navigate(['admin']);
    }
  }
}
