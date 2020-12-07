import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContractManagementRoutingModule } from './contract-management-routing.module';
import { AllComponent } from './components/all/all.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ContractFormComponent } from './components/contract-form/contract-form.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import 'froala-editor/js/plugins/font_size.min.js';
import 'froala-editor/js/plugins/font_family.min.js';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/plugins/colors.min.js';
import 'froala-editor/js/plugins/lists.min.js';
@NgModule({
  declarations: [AllComponent, ContractFormComponent],
  imports: [
    CommonModule,
    ContractManagementRoutingModule,
    SharedModule,
    FroalaEditorModule.forRoot(), FroalaViewModule.forRoot(),
  ]
})
export class ContractManagementModule { }
