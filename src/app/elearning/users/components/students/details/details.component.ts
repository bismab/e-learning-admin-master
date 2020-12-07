import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { UserService } from './../../../services/user.service';
import { Component, OnInit } from '@angular/core';
import { LevelService } from 'src/app/elearning/level/services/level.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  active;
  studentId;
  studentProfileDetails = {} as any;
  studentQuizDetails;
  levels = [];
  selectedLevel = '';
  constructor(private userSer: UserService,
    private actRoute: ActivatedRoute,
    private levelS: LevelService,
    private toastS: ToastrService) { }

  ngOnInit(): void {
    this.studentId = this.actRoute.snapshot.paramMap.get('id');
    this.loadLevels();
  }

  changeState(tab) {
    if (tab == 'spd') {
      if (!this.studentProfileDetails) {
        // this.loadStudentProfileDetails(this.studentId);
      }
    } else if (tab == 'sqd') {
      if (!this.studentQuizDetails) {
        // this.loadStudentQuizDetails(this.studentId);
      }
    }
  }

  setLevel(data) {
    this.selectedLevel = data.target.value;
  }
  saveLevel() {
    if (!this.selectedLevel) {
      this.toastS.success("Please Select level for the student!");
      return;
    }
    this.userSer.setStudentLevel(this.studentId, { level: this.selectedLevel }).subscribe(res => {
      if (res.status) {
        this.studentProfileDetails.level = this.selectedLevel;
        this.toastS.success(res.message);
      }
    })
  }
  profileInit(event) {
    this.studentProfileDetails = event;
  }

  loadLevels() {
    this.levelS.getAllActiveLevels().subscribe(res => {
      if (res.status) {
        this.levels = res.data;
      }
    })
  }

  quizInit(event) {
    this.studentQuizDetails = event;
  }

}
