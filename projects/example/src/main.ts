import {bootstrapApplication} from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';
import { AdvancedComponent } from './app/pages/advanced/advanced.component';
import { AppComponent } from './app/app.component';
import { SimpleComponent } from './app/pages/simple/simple.component';

const routes: Routes = [
  { path: '', redirectTo: '/simple', pathMatch: 'full' },
  { path: 'simple', component: SimpleComponent },
  { path: 'advanced', component: AdvancedComponent }
];

bootstrapApplication(
  AppComponent, 
  { providers: [ provideRouter(routes) ]}
);
