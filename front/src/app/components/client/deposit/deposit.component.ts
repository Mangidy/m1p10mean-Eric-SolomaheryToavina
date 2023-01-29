import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-deposit',
  templateUrl: './deposit.component.html',
  styleUrls: ['./deposit.component.css'],
})
export class DepositComponent {
  loader: boolean;
  depositForm = new FormGroup({
    numero: new FormControl('', [Validators.required]),
    marque: new FormControl('', [Validators.required]),
    modele: new FormControl('', [Validators.required]),
    annee: new FormControl('', [Validators.required]),
  });
  get numero() {
    return this.depositForm.get('numero');
  }
  get marque() {
    return this.depositForm.get('marque');
  }
  get modele() {
    return this.depositForm.get('modele');
  }
  get annee() {
    return this.depositForm.get('annee');
  }
  constructor(private auth: AuthService) {
    this.loader = false;
  }
  onSubmit(): void {
    if (this.depositForm.valid) {
      this.loader = true;
      console.log(this.depositForm.value.numero);
      console.log(
        this.auth
          .addCarClient({
            numero: this.depositForm.value.numero,
            marque: this.depositForm.value.marque,
            modele: this.depositForm.value.modele,
            annee: this.depositForm.value.annee,
          })
          .subscribe((val) => {
            this.loader = false;
            if ((val.message = 'NEW CAR ADDED')) {
              this.depositForm.reset();
              Swal.fire(
                'Sucess',
                'Votre voiture a été deposée | Vous pouvez le voir dans votre liste de voiture',
                'success'
              );
            } else {
              Swal.fire('erreur', val.detailled, 'error');
            }
          })
      );
    } else {
      Swal.fire('erreur', 'Détaille manquante', 'error');
    }
  }
}
