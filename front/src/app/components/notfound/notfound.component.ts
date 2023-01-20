import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent {
constructor(private router:Router){}

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

 
else{
  this.router.navigate(['home']);
}
}
}
