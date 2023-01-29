import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-billing',
  templateUrl: './billing.component.html',
  styleUrls: ['./billing.component.css'],
})
export class BillingComponent {
  data: any;
  loader: boolean;
  constructor(private auth: AuthService) {
    this.loader = true;
  }
  ngOnInit() {
    this.auth.factureClient().subscribe((val) => {
      this.data = val;
      this.loader = false;
      console.log('Facture -------------');
      console.log(this.data);
    });
  }
  objectKeys = Object.keys;
  public payUp(idVoiture: any) {
    this.loader = true;
    console.log(idVoiture);
    this.auth.validateFactureClient(idVoiture).subscribe((val) => {
      if (val.message == 'VALIDATION FACTURE DONE') {
        Swal.fire('Success', 'Payement effectuer avec success', 'success');
        this.auth.reload('client/billing');
        this.loader = false;
      } else {
        Swal.fire('erreur', val.detailled, 'error');
        this.loader = false;
      }
    });
  }
}
