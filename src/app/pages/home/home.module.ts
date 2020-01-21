import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from 'src/services/auth/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [ AuthGuard ] }
]

@NgModule({
  declarations: [  HomeComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ]
})
export class HomeModule { }
