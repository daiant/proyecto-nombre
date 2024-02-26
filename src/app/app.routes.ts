import { Routes } from '@angular/router';
import { BlogpostComponent } from './blogpost/blogpost.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
  { path: 'blog/:article', component: BlogpostComponent },
  { path: 'blog', component: HomeComponent },
  { path: '', component: HomeComponent },
];
