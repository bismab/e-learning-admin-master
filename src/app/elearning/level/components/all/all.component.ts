import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { LevelService } from '../../services/level.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  currPage = 1;
  collSize = 0;
  numOfItems = 20;
  search = {} as any;
  levels = [];
  levelInfo = {} as any;

  constructor(private toastSer: ToastrService,
    private levelS: LevelService,
    private rout: Router,
    private actRout: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRout.queryParamMap.subscribe(qparams => {
      this.currPage = parseInt(qparams.get('page'));
      if (this.currPage) {
        this.loadLevels();
      }
    })
  }

  loadLevels() {
    this.levelS.getAllLevels({ currPage: this.currPage, numOfItems: this.numOfItems, search: this.search }).subscribe(res => {
      this.levels = (res.data[0].data) ? res.data[0].data : [];
      // this.tempUsers = (res.data[0].data) ? res.data[0].data : [];
      this.collSize = (res.data[0].count[0]) ? res.data[0].count[0].count : 0;
    });
  }



  deleteLevel(levelId, index) {
    if (confirm("Are you sure you want to delete this level ?")) {
      this.levelS.deleteLevel(levelId).subscribe(res => {
        this.toastSer.success(res.message);
        this.levels.splice(index, 1);
      });
    }
  }

  activationLevel(levelId, isActive, index) {
    if (!isActive) {
      if (confirm("Are you sure you want to activate this level ?")) {
        this.levelS.activateLevel(levelId).subscribe(res => {
          if (res.status) {
            this.levels[index].isActive = true;
            this.toastSer.success(res.message);
          } else {
            this.toastSer.error(res.message);
          }
        });
      }
    } else if (isActive) {
      if (confirm("Are you sure you want to deactivate this level ?")) {
        this.levelS.deactivateLevel(levelId).subscribe(res => {
          if (res.status) {
            this.levels[index].isActive = false;
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
