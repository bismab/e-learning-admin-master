import { TeacherDetailsComponent } from './components/teachers/details/details.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentsComponent } from './components/students/students.component';
import { DetailsComponent } from './components/students/details/details.component';


const routes: Routes = [
  { path: 'student/details/:id', component: DetailsComponent },
  { path: 'teacher/details/:id', component: TeacherDetailsComponent },
  { path: 'students', component: StudentsComponent },
  { path: 'teachers', component: TeachersComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
