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
    email     : new FormControl('', Validators.compose([Validators.email, Validators.required])),
    password  : new FormControl('', Validators.compose([ Validators.minLength(8), Validators.required]))
  });

  validationMessages: any = null;
  constructor(
    private router      : Router,
    private authService : AuthService
  ) {

    this.validationMessages = {
      'email' : [
        { type: 'required', message: 'Please enter your email' },
				{ type: 'email', 	message: 'Please enter a valid email' },
      ],
      'password' : [
        { type: 'required',   message: 'Please enter your password' },
				{ type: 'minlength', 	message: 'Password has contain at least 8 characters' },
      ]
    }

   }

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
