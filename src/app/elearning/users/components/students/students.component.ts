import { UserService } from './../../services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {
  currPage = 1;
  collSize = 0;
  numOfItems = 20;
  search = {} as any;
  users = [];
  constructor(private toastSer: ToastrService, private userS: UserService, private rout: Router, private actRout: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRout.queryParamMap.subscribe(qparams => {
      this.currPage = parseInt(qparams.get('page'));
      if (this.currPage) {
        this.loadUsers();
      }
    })
  }

  loadUsers() {
    this.userS.getAllStudents({ currPage: this.currPage, numOfItems: this.numOfItems, search: this.search }).subscribe(res => {
      this.users = (res.data[0].data) ? res.data[0].data : [];
      // this.tempUsers = (res.data[0].data) ? res.data[0].data : [];
      this.collSize = (res.data[0].count[0]) ? res.data[0].count[0].count : 0;
    });
  }



  deleteUser(userId, index) {
    if (confirm("Are you sure you want to delete this user")) {
      this.userS.deleteStudent(userId).subscribe(res => {
        this.toastSer.success(res.message);
        this.users.splice(index, 1);
      });
    }
  }

  blockUser(userId, isBlocked, index) {
    if (!isBlocked) {
      if (confirm("Are you sure you want to block this user?")) {
        this.userS.blockStudent(userId).subscribe(res => {
          if (res.status) {
            this.users[index].isBlocked = true;
            this.toastSer.success(res.message);
          } else {
            this.toastSer.error(res.message);

          }
        });
      }
    } else if (isBlocked) {
      if (confirm("Are you sure you want to unblock this user?")) {
        this.userS.unblockStudent(userId).subscribe(res => {
          if (res.status) {
            this.users[index].isBlocked = false;
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
