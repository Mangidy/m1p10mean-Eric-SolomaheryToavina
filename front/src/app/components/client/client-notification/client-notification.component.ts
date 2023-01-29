import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-client-notification',
  templateUrl: './client-notification.component.html',
  styleUrls: ['./client-notification.component.css'],
})
export class ClientNotificationComponent {
  data: any;
  loader: boolean;
  constructor(private auth: AuthService) {
    this.loader = true;
  }
  ngOnInit() {
    this.auth.notificationClient().subscribe((val) => {
      this.data = val;
      this.loader = false;
      console.log(val);
    });
  }
  objectKeys = Object.keys;
}
