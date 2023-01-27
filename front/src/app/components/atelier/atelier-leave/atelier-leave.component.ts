import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

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
    this.auth.carOut(id).subscribe((val => console.log(val)));
  }
}
