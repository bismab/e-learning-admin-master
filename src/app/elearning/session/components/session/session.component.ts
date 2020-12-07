import { LevelService } from 'src/app/elearning/level/services/level.service';
import { ClassService } from './../../../class-management/services/class.service';
import { SessionService } from './../../services/session.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-session',
  templateUrl: './session.component.html',
  styleUrls: ['./session.component.scss']
})
export class SessionComponent implements OnInit {
  session = { days: {} as any } as any;
  sessionId;
  classTypes = [];
  levels = [];
  hoveredDate: NgbDate | null = null;
  fromDate;
  fromTime = { hour: 13, minute: 30 };
  toTime = { hour: 13, minute: 30 };
  toDate;
  days = [{ k: 'sun', t: 'Sunday' },
  { k: 'mon', t: 'Monday' },
  { k: 'tue', t: 'Tuesday' },
  { k: 'wed', t: 'Wednesday' },
  { k: 'thu', t: 'Thursday' },
  { k: 'fri', t: 'Friday' },
  { k: 'sat', t: 'Saturday' }]
  constructor(
    private sessionSer: SessionService,
    private classSer: ClassService,
    private levelSer: LevelService,
    private toastS: ToastrService,
    private actRoute: ActivatedRoute,
    private route: Router,
    private calendar: NgbCalendar) {
  }

  ngOnInit(): void {
    this.sessionId = this.actRoute.snapshot.paramMap.get('sessionId');
    if (this.sessionId) {
      this.loadSessionInfo(this.sessionId);
    } else {
      this.fromDate = this.calendar.getToday();
      this.toDate = this.calendar.getNext(this.calendar.getToday(), 'd', 10);

    }
    console.log(this.fromDate);
    console.log(this.toDate);

    this.loadClassTypes();
    this.loadLevels();
  }

  save() {
    let currDate = new Date();
    this.session.startDate = new Date(Date.UTC(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day, 12, 0, 0));
    this.session.endDate = new Date(Date.UTC(this.toDate.year, this.toDate.month - 1, this.toDate.day, 23, 59, 59));
    this.session.startTime = new Date(currDate.getUTCFullYear(), currDate.getUTCMonth(), currDate.getUTCDate(), this.fromTime.hour, this.fromTime.minute, 0);
    this.session.endTime = new Date(currDate.getUTCFullYear(), currDate.getUTCMonth(), currDate.getUTCDate(), this.toTime.hour, this.toTime.minute, 0);
    console.log(this.session);
    if (this.sessionId) {
      this.sessionSer.updateSessionInfo(this.sessionId, this.session).subscribe(res => {
        if (res.status) {
          this.toastS.success(res.message);
          this.route.navigate(['/session/all'])
        }
      })
    } else {
      this.sessionSer.create(this.session).subscribe(res => {
        if (res.status) {
          this.toastS.success(res.message);
          this.route.navigate(['/session/all'])
        }
      })
    }
  }

  loadSessionInfo(sessionId) {
    this.sessionSer.getSessionInfo(sessionId).subscribe(res => {
      if (res.status) {
        this.session = res.data;
        this.fromTime = {
          hour: new Date(this.session.startTime).getHours(),
          minute: new Date(this.session.startTime).getMinutes()
        };
        this.toTime = {
          hour: new Date(this.session.endTime).getHours(),
          minute: new Date(this.session.endTime).getMinutes()
        };
        this.fromDate = {
          year: new Date(this.session.startDate).getUTCFullYear(),
          month: new Date(this.session.startDate).getUTCMonth() + 1,
          day: new Date(this.session.startDate).getUTCDate()
        };
        this.toDate = {
          year: new Date(this.session.endDate).getUTCFullYear(),
          month: new Date(this.session.endDate).getUTCMonth() + 1,
          day: new Date(this.session.endDate).getUTCDate()
        };
        console.log(this.fromDate);
        console.log(this.toDate);
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

  loadLevels() {
    this.levelSer.getAllActiveLevels().subscribe(res => {
      if (res.status) {
        this.levels = res.data;
      }
    })
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }

}
