import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { SignalerComponent } from './signaler/signaler.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ListAdminComponent } from './list-admin/list-admin.component';
import { DataComponent } from './data/data.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth.guard';
import { IncidentDetailComponent } from './incident-detail/incident-detail.component';
import { AbsenceComponentComponent } from './absence-component/absence-component.component';

/*
Ce fichier contient la liste des routes de l'application, parfois selon certains critères.
*/

export const routes: Routes = [
{path: 'lieux', component: ListComponent},
{path:'signaler/:ville', component: SignalerComponent},
{path: '', component: LandingPageComponent},
{path: 'page-admin', component: ListAdminComponent, canActivate: [AuthGuard]},
{path: 'data/:ville', component: DataComponent, canActivate: [AuthGuard]},
{path: 'login', component: LoginComponent},
{path: 'incident/:id', component: IncidentDetailComponent},
{path: 'absence', component: AbsenceComponentComponent}];
