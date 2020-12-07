import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { UserService } from 'src/app/elearning/users/services/user.service';

@Component({
  selector: 'app-profile-view',
  templateUrl: './profile-view.component.html',
  styleUrls: ['./profile-view.component.scss']
})
export class ProfileViewComponent implements OnInit {
  @Input('studentId') id;
  @Input('studentProfileInfo') studentProfileDetails;
  @Output('studentProfileInfo') studentProfileDetailsInit = new EventEmitter();
  constructor(private userSer: UserService) { }

  ngOnInit(): void {
    if (this.id) {
      // if (!this.studentProfileDetails) {
        this.loadStudentProfileDetails(this.id);
      // }
    }
  }


  loadStudentProfileDetails(id) {
    this.userSer.getStudentDetails(id).subscribe(res => {
      if (res.status) {
        this.studentProfileDetailsInit.emit(res.data);
        this.studentProfileDetails = res.data;
      }
    })
  }

}
