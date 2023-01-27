import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { DepositComponent } from './components/client/deposit/deposit.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { HeaderComponent } from './components/client/header/header.component';
import { FooterComponent } from './components/client/footer/footer.component';
import { RepairProgressComponent } from './components/client/repair-progress/repair-progress.component';
import { BillingComponent } from './components/client/billing/billing.component';
import { CarRecoveryComponent } from './components/client/car-recovery/car-recovery.component';
import { RepairHistoryComponent } from './components/client/repair-history/repair-history.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { AtelierHeaderComponent } from './components/atelier/atelier-header/atelier-header.component';
import { AtelierHomeComponent } from './components/atelier/atelier-home/atelier-home.component';
import { AtelierFooterComponent } from './components/atelier/atelier-footer/atelier-footer.component';
import { AtelierReceptionComponent } from './components/atelier/atelier-reception/atelier-reception.component';
import { AtelierRepairComponent } from './components/atelier/atelier-repair/atelier-repair.component';
import { AtelierLeaveComponent } from './components/atelier/atelier-leave/atelier-leave.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FinancierHeaderComponent } from './components/financier/financier-header/financier-header.component';
import { FinancierFooterComponent } from './components/financier/financier-footer/financier-footer.component';
import { FinancierHomeComponent } from './components/financier/financier-home/financier-home.component';
import { FinancierPayementComponent } from './components/financier/financier-payement/financier-payement.component';
import { FinancierStatistiqueComponent } from './components/financier/financier-statistique/financier-statistique.component';
import { ClientHomeComponent } from './components/client/client-home/client-home.component';
import { HttpClientModule } from '@angular/common/http';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';

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
    AtelierLeaveComponent,
    FinancierHeaderComponent,
    FinancierFooterComponent,
    FinancierHomeComponent,
    FinancierPayementComponent,
    FinancierStatistiqueComponent,
    ClientHomeComponent,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
