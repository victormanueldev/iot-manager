import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/services/auth/auth.guard';


const routes: Routes = [
  { path : 'auth',  loadChildren: () => import('./layouts/auth/auth.module').then(m => m.AuthModule )},
  { path : 'admin', loadChildren: () => import('./layouts/admin/admin.module').then( m => m.AdminModule ), canActivate: [AuthGuard]},
  { path : '',      redirectTo: '/auth/login', pathMatch: 'full' },
  { path : '**',      redirectTo: '/auth/login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
