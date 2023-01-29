import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atelier-reception',
  templateUrl: './atelier-reception.component.html',
  styleUrls: ['./atelier-reception.component.css'],
})
export class AtelierReceptionComponent {
  loader: boolean;
  data: any;
  constructor(private auth: AuthService) {
    this.loader = true;
  }
  ngOnInit() {
    this.auth.getAllCar().subscribe((val) => {
      this.data = val;
      this.loader = false;
      console.log(val);
    });
  }
  objectKeys = Object.keys;
  public addRepair(numero: any) {
    console.log(numero);
    this.loader = true;
    this.auth.addCarReception(numero).subscribe((val) => {
      this.loader = false;
      if (val.message == 'CAR RECEPTIONNED') {
        Swal.fire('Success', 'Voiture bien recu', 'success');
        this.auth.reload('atelier/reception');
      } else {
        Swal.fire('erreur', val.detailled, 'error');
      }
    });
  }
}
