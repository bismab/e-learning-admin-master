import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ElearningRoutingModule } from './elearning-routing.module';
import { HomeComponent } from './components/home/home.component';
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    ElearningRoutingModule,
    SharedModule,
  ]
})
export class ElearningModule { }
