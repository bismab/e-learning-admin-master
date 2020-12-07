import { DashboardModule } from './dashboard/dashboard.module';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UsersModule } from './users/users.module';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard/stats', pathMatch: 'full' },
  {
    path: 'users',
    loadChildren: './users/users.module#UsersModule',
  },
  {
    path: 'dashboard',
    loadChildren: './dashboard/dashboard.module#DashboardModule',
  },
  {
    path: 'contract',
    loadChildren: () => import('./contract-management/contract-management.module').then(m => m.ContractManagementModule)
  },
  {
    path: 'class',
    loadChildren: () => import('./class-management/class-management.module').then(m => m.ClassManagementModule)
  },
  {
    path: 'quiz',
    loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule)
  },
  {
    path: 'training',
    loadChildren: () => import('./training/training.module').then(m => m.TrainingModule)
  },
  {
    path: 'level',
    loadChildren: () => import('./level/level.module').then(m => m.LevelModule)
  },
  {
    path: 'session',
    loadChildren: () => import('./session/session.module').then(m => m.SessionModule)
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    UsersModule,
    DashboardModule
  ],
  exports: [RouterModule]
})
export class ElearningRoutingModule { }
