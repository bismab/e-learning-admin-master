import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClassManagementRoutingModule } from './class-management-routing.module';
import { DemoClassesComponent } from './components/demo-classes/demo-classes.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ClassTypesComponent } from './components/class-types/class-types.component';
import { FormComponent } from './components/class-types/form/form.component';


@NgModule({
  declarations: [DemoClassesComponent, ClassTypesComponent, FormComponent],
  imports: [
    CommonModule,
    ClassManagementRoutingModule,
    SharedModule
  ]
})
export class ClassManagementModule { }
