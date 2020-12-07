import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingsComponent } from './components/trainings/trainings.component';
import { TrainingFormComponent } from './components/training-form/training-form.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { AccordionModule } from 'primeng/accordion';

@NgModule({
  declarations: [TrainingsComponent, TrainingFormComponent],
  imports: [
    CommonModule,
    TrainingRoutingModule,
    SharedModule,
    AccordionModule
  ]
})
export class TrainingModule { }
