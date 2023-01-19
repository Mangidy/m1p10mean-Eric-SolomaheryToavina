import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-financier-header',
  templateUrl: './financier-header.component.html',
  styleUrls: ['./financier-header.component.css']
})
export class FinancierHeaderComponent {
  constructor(private auth:AuthService){}
  logout(): void{
   this.auth.logout();
  }
}
