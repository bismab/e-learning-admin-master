import { environment } from 'src/environments/environment';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/elearning/users/services/user.service';

@Component({
  selector: 'app-quiz-report',
  templateUrl: './quiz-report.component.html',
  styleUrls: ['./quiz-report.component.scss']
})
export class QuizReportComponent implements OnInit {
  @Input('studentId') id;
  @Input('studentQuizDetails') studentQuizDetails;
  @Output('studentQuizDetails') studentQuizDetailsInit = new EventEmitter();
  staticFileUrl = environment.staticFilesBaseUrl;
  message = '';
  constructor(private userSer: UserService) { }

  ngOnInit(): void {
    if (this.id) {
      if (!this.studentQuizDetails) {
        this.loadStudentQuizDetails(this.id);
      }
    }
  }


  loadStudentQuizDetails(id) {
    this.userSer.getStudentQuizDetails(id).subscribe(res => {
      if (res.status) {
        console.log(res.data)
        this.studentQuizDetailsInit.emit(res.data);
        this.studentQuizDetails = res.data;
      } else {
        this.message = res.message;
      }
    })
  }



}
