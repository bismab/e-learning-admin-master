import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { AuthHelperService } from 'src/app/services/authHelper.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  focus;
  focus1;
  auth = {} as any;
  constructor(private rout: Router,
    private authSer: AuthService,
    private authHelper: AuthHelperService,
    private toastSer: ToastrService) { }

  ngOnInit(): void {
  }

  login(credentials) {
    this.authSer.login(credentials).subscribe(res => {
      if (res.status) {
        this.authHelper.setAuthToken = res.data.t;
        this.rout.navigate(['/']);
        this.toastSer.success(res.message);
      } else {
        this.toastSer.error(res.message);
      }
    })
  }

}
