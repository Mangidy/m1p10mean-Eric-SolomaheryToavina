import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-client-notification',
  templateUrl: './client-notification.component.html',
  styleUrls: ['./client-notification.component.css']
})
export class ClientNotificationComponent {
  data:any;
  constructor(private auth:AuthService){}
  ngOnInit() {
    
  this.auth.notificationClient().subscribe((val) =>{ this.data=val; console.log( val);});

  }
  objectKeys = Object.keys;
 
   
  
}
