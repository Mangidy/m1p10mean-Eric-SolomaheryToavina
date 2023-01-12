import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingComponent } from './components/billing/billing.component';
import { CarRecoveryComponent } from './components/car-recovery/car-recovery.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { RepairHistoryComponent } from './components/repair-history/repair-history.component';
import { RepairProgressComponent } from './components/repair-progress/repair-progress.component';

const routes: Routes = [
  { path:'home', component: HomeComponent},
  { path:'login', component: LoginComponent},
  { path:'deposit', component: DepositComponent}, 
  { path:'progress', component: RepairProgressComponent}, 
  { path:'billing', component: BillingComponent}, 
  { path:'recovery', component: CarRecoveryComponent}, 
  { path:'history', component: RepairHistoryComponent}, 
   { path:'', redirectTo:'home', pathMatch:'full'},
  { path:'**', component: NotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
