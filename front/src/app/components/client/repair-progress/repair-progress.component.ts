import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

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
  objectKeys = Object.keys;
  checkSortie(value:any) :boolean{
    if(value==true )
    {
      return true;
    }
    else{
     return false;
    }
  }
  public cancel(_id:any){
 
   console.log(_id);
    this.auth.cancelCarClient(_id).subscribe((val => { if ((val.message = 'DELETE SUCCESSFULLY')) {
     
      Swal.fire('Success','Voiture retire','success');
      this.auth.reload('client/progress');
    } else {
      Swal.fire('erreur',val.detailled,'error');
    }}));
    }
}
