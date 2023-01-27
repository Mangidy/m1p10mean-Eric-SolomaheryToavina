import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css']
})
export class BillingComponent {
  data:any;
  constructor(private auth:AuthService){}
  ngOnInit() {
    
  this.auth.factureClient().subscribe((val) =>{ this.data=val; console.log( val);});

  }
  objectKeys = Object.keys;
  public payUp(idVoiture:any){
    console.log(idVoiture);
    this.auth.validateFactureClient(idVoiture).subscribe((val => console.log(val)));
  }
}
