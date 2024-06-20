import { Routes } from '@angular/router';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { authGuard } from './guards/auth/auth.guard';
import { LoginComponent } from './modules/login/login.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'app',
      component: DashboardComponent,
      canActivate: [authGuard],
      children: [
        { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
        /*{ path: 'dashboard', component: LayoutDashComponent, canActivate: [authGuard] },
        { path: 'estudiantes', component: EstudiantesComponent, canActivate: [authGuard] },
        { path: 'docentes', component: DocentesComponent, canActivate: [authGuard] },
        { path: 'apoderados', component: ApoderadosComponent, canActivate: [authGuard] },
        { path: 'grupos', component: GruposComponent, canActivate: [authGuard] },
        { path: 'matriculas', component: MatriculasComponent, canActivate: [authGuard] },*/
      ]
    }
];
