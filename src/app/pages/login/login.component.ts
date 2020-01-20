import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/services/auth/auth.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	loginForm   = new FormGroup({
		email     : new FormControl('', Validators.email),
		password  : new FormControl('')
	})

	constructor(
		private router: Router,
		private authService : AuthService
	) { }

	ngOnInit() {
	}

	signupRedirect(): void {
		this.router.navigate(['/auth/signup']);
	}


	async login(): Promise<void> {

		console.log('Login');
		
		try {
			const credentials = await this.authService.login(
				this.loginForm.value.email,
				this.loginForm.value.password
			)
			console.log(credentials);
			this.router.navigate(['/admin/home']);
		} catch (error) {
			// Valida el tipo de error
			switch (error.code) {
				case 'auth/user-not-found':
				case 'auth/wrong-password':
					console.log('Pasword');
					break
				default:
					console.log(error);
					break;
			}
		}

	}

}
