import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { PreloadAllModules, provideRouter, withPreloading } from '@angular/router';
import { AppComponent } from './app/app.component';
import routeConfig from './app/routes';
import { provideHttpClient } from '@angular/common/http';

bootstrapApplication(AppComponent, {
    providers: [
        provideAnimationsAsync(),
        provideRouter(routeConfig , withPreloading(PreloadAllModules)),
        provideHttpClient()
    ]
})
  .catch(err => console.error(err));
