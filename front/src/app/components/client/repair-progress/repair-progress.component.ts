import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-repair-progress',
  templateUrl: './repair-progress.component.html',
  styleUrls: ['./repair-progress.component.css']
})
export class RepairProgressComponent {
  data:any;
  constructor(private auth:AuthService){}
  ngOnInit() {
    
  this.auth.carClient().subscribe((val) =>{ this.data=val; console.log(val);});
  }
  public cancel(_id:any){
 
   console.log(_id);
    this.auth.cancelCarClient(_id).subscribe((val => console.log(val)));
    }
}
