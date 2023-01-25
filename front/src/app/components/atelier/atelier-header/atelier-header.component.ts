import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-atelier-header',
  templateUrl: './atelier-header.component.html',
  styleUrls: ['./atelier-header.component.css'],
})
export class AtelierHeaderComponent {
  constructor(private auth: AuthService, private router: Router) {}

  logout(): void {
    this.auth.logout();
    this.auth.logoutAdmin().subscribe((val) => console.log(val));
  }

  takeHome(): void {
    if (Number(localStorage.getItem('privilage')) == 1) {
      this.router.navigate(['client']);
    } else if (Number(localStorage.getItem('privilage')) == 2) {
      this.router.navigate(['atelier']);
      console.log(
        console.log(
          this.auth
            .getOneCar('63d0c45b9076d8e5fb3b8b0d')
            .subscribe((val) => console.log(val))
        )
      );
    } else if (Number(localStorage.getItem('privilage')) == 3) {
      this.router.navigate(['financier']);
    } else if (Number(localStorage.getItem('privilage')) == 4) {
      this.router.navigate(['admin']);
    }
  }
}
