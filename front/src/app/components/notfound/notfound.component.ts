import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.component.html',
  styleUrls: ['./notfound.component.css']
})
export class NotfoundComponent {

constructor(private router:Router,private auth:AuthService){}
takeHome(){
if(localStorage.getItem('tokenClient')!=null)
  {
    console.log(localStorage.getItem('tokenClient'));
    this.takeHomeClient();
  }
 else if(localStorage.getItem('tokenatelier')!=null)
  {
    this.takeHomeAdmin();
  }
  else if(localStorage.getItem('tokenfinancier')!=null)
  {
    this.takeHomeAdmin();
  }
  else if(localStorage.getItem('tokenadmin')!=null)
  {
    this.takeHomeAdmin();
  }
  else{
    this.router.navigate(['login']);
  }
}
takeHomeClient():void{
  if(this.auth.getClient().subscribe(val=>val!='USER NOT CONNECTED')){
    this.router.navigate(['client']);
  }
}
takeHomeAdmin():void{
  this.auth.getAdmin().subscribe( val => 
       
    this.router.navigate([val.admin.roleAdmin.toString().toLowerCase() ]))
  }
 
 
}



