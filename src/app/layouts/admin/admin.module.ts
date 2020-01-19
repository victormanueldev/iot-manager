import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin.component';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path : 'home',    loadChildren: () => import('../../pages/home/home.module').then(m => m.HomeModule)  },
      { path : 'details', loadChildren: () => import('../../pages/details/details.module').then(m => m.DetailsModule) }
    ]
  }
]

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ]
})
export class AdminModule { }
