import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from './auth.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgIf, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    standalone: true,
    imports: [NgIf, RouterLink, RouterLinkActive, RouterOutlet, AsyncPipe]
})
export class AppComponent {
  title = 'Jugendfeuerwehr Anwesenheit';
  private breakpointObserver = inject(BreakpointObserver);
  constructor(private auth: AuthService) { }

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  logout()
  {
    this.auth.logout()
  }

  isloggedin(): boolean
  {
    return this.auth.isloggedin()
  }
}
