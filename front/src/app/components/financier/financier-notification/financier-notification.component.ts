import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-financier-notification',
  templateUrl: './financier-notification.component.html',
  styleUrls: ['./financier-notification.component.css'],
})
export class FinancierNotificationComponent {
  loader: boolean;
  data: any;
  constructor(private auth: AuthService) {
    this.loader = true;
  }
  ngOnInit() {
    this.auth.adminNotificationClient().subscribe((val) => {
      this.data = val;
      this.loader = false;
      console.log(val);
    });
  }
  objectKeys = Object.keys;
}
