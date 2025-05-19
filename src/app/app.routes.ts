import { Routes } from '@angular/router';
import { UserListComponent } from './views/user-list/user-list.component';
import { UserFormComponent } from './views/user-form/user-form.component';

export const routes: Routes = [
  { path: '', redirectTo: 'usuarios', pathMatch: 'full' },
  { path: 'usuarios', component: UserListComponent },
  { path: 'usuarios/novo', component: UserFormComponent },
];
