import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atelier-repair',
  templateUrl: './atelier-repair.component.html',
  styleUrls: ['./atelier-repair.component.css']
})
export class AtelierRepairComponent {
  get value(){
    return this.repairForm.get('value');
    }
  repairForm = new FormGroup({
    value: new FormControl(1,[
      Validators.required]),
  });
  data:any;
  constructor(private auth:AuthService){}
  ngOnInit() {
    
  this.auth.getAllCarReception().subscribe((val) =>{ this.data=val; console.log(val);});

  }
  objectKeys = Object.keys;
  public addFacture(_id:any){
    console.log(_id);
    if(this.repairForm.valid){
    this.auth.addCarFacture(_id,Number(this.repairForm.value.value)).subscribe((val => {if(val.message=="FACTURE FOR CAR ADDED") {
      Swal.fire('Success','Facture ajouter pour la voiture','success');
      this.auth.reload('atelier/listing');
    } else {
      Swal.fire('erreur',val.detailled,'error');
    }}));
    }
  }
}
