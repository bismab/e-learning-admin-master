import { Component, OnInit } from '@angular/core';
import { SessionService } from '../../services/session.service';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss']
})
export class EnrollmentsComponent implements OnInit {
  currPage = 1;
  collSize = 0;
  numOfItems = 20;
  search = { status: 'waiting' } as any;
  enrollments = [];

  constructor(private toastSer: ToastrService,
    private sessionSer: SessionService,
    private rout: Router,
    private actRout: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRout.queryParamMap.subscribe(qparams => {
      this.currPage = (parseInt(qparams.get('page')) || 0);
      this.loadEnrollments();
    })
  }

  loadEnrollments() {
    this.sessionSer.getAllEnrollments({ currPage: this.currPage, numOfItems: this.numOfItems, search: this.search }).subscribe(res => {
      this.enrollments = (res.data[0].data) ? res.data[0].data : [];
      // this.tempUsers = (res.data[0].data) ? res.data[0].data : [];
      this.collSize = (res.data[0].count[0]) ? res.data[0].count[0].count : 0;
    });
  }


  pagination(val) {
    this.rout.navigate([], {
      queryParams: { page: (val) ? val : 1 },
      queryParamsHandling: 'merge'
    });
  }

}
