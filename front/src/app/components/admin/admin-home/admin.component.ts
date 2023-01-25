import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
constructor(private auth:AuthService){}
  logout(): void{
    this.auth.logoutTokenAdmin();
    this.auth.logoutAdmin().subscribe((val => console.log(val)));
   }
}
