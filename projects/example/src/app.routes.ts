import { Routes } from "@angular/router";

export const APP_ROUTES: Routes = [
    { path: '', redirectTo: '/simple', pathMatch: 'full' },
    { path: 'simple', loadComponent: () => import('./app/pages/simple/simple.component').then(mod => mod.SimpleComponent) },
    { path: 'advanced', loadComponent: () => import('./app/pages/advanced/advanced.component').then(mod => mod.AdvancedComponent) }
  ];