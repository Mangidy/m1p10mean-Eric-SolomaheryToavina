import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atelier-reception',
  templateUrl: './atelier-reception.component.html',
  styleUrls: ['./atelier-reception.component.css']
})
export class AtelierReceptionComponent {

  data:any;
  constructor(private auth:AuthService){}
  ngOnInit() {
    
  this.auth.getAllCar().subscribe((val) =>{ this.data=val; console.log(val);});

  }
  objectKeys = Object.keys;
  public addRepair(numero:any){
    console.log(numero);
    this.auth.addCarReception(numero).subscribe((val => {if(val.message=="CAR REPARATION ADDED") {
      Swal.fire('Success','Voiture bien recu','success');
      this.auth.reload('atelier/reception');
    } else {
      Swal.fire('erreur',val.detailled,'error');
    }}));
  }
}