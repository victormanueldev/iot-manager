import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from 'src/services/auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path : 'home',    loadChildren: () => import('../../pages/home/home.module').then(m => m.HomeModule), canActivate: [AuthGuard]  },
      { path : 'details/:id', loadChildren: () => import('../../pages/details/details.module').then(m => m.DetailsModule), canActivate: [AuthGuard] },
      { path : '**',      redirectTo: '/auth/login' },
    ]
  },
  { path : '**',      redirectTo: '/auth/login' },
]

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild( routes ),
    ReactiveFormsModule
  ]
})
export class AdminModule { }
