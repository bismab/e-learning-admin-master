import { TrainingService } from './../../services/training.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trainings',
  templateUrl: './trainings.component.html',
  styleUrls: ['./trainings.component.scss']
})
export class TrainingsComponent implements OnInit {
  currPage = 1;
  collSize = 0;
  numOfItems = 20;
  search = {} as any;
  trainings = [];

  constructor(private toastSer: ToastrService,
    private trainingS: TrainingService,
    private rout: Router,
    private actRout: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRout.queryParamMap.subscribe(qparams => {
      this.currPage = parseInt(qparams.get('page'));
      if (this.currPage) {
        this.loadTrainings();
      }
    })
  }

  loadTrainings() {
    this.trainingS.getAllTrainings({ currPage: this.currPage, numOfItems: this.numOfItems, search: this.search }).subscribe(res => {
      this.trainings = (res.data[0].data) ? res.data[0].data : [];
      // this.tempUsers = (res.data[0].data) ? res.data[0].data : [];
      this.collSize = (res.data[0].count[0]) ? res.data[0].count[0].count : 0;
    });
  }

  deleteTraining(trainingId, index) {
    if (confirm("Are you sure you want to delete this training ?")) {
      this.trainingS.deleteTraining(trainingId).subscribe(res => {
        this.toastSer.success(res.message);
        this.trainings.splice(index, 1);
      });
    }
  }

  activationTraining(trainingId, isActive, index) {
    if (!isActive) {
      if (confirm("Are you sure you want to activate this training ?")) {
        this.trainingS.activateTraining(trainingId).subscribe(res => {
          if (res.status) {
            this.trainings[index].isActive = true;
            this.toastSer.success(res.message);
          } else {
            this.toastSer.error(res.message);
          }
        });
      }
    } else if (isActive) {
      if (confirm("Are you sure you want to deactivate this training ?")) {
        this.trainingS.deactivateTraining(trainingId).subscribe(res => {
          if (res.status) {
            this.trainings[index].isActive = false;
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
