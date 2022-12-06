import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { APP_ROUTES } from './app.routes';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, { providers: [ provideRouter(APP_ROUTES) ]});
