import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtelierHomeComponent } from 'src/app/components/atelier/atelier-home/atelier-home.component';
import { AtelierLeaveComponent } from 'src/app/components/atelier/atelier-leave/atelier-leave.component';
import { AtelierReceptionComponent } from 'src/app/components/atelier/atelier-reception/atelier-reception.component';
import { AtelierRepairComponent } from 'src/app/components/atelier/atelier-repair/atelier-repair.component';

const routes: Routes = [
  { path:'', component : AtelierHomeComponent,
  children:[
    { path:'home', component: AtelierHomeComponent},
    { path:'reception', component: AtelierReceptionComponent},
    { path:'listing', component: AtelierRepairComponent},
    { path:'ticketing', component: AtelierLeaveComponent},
    {path:'',redirectTo:'/atelier/home',pathMatch:'full'}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AtelierRoutingModule { }
