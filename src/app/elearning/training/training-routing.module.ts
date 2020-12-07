import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { TrainingFormComponent } from './components/training-form/training-form.component';


const routes: Routes = [
  {
    path: 'all',
    component: TrainingsComponent
  },
  {
    path: 'form',
    component: TrainingFormComponent
  },
  {
    path: 'form/:trainingId',
    component: TrainingFormComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }
