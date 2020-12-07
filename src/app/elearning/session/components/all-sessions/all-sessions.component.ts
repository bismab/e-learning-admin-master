import { SessionService } from './../../services/session.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-all-sessions',
  templateUrl: './all-sessions.component.html',
  styleUrls: ['./all-sessions.component.scss']
})
export class AllSessionsComponent implements OnInit {
  currPage = 1;
  collSize = 0;
  numOfItems = 20;
  search = {} as any;
  sessions = [];

  constructor(private toastSer: ToastrService,
    private sessionSer: SessionService,
    private rout: Router,
    private actRout: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRout.queryParamMap.subscribe(qparams => {
      this.currPage = (parseInt(qparams.get('page')) || 0);
      this.loadsessions();
    })
  }

  loadsessions() {
    this.sessionSer.getAllSessions({ currPage: this.currPage, numOfItems: this.numOfItems, search: this.search }).subscribe(res => {
      this.sessions = (res.data[0].data) ? res.data[0].data : [];
      // this.tempUsers = (res.data[0].data) ? res.data[0].data : [];
      this.collSize = (res.data[0].count[0]) ? res.data[0].count[0].count : 0;
    });
  }



  delete(sessionId, index) {
    if (confirm("Are you sure you want to delete this session ?")) {
      this.sessionSer.deleteSession(sessionId).subscribe(res => {
        this.toastSer.success(res.message);
        this.sessions.splice(index, 1);
      });
    }
  }

  activation(sessionId, isActive, index) {
    if (!isActive) {
      if (confirm("Are you sure you want to activate this session ?")) {
        this.sessionSer.activateSessionInfo(sessionId).subscribe(res => {
          if (res.status) {
            this.sessions[index].isActive = true;
            this.toastSer.success(res.message);
          } else {
            this.toastSer.error(res.message);
          }
        });
      }
    } else if (isActive) {
      if (confirm("Are you sure you want to deactivate this session ?")) {
        this.sessionSer.deactivateSessionInfo(sessionId).subscribe(res => {
          if (res.status) {
            this.sessions[index].isActive = false;
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
