import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { authGuard } from './guards/auth/auth.guard';
import { LoginComponent } from './modules/login/login.component';
import { RegisterComponent } from './modules/register/register.component';
import { ReservasComponent } from './modules/reservas/reservas.component';
import { LayoutDashComponent } from './components/layout-dash/layout-dash.component';
import { SedesComponent } from './modules/sedes/sedes.component';
import { ZonasComponent } from './modules/zonas/zonas.component';
import { MesasComponent } from './modules/mesas/mesas.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'reservas', component: ReservasComponent },
    { path: 'app',
      component: DashboardComponent,
      canActivate: [authGuard],
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        { path: 'dashboard', component: LayoutDashComponent, canActivate: [authGuard] },
        { path: 'sedes', component: SedesComponent, canActivate: [authGuard] },
        { path: 'zonas', component: ZonasComponent, canActivate: [authGuard] },
        { path: 'mesas', component: MesasComponent, canActivate: [authGuard] },
        /*{ path: 'grupos', component: GruposComponent, canActivate: [authGuard] },
        { path: 'matriculas', component: MatriculasComponent, canActivate: [authGuard] },*/
        { path: 'app/**', redirectTo: 'login' },
      ]
    },
    { path: '**', redirectTo: 'login' },
];
