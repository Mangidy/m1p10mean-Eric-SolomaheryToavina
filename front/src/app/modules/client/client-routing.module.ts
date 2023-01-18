import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BillingComponent } from 'src/app/components/client/billing/billing.component';
import { CarRecoveryComponent } from 'src/app/components/client/car-recovery/car-recovery.component';
import { ClientHomeComponent } from 'src/app/components/client/client-home/client-home.component';
import { DepositComponent } from 'src/app/components/client/deposit/deposit.component';
import { RepairHistoryComponent } from 'src/app/components/client/repair-history/repair-history.component';
import { RepairProgressComponent } from 'src/app/components/client/repair-progress/repair-progress.component';

const routes: Routes = [
  { path:'',component:ClientHomeComponent,children:
[
  {path:'home',component: ClientHomeComponent},
  { path:'deposit', component: DepositComponent}, 
  { path:'progress', component: RepairProgressComponent}, 
  { path:'billing', component: BillingComponent}, 
  { path:'recovery', component: CarRecoveryComponent}, 
  { path:'history', component: RepairHistoryComponent}, 
  {path:'',redirectTo:'client/home',pathMatch:'full'}
]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
