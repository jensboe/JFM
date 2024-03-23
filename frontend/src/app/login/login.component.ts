import { Component } from '@angular/core';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
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
