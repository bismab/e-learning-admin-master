import { AuthGuard } from './guards/auth.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FullComponent } from './layout/full/full.component';
import { AuthRoutesAppearanceGuard } from './guards/auth-routes-appearance.guard';
import { AuthAdminGuard } from './guards/auth-admin.guard';

const routes: Routes = [
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard, AuthAdminGuard],
    children: [
      {
        path: '',
        loadChildren: './elearning/elearning.module#ElearningModule',
      }
    ],
  },
  {
    path: 'auth',
    canActivate: [AuthRoutesAppearanceGuard],
    loadChildren: './auth/auth.module#AuthModule',
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
