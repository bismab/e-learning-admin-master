import { TeacherDetailsComponent } from './components/teachers/details/details.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { StudentsComponent } from './components/students/students.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { DetailsComponent } from './components/students/details/details.component';
import { ProfileViewComponent } from './components/students/details/profile-view/profile-view.component';
import { QuizReportComponent } from './components/students/details/quiz-report/quiz-report.component';
import { DemoClassDetailsComponent } from './components/teachers/details/demo-class-details/demo-class-details.component';
import { ContractDetailsComponent } from './components/teachers/details/contract-details/contract-details.component';
import { TeacherProfileViewComponent } from './components/teachers/details/profile-view/profile-view.component';


@NgModule({
  declarations: [
    StudentsComponent,
    TeachersComponent,
    DetailsComponent,
    TeacherDetailsComponent,
    ProfileViewComponent,
    TeacherProfileViewComponent,
    QuizReportComponent,
    DemoClassDetailsComponent,
    ContractDetailsComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule
  ]
})
export class UsersModule { }
