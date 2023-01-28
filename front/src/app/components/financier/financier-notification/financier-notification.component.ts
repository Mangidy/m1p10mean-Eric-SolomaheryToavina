import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-financier-notification',
  templateUrl: './financier-notification.component.html',
  styleUrls: ['./financier-notification.component.css']
})
export class FinancierNotificationComponent {
  data:any;
  constructor(private auth:AuthService){}
  ngOnInit() {
    
  this.auth.adminNotificationClient().subscribe((val) =>{ this.data=val; console.log( val);});

  }
  objectKeys = Object.keys;
 
}
