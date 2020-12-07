import { QuizesComponent } from './components/quizes/quizes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';


const routes: Routes = [
  {
    path: 'all',
    component: QuizesComponent
  },
  {
    path: 'form',
    component: QuizFormComponent
  },
  {
    path: 'form/:quizId',
    component: QuizFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
