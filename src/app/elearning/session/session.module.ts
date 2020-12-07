import { SharedModule } from 'src/app/shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SessionRoutingModule } from './session-routing.module';
import { AllSessionsComponent } from './components/all-sessions/all-sessions.component';
import { SessionComponent } from './components/session/session.component';
import { SessionAssignmentComponent } from './components/session-assignment/session-assignment.component';
import { EnrollmentsComponent } from './components/enrollments/enrollments.component';


@NgModule({
  declarations: [AllSessionsComponent, SessionComponent, SessionAssignmentComponent, EnrollmentsComponent],
  imports: [
    CommonModule,
    SessionRoutingModule,
    SharedModule
  ]
})
export class SessionModule { }
