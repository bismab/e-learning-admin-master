import { ClassService } from './../../services/class.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-class-types',
  templateUrl: './class-types.component.html',
  styleUrls: ['./class-types.component.scss']
})
export class ClassTypesComponent implements OnInit {
  currPage = 1;
  collSize = 0;
  numOfItems = 20;
  search = {} as any;
  items = [];
  itemInfo = {} as any;

  constructor(private toastSer: ToastrService,
    private classSer: ClassService,
    private rout: Router,
    private actRout: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRout.queryParamMap.subscribe(qparams => {
      this.currPage = parseInt(qparams.get('page'));
      if (this.currPage) {
        this.loadTypes();
      }
    })
  }

  loadTypes() {
    this.classSer.getAllTypes({ currPage: this.currPage, numOfItems: this.numOfItems, search: this.search }).subscribe(res => {
      this.items = (res.data[0].data) ? res.data[0].data : [];
      // this.tempUsers = (res.data[0].data) ? res.data[0].data : [];
      this.collSize = (res.data[0].count[0]) ? res.data[0].count[0].count : 0;
    });
  }



  delete(itemId, index) {
    if (confirm("Are you sure you want to delete this type ?")) {
      this.classSer.deleteType(itemId).subscribe(res => {
        this.toastSer.success(res.message);
        this.items.splice(index, 1);
      });
    }
  }

  activation(itemId, isActive, index) {
    if (!isActive) {
      if (confirm("Are you sure you want to activate this type ?")) {
        this.classSer.activatetype(itemId).subscribe(res => {
          if (res.status) {
            this.items[index].isActive = true;
            this.toastSer.success(res.message);
          } else {
            this.toastSer.error(res.message);
          }
        });
      }
    } else if (isActive) {
      if (confirm("Are you sure you want to deactivate this type ?")) {
        this.classSer.deactivateType(itemId).subscribe(res => {
          if (res.status) {
            this.items[index].isActive = false;
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
