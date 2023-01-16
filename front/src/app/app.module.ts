import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DepositComponent } from './components/deposit/deposit.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RepairProgressComponent } from './components/repair-progress/repair-progress.component';
import { BillingComponent } from './components/billing/billing.component';
import { CarRecoveryComponent } from './components/car-recovery/car-recovery.component';
import { RepairHistoryComponent } from './components/repair-history/repair-history.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AtelierHeaderComponent } from './components/atelier/atelier-header/atelier-header.component';
import { AtelierHomeComponent } from './components/atelier/atelier-home/atelier-home.component';
import { AtelierFooterComponent } from './components/atelier/atelier-footer/atelier-footer.component';
import { AtelierReceptionComponent } from './components/atelier/atelier-reception/atelier-reception.component';
import { AtelierRepairComponent } from './components/atelier/atelier-repair/atelier-repair.component';
import { AtelierLeaveComponent } from './components/atelier/atelier-leave/atelier-leave.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    DepositComponent,
    NotfoundComponent,
    HeaderComponent,
    FooterComponent,
    RepairProgressComponent,
    BillingComponent,
    CarRecoveryComponent,
    RepairHistoryComponent,
    SignUpComponent,
    AtelierHeaderComponent,
    AtelierHomeComponent,
    AtelierFooterComponent,
    AtelierReceptionComponent,
    AtelierRepairComponent,
    AtelierLeaveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
