import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { QuizRoutingModule } from './quiz-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { QuizFormComponent } from './components/quiz-form/quiz-form.component';
import { QuizesComponent } from './components/quizes/quizes.component';
import { AccordionModule } from 'primeng/accordion';


@NgModule({
  declarations: [QuizFormComponent, QuizesComponent],
  imports: [
    CommonModule,
    QuizRoutingModule,
    SharedModule,
    AccordionModule
  ]
})
export class QuizModule { }
