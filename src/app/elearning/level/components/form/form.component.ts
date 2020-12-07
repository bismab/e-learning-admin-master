import { Component, OnInit } from '@angular/core';
import { LevelService } from '../../services/level.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  level = {} as any;
  levelId;
  constructor(private levelS: LevelService,
    private toastS: ToastrService,
    private actRoute: ActivatedRoute,
    private route: Router) { }

  ngOnInit(): void {
    this.levelId = this.actRoute.snapshot.paramMap.get('levelId');
    if (this.levelId) {
      this.loadLevelInfo(this.levelId);
    }
  }

  save() {
    if (this.levelId) {
      this.levelS.updateLevel(this.levelId, this.level).subscribe(res => {
        if (res.status) {
          this.toastS.success(res.message);
          this.route.navigate(['/level/all'])
        }
      })
    } else {
      this.levelS.createLevel(this.level).subscribe(res => {
        if (res.status) {
          this.toastS.success(res.message);
          this.route.navigate(['/level/all'])
        }
      })
    }
  }

  loadLevelInfo(levelId) {
    this.levelS.getLevelInfo(levelId).subscribe(res => {
      if (res.status) {
        this.level = res.data;
      }
    })
  }

}
