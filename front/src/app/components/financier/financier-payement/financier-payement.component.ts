import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-financier-payement',
  templateUrl: './financier-payement.component.html',
  styleUrls: ['./financier-payement.component.css']
})
export class FinancierPayementComponent {
  data:any;
  constructor(private auth:AuthService){}
  ngOnInit() {
    
  this.auth.getFactureTF(true).subscribe((val) =>{ this.data=val; console.log( val);});

  }
  objectKeys = Object.keys;
  public validate(id:any){
    console.log(id);
    this.auth.validateFacture(id).subscribe((val => console.log(val)));
  }
}
