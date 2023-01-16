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
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AuthGuard } from './guard/auth.guard';
import { AtelierModule } from './modules/atelier/atelier.module';

const routes: Routes = [
  { path:'home', component: HomeComponent},
  { path:'login', component: LoginComponent},
  { path:'signup', component: SignUpComponent}, 
  { path:'deposit', component: DepositComponent}, 
  { path:'progress', component: RepairProgressComponent}, 
  { path:'billing', component: BillingComponent}, 
  { path:'recovery', component: CarRecoveryComponent}, 
  { path:'history', component: RepairHistoryComponent}, 
   { path:'', redirectTo:'home', pathMatch:'full'},
   {
    path:'atelier',canActivate: [AuthGuard],loadChildren: ()=>import('./modules/atelier/atelier.module').then((m)=>m.AtelierModule)
   },
  { path:'**', component: NotfoundComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
