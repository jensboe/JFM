import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatButton } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatFormField, MatLabel } from '@angular/material/form-field';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrl: './login.component.css',
    standalone: true,
    imports: [
        MatFormField,
        MatLabel,
        MatInput,
        FormsModule,
        MatButton,
    ],
})
export class LoginComponent {
  username: string="";
  password: string="";

  constructor(private auth: AuthService)
  {

  }
  login()
  {
    this.auth.login(this.username, this.password)
  }
}
