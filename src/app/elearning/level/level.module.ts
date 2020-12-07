import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LevelRoutingModule } from './level-routing.module';
import { AllComponent } from './components/all/all.component';
import { FormComponent } from './components/form/form.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AllComponent, FormComponent],
  imports: [
    CommonModule,
    LevelRoutingModule,
    SharedModule
  ]
})
export class LevelModule { }
