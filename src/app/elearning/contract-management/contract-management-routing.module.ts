import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllComponent } from './components/all/all.component';
import { ContractFormComponent } from './components/contract-form/contract-form.component';


const routes: Routes = [
  {
    path: 'all',
    component: AllComponent
  },
  {
    path: 'create',
    component: ContractFormComponent
  },
  {
    path: 'edit/:contractId',
    component: ContractFormComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContractManagementRoutingModule { }
