import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-atelier-notification',
  templateUrl: './atelier-notification.component.html',
  styleUrls: ['./atelier-notification.component.css']
})
export class AtelierNotificationComponent {
  data:any;
  constructor(private auth:AuthService){}
  ngOnInit() {
    
  this.auth.notificationClient().subscribe((val) =>{ this.data=val; console.log( val);});

  }
  objectKeys = Object.keys;
 
   
}
