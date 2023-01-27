import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-repair-history',
  templateUrl: './repair-history.component.html',
  styleUrls: ['./repair-history.component.css']
})
export class RepairHistoryComponent {
  data:any;
  constructor(private auth:AuthService){}
  ngOnInit() {
    
  this.auth.factureClient().subscribe((val) =>{ this.data=val; console.log( val);});

  }
  objectKeys = Object.keys;
 
   
  
}
