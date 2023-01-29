import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atelier-leave',
  templateUrl: './atelier-leave.component.html',
  styleUrls: ['./atelier-leave.component.css'],
})
export class AtelierLeaveComponent {
  loader: boolean;
  data: any;
  constructor(private auth: AuthService) {
    this.loader = true;
  }
  ngOnInit() {
    this.auth.getAllCarReceptionAll().subscribe((val) => {
      this.data = val;
      this.loader = false;
      console.log(val);
    });
  }
  objectKeys = Object.keys;
  public dispose(id: any) {
    console.log(id);
    this.loader = true;
    this.auth.carOut(id).subscribe((val) => {
      this.loader = false;
      if (val.message == 'CAR OUT') {
        Swal.fire('Success', 'Voiture recu par le client', 'success');
        this.auth.reload('atelier/ticketing');
      } else {
        Swal.fire('erreur', val.detailled, 'error');
      }
    });
  }
}
