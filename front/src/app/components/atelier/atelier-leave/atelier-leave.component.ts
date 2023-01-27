import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atelier-leave',
  templateUrl: './atelier-leave.component.html',
  styleUrls: ['./atelier-leave.component.css']
})
export class AtelierLeaveComponent {
  data:any;
  constructor(private auth:AuthService){}
  ngOnInit() {
    
  this.auth.getAllCarReceptionAll().subscribe((val) =>{ this.data=val; console.log(val);});

  }
  objectKeys = Object.keys;
  public dispose(id:any){
    console.log(id);
    this.auth.carOut(id).subscribe((val => {if(val.message=="CAR OUT") {
      Swal.fire('Success','Voiture recu par le client','success');
      this.auth.reload('atelier/ticketing');
    } else {
      Swal.fire('erreur',val.detailled,'error');
    }}));
  }
}
