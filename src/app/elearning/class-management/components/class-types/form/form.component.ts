import { ClassService } from './../../../services/class.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss']
})
export class FormComponent implements OnInit {
  item = {} as any;
  itemId;
  constructor(private classSer: ClassService,
    private toastS: ToastrService,
    private actRoute: ActivatedRoute,
    private route: Router) { }

  ngOnInit(): void {
    this.itemId = this.actRoute.snapshot.paramMap.get('typeId');
    if (this.itemId) {
      this.loadTypeInfo(this.itemId);
    }
  }

  save() {
    if (this.itemId) {
      this.classSer.updateType(this.itemId, this.item).subscribe(res => {
        if (res.status) {
          this.toastS.success(res.message);
          this.route.navigate(['/class/type/all'])
        }
      })
    } else {
      this.classSer.createtype(this.item).subscribe(res => {
        if (res.status) {
          this.toastS.success(res.message);
          this.route.navigate(['/class/type/all'])
        }
      })
    }
  }

  loadTypeInfo(itemId) {
    this.classSer.getTypeInfo(itemId).subscribe(res => {
      if (res.status) {
        this.item = res.data;
      }
    })
  }

}
