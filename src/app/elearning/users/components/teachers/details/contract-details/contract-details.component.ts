import { ClassService } from './../../../../../class-management/services/class.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { UserService } from 'src/app/elearning/users/services/user.service';
import { environment } from 'src/environments/environment';
import { LevelService } from 'src/app/elearning/level/services/level.service';

@Component({
  selector: 'app-contract-details',
  templateUrl: './contract-details.component.html',
  styleUrls: ['./contract-details.component.scss']
})
export class ContractDetailsComponent implements OnInit {
  @Input('teacherId') id;
  @Input('teacherContractInfo') teacherContractDetails;
  @Input('teacherProfileInfo') teacherProfileInfo;
  @Output('teacherProfileInfo') teacherProfileDetailsInit = new EventEmitter();
  @Input('approvalInfo') approvalInfo;
  @Output('teacherContractInfo') teacherContractDetailsInit = new EventEmitter();
  staticUrl = environment.staticFilesBaseUrl;
  levels = [];
  classTypes = [];
  selection = { level: '', classType: '' };
  constructor(private userSer: UserService,
    private levelS: LevelService,
    private classSer: ClassService,
    private toastS: ToastrService) { }

  ngOnInit(): void {
    if (this.id) {
      // if (!this.teacherContractDetails) {
      this.loadTeacherContractDetails(this.id);
      // }
    }
    this.loadLevels();
    this.loadClassTypes();
  }

  setLevel(data) {
    if (data.target && this.id) {
      this.selection.level = data.target.value;
    }
  }

  setClassType(data) {
    if (data.target && this.id) {
      this.selection.classType = data.target.value;
    }
  }

  saveLevelAndClassTypes() {
    if (this.selection.level) {
      this.userSer.setTeacherLevel(this.id, { level: this.selection.level, classType: this.selection.classType }).subscribe(res => {
        if (res.status) {
          // this.approvalInfo = 'all';
          this.teacherProfileInfo.level = this.selection.level;
          this.teacherProfileInfo.teacherApprovalInfoLevel = 'all'
          this.teacherProfileDetailsInit.emit(this.teacherProfileInfo);
          this.toastS.success(res.message);
        }
      })
    } else {
      this.toastS.warning("Please select class and level of the teacher!");
    }
  }

  loadLevels() {
    this.levelS.getAllActiveLevels().subscribe(res => {
      if (res.status) {
        this.levels = res.data;
      }
    })
  }

  loadClassTypes() {
    this.classSer.getAllActiveTypes().subscribe(res => {
      if (res.status) {
        this.classTypes = res.data;
      }
    })
  }


  loadTeacherContractDetails(id) {
    this.userSer.getTeacherContractDetails(id).subscribe(res => {
      if (res.status) {
        this.teacherContractDetailsInit.emit(res.data);
        this.teacherContractDetails = res.data;
      }
    })
  }

}
