import { Routes } from '@angular/router';
import { Demo } from './demo/demo';

export const routes: Routes = [
  { path: '', redirectTo: '/demo', pathMatch: 'full' },
  { path: 'demo', component: Demo }
];
