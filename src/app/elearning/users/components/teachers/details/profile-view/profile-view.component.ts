import { environment } from './../../../../../../../environments/environment';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/elearning/users/services/user.service';

@Component({
  selector: 'app-teacher-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class TeacherProfileViewComponent implements OnInit {
  @Input('teacherId') id;
  @Input('teacherProfileInfo') teacherProfileDetails;
  @Output('teacherProfileInfo') teacherProfileDetailsInit = new EventEmitter();
  demoClasses = [];
  selectedDemoClass = '';
  staticUrl = environment.staticFilesBaseUrl;
  constructor(private userSer: UserService, private toastS: ToastrService) { }

  ngOnInit(): void {
    if (this.id) {
      // if (!this.teacherProfileDetails) {
        this.loadTeacherProfileDetails(this.id);
      // }
      // if (this.teacherProfileDetails && this.teacherProfileDetails.teacherApprovalInfoLevel == 'none') {
      this.loadDemoClasses();
      // }
    }
  }

  declineProfile() {
    this.userSer.declineTeacherAcademicInfo(this.id).subscribe(res => {
      if (res.status) {
        this.teacherProfileDetails.teacherAcademicInfo.status = 'declined';
        this.toastS.success(res.message);
      }
    })
  }
  loadTeacherProfileDetails(id) {
    this.userSer.getTeacherProfileDetails(id).subscribe(res => {
      if (res.status) {
        this.teacherProfileDetailsInit.emit(res.data);
        this.teacherProfileDetails = res.data;
        if (this.teacherProfileDetails.teacherApprovalInfoLevel == 'none') {
          this.loadDemoClasses();
        }
      }
    })
  }

  loadDemoClasses() {
    this.userSer.getDemoClassesForAssignment().subscribe(res => {
      if (res.status) {
        this.demoClasses = res.data;
      }
    })
  }

  assignDemoClassAndApproveProfile() {
    if (!this.selectedDemoClass) {
      this.toastS.warning('Please Select Demo Class!');
      return;
    }
    this.userSer.assignDemoClassANdUpdateTeacherLevel(this.id, { demoClass: this.selectedDemoClass }).subscribe(res => {
      if (res.status) {
        this.teacherProfileDetails.teacherApprovalInfoLevel = res.data.approvalLevel;
        this.teacherProfileDetails.teacherAcademicInfo.status = 'approved';
        this.toastS.success(res.message);
      } else {
        this.toastS.error(res.message);
      }
    })
  }


}
