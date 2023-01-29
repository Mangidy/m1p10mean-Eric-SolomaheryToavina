import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  get search(){
    return this.searchForm.get('search');
    }
  searchForm = new FormGroup({
    search:new FormControl('')
  });
  searcher:any;
  goSearch(){
    this.router.navigate(['/client/search/'+this.searchForm.value.search]);
    this.auth.reload('/client/search/'+this.searchForm.value.search);
  }
  constructor(private auth:AuthService,private router:Router){}
  logout(){
    this.auth.logoutTokenClient();
    this.auth.logoutClient().subscribe((val => console.log(val)));
  }

  takeHome():void{
    if(Number(localStorage.getItem('privilage'))==1){
      this.router.navigate(['client']);
      //console.log(this.auth.addCarClient({ numero:'CH 242 GP', marque:'Audi', modele:'r8', annee:'2006'}).subscribe((val => console.log(val))));
    }
    else if(Number(localStorage.getItem('privilage'))==2){
      this.router.navigate(['atelier']);
      
    }
    else if(Number(localStorage.getItem('privilage'))==3){
      this.router.navigate(['financier']);
    }
    else if(Number(localStorage.getItem('privilage'))==4){
      this.router.navigate(['admin']);
    }
  }
}
