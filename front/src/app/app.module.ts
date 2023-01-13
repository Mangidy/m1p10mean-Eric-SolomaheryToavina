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
import { AtelierHeaderComponent } from './components/atelier-header/atelier-header.component';

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
    AtelierHeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
