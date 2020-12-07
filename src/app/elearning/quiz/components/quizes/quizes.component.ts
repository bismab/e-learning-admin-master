import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { QuizService } from '../../services/quiz.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.scss']
})
export class QuizesComponent implements OnInit {
  currPage = 1;
  collSize = 0;
  numOfItems = 20;
  search = {} as any;
  quizes = [];

  constructor(private toastSer: ToastrService,
    private quizS: QuizService,
    private rout: Router,
    private actRout: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRout.queryParamMap.subscribe(qparams => {
      this.currPage = parseInt(qparams.get('page'));
      if (this.currPage) {
        this.loadQuizes();
      }
    })
  }

  loadQuizes() {
    this.quizS.getAllQuizes({ currPage: this.currPage, numOfItems: this.numOfItems, search: this.search }).subscribe(res => {
      this.quizes = (res.data[0].data) ? res.data[0].data : [];
      // this.tempUsers = (res.data[0].data) ? res.data[0].data : [];
      this.collSize = (res.data[0].count[0]) ? res.data[0].count[0].count : 0;
    });
  }


  deleteQuiz(quizId, index) {
    if (confirm("Are you sure you want to delete this quiz ?")) {
      this.quizS.deleteQuiz(quizId).subscribe(res => {
        this.toastSer.success(res.message);
        this.quizes.splice(index, 1);
      });
    }
  }


  activationQuiz(quizId, isActive, index) {
    if (!isActive) {
      if (confirm("Are you sure you want to activate this quiz ?")) {
        this.quizS.activateQuiz(quizId).subscribe(res => {
          if (res.status) {
            this.quizes[index].isActive = true;
            this.toastSer.success(res.message);
          } else {
            this.toastSer.error(res.message);
          }
        });
      }
    } else if (isActive) {
      if (confirm("Are you sure you want to deactivate this quiz ?")) {
        this.quizS.deactivateQuiz(quizId).subscribe(res => {
          if (res.status) {
            this.quizes[index].isActive = false;
            this.toastSer.success(res.message);
          } else {
            this.toastSer.error(res.message);
          }
        });
      }
    }
  }

  pagination(val) {
    this.rout.navigate([], {
      queryParams: { page: (val) ? val : 1 },
      queryParamsHandling: 'merge'
    });
  }

}
