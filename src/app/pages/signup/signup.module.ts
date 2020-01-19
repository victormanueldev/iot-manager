import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';

const routes: Routes = [
  { path: '', component: SignupComponent }
]

@NgModule({
  declarations: [ SignupComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild( routes )
  ]
})
export class SignupModule { }
