import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-car-recovery',
  templateUrl: './car-recovery.component.html',
  styleUrls: ['./car-recovery.component.css'],
})
export class CarRecoveryComponent {
  data: any;
  loader: boolean;
  constructor(private auth: AuthService) {
    this.loader = true;
  }
  ngOnInit() {
    this.auth.factureClient().subscribe((val) => {
      this.data = val;
      this.loader = false;
      console.log('----------------------');
      console.log(val);
    });
  }
  objectKeys = Object.keys;
  public recover(idVoiture: any) {
    console.log(idVoiture);
  }
}
