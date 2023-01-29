import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  loader: boolean;
  data: any;

  constructor(private auth: AuthService, private route: ActivatedRoute) {
    this.loader = true;
  }
  ngOnInit() {
    console.log(this.route.snapshot.params['msg']);
    this.auth
      .clientCarSearch(this.route.snapshot.params['msg'])
      .subscribe((val) => {
        this.data = val;
        this.loader = false;
        console.log(val);
      });
  }
  objectKeys = Object.keys;
  checkSortie(value: any): boolean {
    if (value == true) {
      return true;
    } else {
      return false;
    }
  }
  public cancel(_id: any) {
    console.log(_id);
    this.auth.cancelCarClient(_id).subscribe((val) => {
      if ((val.message = 'DELETE SUCCESSFULLY')) {
        Swal.fire('Success', 'Voiture retire', 'success');
        this.auth.reload('client/progress');
      } else {
        Swal.fire('erreur', val.detailled, 'error');
      }
    });
  }
}
