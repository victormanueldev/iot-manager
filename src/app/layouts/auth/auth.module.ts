import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthComponent } from './auth.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { 
    path : '',  
    component : AuthComponent, 
    children: [
      { path : 'login',   loadChildren : () => import('../../pages/login/login.module').then( m => m.LoginModule )},
      { path : 'signup',  loadChildren : () => import('../../pages/signup/signup.module').then( m => m.SignupModule )},
      { path : '**',      redirectTo: '/auth/login' },
    ]
  },
  { path : '**',      redirectTo: '/auth/login' },
]

@NgModule({
  declarations: [AuthComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ]
})
export class AuthModule { }
