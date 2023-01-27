import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-car-recovery',
  templateUrl: './car-recovery.component.html',
  styleUrls: ['./car-recovery.component.css']
})
export class CarRecoveryComponent {
  data:any;
  constructor(private auth:AuthService){}
  ngOnInit() {
    
  this.auth.factureClient().subscribe((val) =>{ this.data=val; console.log( val);});

  }
  objectKeys = Object.keys;
  public recover(idVoiture:any){
    console.log(idVoiture);
   
  }
}
