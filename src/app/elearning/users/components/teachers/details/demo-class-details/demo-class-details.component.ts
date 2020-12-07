import { ToastrService } from 'ngx-toastr';
import { environment } from './../../../../../../../environments/environment';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/elearning/users/services/user.service';

@Component({
  selector: 'app-demo-class-details',
  templateUrl: './demo-class-details.component.html',
  styleUrls: ['./demo-class-details.component.scss']
})
export class DemoClassDetailsComponent implements OnInit {
  @Input('teacherId') id;
  @Input('teacherDemoClassInfo') teacherDemoClassDetails;
  @Input('approvalInfo') approvalInfo;
  @Output('teacherDemoClassInfo') teacherDemoClassDetailsInit = new EventEmitter();
  @Output('approvalLevelInfo') approvalLevelInit = new EventEmitter();
  staticUrl = environment.staticFilesBaseUrl;
  contracts = [];
  selectedContract = '';
  constructor(private userSer: UserService, private toastS: ToastrService) { }

  ngOnInit(): void {
    if (this.id) {
      // if (!this.teacherDemoClassDetails) {
      this.loadTeacherDemoClassDetails(this.id);
      // }
      this.loadContracts();
    }
  }

  decline() {
    this.userSer.declineTeacherDemoClass(this.id).subscribe(res => {
      if (res.status) {
        this.teacherDemoClassDetails.status = "declined";
        this.toastS.success(res.message);
      }
    })
  }


  conditionalizeDemoClass() {
    this.userSer.conditionalizeTeacherDemoClass(this.id).subscribe(res => {
      if (res.status) {
        this.teacherDemoClassDetails.status = "conditional";
        this.toastS.success(res.message);
      }
    })
  }

  loadTeacherDemoClassDetails(id) {
    this.userSer.getTeacherDemoClassDetails(id).subscribe(res => {
      if (res.status) {
        this.teacherDemoClassDetailsInit.emit(res.data);
        this.teacherDemoClassDetails = res.data;
      }
    })
  }

  loadContracts() {
    this.userSer.getContractsForAssignment().subscribe(res => {
      if (res.status) {
        this.contracts = res.data;
      }
    })
  }

  assignContractAndApproveProfile() {
    if (!this.selectedContract) {
      this.toastS.warning('Please Select Contract!');
      return;
    }
    this.userSer.assignContractANdUpdateTeacherLevel(this.id, { contract: this.selectedContract }).subscribe(res => {
      if (res.status) {
        this.approvalInfo = res.data.approvalLevel;
        this.teacherDemoClassDetails.status = "approved";
        this.approvalLevelInit.emit(res.data.approvalLevel);
        this.toastS.success(res.message);
      } else {
        this.toastS.error(res.message);
      }
    })
  }


}
