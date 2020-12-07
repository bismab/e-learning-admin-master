import { SessionAssignmentComponent } from './components/session-assignment/session-assignment.component';
import { SessionComponent } from './components/session/session.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AllSessionsComponent } from './components/all-sessions/all-sessions.component';
import { EnrollmentsComponent } from './components/enrollments/enrollments.component';


const routes: Routes = [
  { path: 'all', component: AllSessionsComponent },
  { path: 'create', component: SessionComponent },
  { path: 'edit/:sessionId', component: SessionComponent },
  { path: 'assignment/:sessionId/:levelId', component: SessionAssignmentComponent },
  { path: 'enrollments/all', component: EnrollmentsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SessionRoutingModule { }
