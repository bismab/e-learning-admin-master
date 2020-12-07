import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../../../users/services/user.service';
import { SessionService } from './../../services/session.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-session-assignment',
  templateUrl: './session-assignment.component.html',
  styleUrls: ['./session-assignment.component.scss']
})
export class SessionAssignmentComponent implements OnInit {
  studentEnrollmentRequests = [];
  teachers = [];
  sessionId;
  levelId;
  sessionEnrollment = {} as any;
  constructor(
    private sessionSer: SessionService,
    private userSer: UserService,
    private toastS: ToastrService,
    private actRoute: ActivatedRoute,
    private route: Router,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.sessionId = this.actRoute.snapshot.paramMap.get('sessionId');
    this.levelId = this.actRoute.snapshot.paramMap.get('levelId');
    this.loadSessionEnrollment(this.sessionId);
    this.loadEnrollments(this.sessionId);
  }

  openTeachersListingPopup(content) {
    this.teachers = [];
    this.loadTeachers(this.sessionId);
    this.modalService.open(content, { size: 'lg', scrollable: true, ariaLabelledBy: 'modal-basic-title' });
  }

  openStudentEnrollmentListingPopup(content) {
    this.studentEnrollmentRequests = [];
    this.loadEnrollments(this.sessionId);
    this.modalService.open(content, { size: 'lg', scrollable: true, ariaLabelledBy: 'modal-basic-title' });
  }

  selectStudent(enrollmentId, i) {
    if (confirm('Are you sure you want to add this student in this session ?')) {
      this.sessionSer.addStudentInEnrollment({ enrollmentId: enrollmentId, sessionId: this.sessionId }).subscribe(res => {
        if (res.status) {
          Object.assign(this.sessionEnrollment, res.data);
          this.studentEnrollmentRequests[i].selected = true;
        }
      })
    }
  }

  selectTeacher(teacherId, i) {
    if (confirm('Are you sure you want to add this teacher in this session ?')) {
      this.sessionSer.addTeacherInEnrollment({ teacherId: teacherId, sessionId: this.sessionId }).subscribe(res => {
        if (res.status) {
          Object.assign(this.sessionEnrollment, res.data);
          this.teachers[i].selected = true;
        }
      })
    }
  }

  loadEnrollments(sessionId) {
    this.sessionSer.getWaitingEnrollmentsForAssignment(sessionId).subscribe(res => {
      if (res.status) {
        this.studentEnrollmentRequests = (res.data) ? res.data : {};
      }
    })
  }

  loadTeachers(sessionId) {
    this.userSer.getAllTeachersOfLevel(sessionId).subscribe(res => {
      if (res.status) {
        this.teachers = res.data;
      }
    })
  }

  removeTeacher(SEnId) {
    if (confirm("Are you sure you want to remove this teacher ?")) {
      this.sessionSer.removeTeacherInEnrollment(this.sessionId, { sessionEnrollmentId: SEnId }).subscribe(res => {
        if (res.status) {
          this.sessionEnrollment.teacher = undefined;
          this.toastS.success(res.message);
        }
      })
    }
  }

  removeStudent(SEnId, enrollmentId, index) {
    if (confirm("Are you sure you want to remove this student ?")) {
      this.sessionSer.removeStudentInEnrollment(this.sessionId, { sessionEnrollmentId: SEnId, enrollmentId: enrollmentId }).subscribe(res => {
        if (res.status) {
          this.sessionEnrollment.students.splice(index, 1);
          this.toastS.success(res.message);
        }
      })
    }
  }

  loadSessionEnrollment(sessionId) {
    this.sessionSer.getSesionEnrolments(sessionId).subscribe(res => {
      if (res.status) {
        this.sessionEnrollment = (res.data) ? res.data : {};
      }
    })
  }

}
