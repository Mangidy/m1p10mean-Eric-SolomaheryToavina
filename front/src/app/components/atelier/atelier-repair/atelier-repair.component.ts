import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

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
    this.auth.addCarFacture(_id,Number(this.repairForm.value.value)).subscribe((val => console.log(val)));
    }
  }
}
