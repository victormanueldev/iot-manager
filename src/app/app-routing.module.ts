import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path : 'auth',  loadChildren: () => import('./layouts/auth/auth.module').then(m => m.AuthModule )},
  { path : 'admin', loadChildren: () => import('./layouts/admin/admin.module').then( m => m.AdminModule )},
  { path : '',      redirectTo: '/auth/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
