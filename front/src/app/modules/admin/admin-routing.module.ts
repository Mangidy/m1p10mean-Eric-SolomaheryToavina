import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from 'src/app/components/admin/admin-home/admin.component';

const routes: Routes = [
  { path:'', component : AdminComponent,
  children:[
    { path:'home', component: AdminComponent},
    {path:'',redirectTo:'/admin/home',pathMatch:'full'}

  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
