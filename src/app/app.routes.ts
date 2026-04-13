import { Routes } from '@angular/router';
import { Demo } from './demo/demo';

export const routes: Routes = [
  { path: '', component: Demo },
  { path: 'demo', redirectTo: '', pathMatch: 'full' }
];
