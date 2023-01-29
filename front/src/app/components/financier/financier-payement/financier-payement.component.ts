import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-financier-payement',
  templateUrl: './financier-payement.component.html',
  styleUrls: ['./financier-payement.component.css'],
})
export class FinancierPayementComponent {
  loader: boolean;
  data: any;
  constructor(private auth: AuthService) {
    this.loader = true;
  }
  ngOnInit() {
    this.auth.getFactureTF(true).subscribe((val) => {
      this.data = val;
      this.loader = false;
      console.log(val);
    });
  }
  objectKeys = Object.keys;
  public validate(id: any) {
    console.log(id);
    this.loader = true;
    this.auth.validateFacture(id).subscribe((val) => {
      this.loader = false;
      if ((val.message = 'VALIDATE PAYMENT')) {
        this.loader = false;
        Swal.fire('Success', 'Payement valider', 'success');
        this.auth.reload('financier/paying');
      } else {
        Swal.fire('erreur', val.detailled, 'error');
      }
    });
  }
}
