import { Component, inject } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatButton } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatError, MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    imports: [MatFormField, MatLabel, MatInput, FormsModule, ReactiveFormsModule, MatButton, MatError]
})
export class LoginComponent {
  loginForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)]),
  })
  private auth = inject(AuthService);

  login() {
    if (this.loginForm.valid && this.loginForm.value.username && this.loginForm.value.password)
    {
      this.auth.login(this.loginForm.value.username, this.loginForm.value.password);
    }
  }
}
