import { TrainingService } from './../../services/training.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html',
  styleUrls: ['./training-form.component.scss']
})
export class TrainingFormComponent implements OnInit {
  active = 1;
  trainingId;
  trainingInfo = {} as any;
  questionInfo = { answerOptions: [] } as any;
  questions = [];
  trainingAttachment;
  staticUrl = environment.staticFilesBaseUrl;

  constructor(
    private router: Router,
    private actRoute: ActivatedRoute,
    private modalService: NgbModal,
    private toastSer: ToastrService,
    private trainingS: TrainingService
  ) { }

  ngOnInit(): void {
    this.trainingId = this.actRoute.snapshot.paramMap.get('trainingId');
    if (this.trainingId) {
      this.loadTraining(this.trainingId);
    }
  }

  loadTraining(trainingId) {
    this.trainingS.getTrainingDetails(trainingId).subscribe(res => {
      if (res.status) {
        this.trainingInfo = res.data;
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
      this.trainingS.deleteQuestion(questionId).subscribe(res => {
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
  saveTraining() {
    let formData = new FormData();
    formData.append('timeInMins', this.trainingInfo.timeInMins);
    formData.append('description', this.trainingInfo.description);
    formData.append('name', this.trainingInfo.name);
    formData.append('trainingAttachment', this.trainingAttachment);
    if (this.trainingId) {
      this.trainingS.updateTraining(this.trainingId, formData).subscribe(res => {
        if (res.status) {
          this.toastSer.success(res.message);
          this.trainingAttachment = null;
        }
      })
    } else {
      this.trainingS.createTraining(formData).subscribe(res => {
        if (res.status) {
          this.toastSer.success("Success!");
          this.trainingAttachment = null;
          this.trainingId = res.data.id;
          this.active = 2;
        }
      })
    }
  }

  selectFile(event) {
    if (event.target.files && event.target.files[0]) {
      let inputEl: HTMLInputElement = document.querySelector('#attachment');
      this.trainingAttachment = inputEl.files.item(0);
    }
  }

  loadTrainingQuestions(TrainingId) {
    if (!this.questions.length) {
      this.trainingS.getQuestionsOfTraining(TrainingId).subscribe(res => {
        if (res.status) {
          this.questions = res.data;
        }
      })
    }
  }

  saveQuestion() {
    if (!this.trainingId) {
      this.toastSer.warning('Please create training first!');
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
      this.trainingS.updateQuestion(this.questionInfo._id, data).subscribe(res => {
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
      data.training = this.trainingId;
      this.trainingS.createQuestion(data).subscribe(res => {
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
        this.trainingS.activateQuestion(questionId).subscribe(res => {
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
        this.trainingS.deactivateQuestion(questionId).subscribe(res => {
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
      if (this.trainingId) {
        this.loadTrainingQuestions(this.trainingId);
      }
    }

  }

}
