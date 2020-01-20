import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signupForm  = new FormGroup({
    email     : new FormControl('', Validators.email),
    password  : new FormControl('')
  });

  constructor(
    private router      : Router,
    private authService : AuthService
  ) { }

  ngOnInit() {
  }

  back(): void {
    this.router.navigate(['/auth/login']);
  }

  async signup(): Promise<void> {
    try {
      const res = this.authService.signUp(
        this.signupForm.value.email,
        this.signupForm.value.password
      );

      this.router.navigate(['/admin/home']);
    } catch (error) {
      console.log(error)
    }
  }

}
