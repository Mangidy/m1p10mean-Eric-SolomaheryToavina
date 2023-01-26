import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css']
})
export class DepositComponent {
  depositForm = new FormGroup({
    numero: new FormControl('',[
      Validators.required]),
    marque: new FormControl('',[
      Validators.required]),
    modele: new FormControl('',[
      Validators.required]),
    annee: new FormControl('',[
      Validators.required]),
  });
  get numero(){
    return this.depositForm.get('numero');
    }
  get marque(){
    return this.depositForm.get('marque');
   }
  get modele(){
     return this.depositForm.get('modele');
    }
  get annee(){
     return this.depositForm.get('annee');
    }
  constructor(private auth:AuthService){

  }
  onSubmit():void{
    if (this.depositForm.valid) {
      console.log(this.depositForm.value.numero);
    console.log(this.auth.addCarClient({ numero:this.depositForm.value.numero, marque:this.depositForm.value.marque, modele:this.depositForm.value.modele, annee:this.depositForm.value.annee}).subscribe((val =>{if (val.message='NEW CAR ADDED'){
      alert("Deposit done!");
    }
    else{
      alert(val.detailled);
    }
  }
    )));
 
    }
    else
    {
      alert("Missing details");
    }
  }
}
