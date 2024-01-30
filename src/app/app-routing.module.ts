import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {path: 'lieux', component: ListComponent},
];

@NgModule({
  imports: [ListComponent, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
