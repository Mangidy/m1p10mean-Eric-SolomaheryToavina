import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-atelier-header',
  templateUrl: './atelier-header.component.html',
  styleUrls: ['./atelier-header.component.css']
})
export class AtelierHeaderComponent {
  constructor(private auth:AuthService){}
logout(): void{
 this.auth.logout();
}
}
