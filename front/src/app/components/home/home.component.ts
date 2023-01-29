import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  constructor(private router:Router,private titleService: Title){ this.titleService.setTitle("Acceuil");}



takeHome():void{

    this.router.navigate(['/home']);

}
}

