import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

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
    this.auth.addCarReparation(numero).subscribe((val => console.log(val)));
  }
}