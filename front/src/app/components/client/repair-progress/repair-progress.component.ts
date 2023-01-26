import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-repair-progress',
  templateUrl: './repair-progress.component.html',
  styleUrls: ['./repair-progress.component.css']
})
export class RepairProgressComponent {
  constructor(private auth:AuthService){}
}
