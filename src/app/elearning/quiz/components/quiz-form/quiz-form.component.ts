import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { QuizService } from '../../services/quiz.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-quiz-form',
  templateUrl: './quiz-form.component.html',
  styleUrls: ['./quiz-form.component.scss']
})
export class QuizFormComponent implements OnInit {
  active = 1;
  quizId;
  quizInfo = {} as any;
  questionInfo = { answerOptions: [] } as any;
  questions = [];
  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastSer: ToastrService,
    private quizS: QuizService
  ) { }

  ngOnInit(): void {
    this.quizId = this.actRoute.snapshot.paramMap.get('quizId');
    if (this.quizId) {
      this.loadQuiz(this.quizId);
    }
  }

  loadQuiz(quizId) {
    this.quizS.getQuizDetails(quizId).subscribe(res => {
      if (res.status) {
        this.quizInfo = res.data;
      }
    })
  }
  openQuestionForm(content, question?, index?) {
    this.questionInfo = { answerOptions: [] };
    if (question && index > -1) {
      this.questionInfo = question;
      this.questionInfo.index = index;
    }
    this.modalService.open(content, { size: 'lg', scrollable: true, ariaLabelledBy: 'modal-basic-title' });
  }
  deleteQuestion(questionId, index) {
    if (confirm("Are you sure you want to delete this question ?")) {
      this.quizS.deleteQuestion(questionId).subscribe(res => {
        this.toastSer.success(res.message);
        this.questions.splice(index, 1);
      });
    }
  }
  addOptionForQuestion() {
    if (this.questionInfo.answerOptions.length < 4) {
      this.questionInfo.answerOptions.push({ op: '', isCorrect: false });
    } else {
      this.toastSer.error("Only 4 options are allowed!");
    }
  }

  removeOption(index) {
    this.questionInfo.answerOptions.splice(index, 1);
  }
  saveQuiz() {
    if (this.quizId) {
      this.quizS.updateQuiz(this.quizId, this.quizInfo).subscribe(res => {
        if (res.status) {
          this.toastSer.success(res.message);
          this.active = 2;
        }
      })
    } else {
      this.quizS.createQuiz(this.quizInfo).subscribe(res => {
        if (res.status) {
          this.toastSer.success("Success!");
          this.quizId = res.data.id;
          this.active = 2;

        }
      })
    }
  }

  loadQuizQuestions(quizId) {
    if (!this.questions.length) {
      this.quizS.getQuestionsOfQuiz(quizId).subscribe(res => {
        if (res.status) {
          this.questions = res.data;
        }
      })
    }
  }

  saveQuestion() {
    if (!this.quizId) {
      this.toastSer.warning('Please create quiz first!');
      this.active = 1;
      this.modalService.dismissAll();
    }
    let data = {
      question: this.questionInfo.question,
      type: this.questionInfo.type,
      marks: this.questionInfo.marks,
      answerOptions: (this.questionInfo.type != 'audio-record') ? this.questionInfo.answerOptions : [],
    } as any;
    if (this.questionInfo._id) {
      this.quizS.updateQuestion(this.questionInfo._id, data).subscribe(res => {
        if (res.status) {
          this.questions[this.questionInfo.index].question = this.questionInfo.question;
          this.questions[this.questionInfo.index].type = this.questionInfo.type;
          this.questions[this.questionInfo.index].marks = this.questionInfo.marks;
          this.questions[this.questionInfo.index].answerOptions = this.questionInfo.answerOptions;
          this.modalService.dismissAll();
          this.toastSer.success(res.message);
        }
      })
    } else {
      data.quiz = this.quizId;
      this.quizS.createQuestion(data).subscribe(res => {
        if (res.status) {
          this.questions.push(res.data);
          this.modalService.dismissAll();
        }
      })
    }

  }

  activationQuestion(questionId, isActive, index) {
    if (!isActive) {
      if (confirm("Are you sure you want to activate this question ?")) {
        this.quizS.activateQuestion(questionId).subscribe(res => {
          if (res.status) {
            this.questions[index].isActive = true;
            this.toastSer.success(res.message);
          } else {
            this.toastSer.error(res.message);
          }
        });
      }
    } else if (isActive) {
      if (confirm("Are you sure you want to deactivate this question ?")) {
        this.quizS.deactivateQuestion(questionId).subscribe(res => {
          if (res.status) {
            this.questions[index].isActive = false;
            this.toastSer.success(res.message);
          } else {
            this.toastSer.error(res.message);
          }
        });
      }
    }
  }

  tabChange(e) {
    if (e == 2) {
      if (this.quizId) {
        this.loadQuizQuestions(this.quizId);
      }
    }

  }

}
