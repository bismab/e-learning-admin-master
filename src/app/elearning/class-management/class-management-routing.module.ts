import { FormComponent } from './components/class-types/form/form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DemoClassesComponent } from './components/demo-classes/demo-classes.component';
import { ClassTypesComponent } from './components/class-types/class-types.component';


const routes: Routes = [
  {
    path: 'demo',
    component: DemoClassesComponent
  },
  {
    path: 'type/all',
    component: ClassTypesComponent
  },
  {
    path: 'type/create',
    component: FormComponent
  },
  {
    path: 'type/edit/:typeId',
    component: FormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClassManagementRoutingModule { }
