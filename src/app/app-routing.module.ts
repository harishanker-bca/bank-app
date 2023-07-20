import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { authGaurdGuard } from './gaurd/auth-gaurd.guard';

const routes: Routes = [
  { path: "", component: LandingComponent },
  { path: "user/login", component: LoginComponent },
  { path: "user/register", component: RegisterComponent },
  { path: "user/dashboard", component: UserDashboardComponent,canActivate:[authGaurdGuard]},
  { path: "user/transactions", component: TransactionsComponent,canActivate:[authGaurdGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
