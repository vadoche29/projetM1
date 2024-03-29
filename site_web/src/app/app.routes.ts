import { Routes } from '@angular/router';
import { ListComponent } from './list/list.component';
import { SignalerComponent } from './signaler/signaler.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ListAdminComponent } from './list-admin/list-admin.component';
import { DataComponent } from './data/data.component';

export const routes: Routes = [
{path: 'lieux', component: ListComponent},
{path:'signaler/:ville', component: SignalerComponent},
{path: '', component: LandingPageComponent},
{path: 'page-admin', component: ListAdminComponent},
{path: 'data/:ville', component: DataComponent}];
