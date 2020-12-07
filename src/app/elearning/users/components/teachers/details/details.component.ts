import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class TeacherDetailsComponent implements OnInit {
  active;
  teacherId;
  teacherProfileDetails = {} as any;
  teacherDemoClassDetails;
  teacherContractDetails;
  constructor(
    private userSer: UserService,
    private actRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.teacherId = this.actRoute.snapshot.paramMap.get('id');
  }

  changeState(tab) {
    if (tab == 'tpd') {
      if (!this.teacherProfileDetails) {
        // this.loadStudentProfileDetails(this.studentId);
      }
    } else if (tab == 'tdcd') {
      // if (!this.studentQuizDetails) {
      // this.loadStudentQuizDetails(this.studentId);
      // }
    } else if (tab == 'tcd') {

    }
  }



  profileInit(event) {
    Object.assign(this.teacherProfileDetails, event);
    console.log('from main', this.teacherProfileDetails);

  }

  demoClassInit(event) {
    this.teacherDemoClassDetails = event;
  }
  contractInit(event) {
    this.teacherContractDetails = event;
  }

  approvalLevelInit(event) {
    this.teacherProfileDetails.teacherApprovalInfoLevel = event;
  }

}
