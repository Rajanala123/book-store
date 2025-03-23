import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard/dashboard.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { AuthService } from './services/auth.service';

export const routes: Routes = [
  {
    path: '', 
    component: LoginComponent 
  },
  {
    path: 'dashboard', 
    component: DashboardComponent ,canActivate:[AuthService]
  },
  {
    path: 'register', 
    component: RegisterComponent 
  },
  
];
