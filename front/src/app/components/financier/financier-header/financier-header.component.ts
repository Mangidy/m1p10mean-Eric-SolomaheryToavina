import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-financier-header',
  templateUrl: './financier-header.component.html',
  styleUrls: ['./financier-header.component.css']
})
export class FinancierHeaderComponent {
  constructor(private auth:AuthService,private router:Router){}
  logout(): void{
   this.auth.logout();
   this.auth.logoutAdmin().subscribe((val => console.log(val)));
  }


takeHome():void{
  if(Number(localStorage.getItem('privilage'))==1){
    this.router.navigate(['client']);
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
