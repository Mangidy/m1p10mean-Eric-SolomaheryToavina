import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

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
    this.auth.validateFactureClient(idVoiture).subscribe((val => {if(val.message=="VALIDATION FACTURE DONE") {
      Swal.fire('Success','Payement effectuer avec success','success');
      this.auth.reload('client/billing');
    } else {
      Swal.fire('erreur',val.detailled,'error');
    }}));

};
  }

