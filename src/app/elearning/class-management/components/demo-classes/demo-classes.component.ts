import { environment } from './../../../../../environments/environment';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ClassService } from '../../services/class.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-demo-classes',
  templateUrl: './demo-classes.component.html',
  styleUrls: ['./demo-classes.component.scss']
})
export class DemoClassesComponent implements OnInit {
  currPage = 1;
  collSize = 0;
  numOfItems = 20;
  search = {} as any;
  demoClasses = [];
  selectedClass = {} as any;
  contractInfo = {} as any;
  classAttachedFile;
  staticUrl = environment.staticFilesBaseUrl;
  constructor(private toastSer: ToastrService,
    private classSer: ClassService,
    private rout: Router,
    private el: ElementRef,
    private modalService: NgbModal,
    private actRout: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRout.queryParamMap.subscribe(qparams => {
      this.currPage = parseInt(qparams.get('page'));
      if (this.currPage) {
        this.loadDemoClasses();
      }
    })
  }

  loadDemoClasses() {
    this.classSer.getAllDemoClasses({ currPage: this.currPage, numOfItems: this.numOfItems, search: this.search }).subscribe(res => {
      this.demoClasses = (res.data[0].data) ? res.data[0].data : [];
      // this.tempUsers = (res.data[0].data) ? res.data[0].data : [];
      this.collSize = (res.data[0].count[0]) ? res.data[0].count[0].count : 0;
    });
  }



  deleteClass(classId, index) {
    if (confirm("Are you sure you want to delete this class ?")) {
      this.classSer.deleteDemoClass(classId).subscribe(res => {
        this.toastSer.success(res.message);
        this.demoClasses.splice(index, 1);
      });
    }
  }

  activationClass(classId, isActive, index) {
    if (!isActive) {
      if (confirm("Are you sure you want to activate this class ?")) {
        this.classSer.activateDemoClass(classId).subscribe(res => {
          if (res.status) {
            this.demoClasses[index].isActive = true;
            this.toastSer.success(res.message);
          } else {
            this.toastSer.error(res.message);
          }
        });
      }
    } else if (isActive) {
      if (confirm("Are you sure you want to deactivate this class ?")) {
        this.classSer.deactivateDemoClass(classId).subscribe(res => {
          if (res.status) {
            this.demoClasses[index].isActive = false;
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

  openClassForm(content, classId?, index?) {
    this.selectedClass = {};
    if (classId && index > -1) {
      this.loadSelectedClassInfo(classId);
      this.selectedClass.index = index;
    }
    this.modalService.open(content, { size: 'lg', scrollable: true, windowClass: "dark-modal" });
  }

  loadSelectedClassInfo(classId) {
    this.classSer.getDemoClass(classId).subscribe(res => {
      if (res.status) {
        Object.assign(this.selectedClass, res.data)
      }
    })
  }
  saveClass(v) {
    if (v.name && v.description && v.maxAttempts) {
      let formData = new FormData();
      formData.append('name', v.name);
      formData.append('attempts', v.maxAttempts);
      formData.append('description', v.description);
      if (this.classAttachedFile) {
        formData.append('demoClassGuide', this.classAttachedFile);
      }
      if (this.selectedClass._id) {
        this.classSer.updateDemoClass(this.selectedClass._id, formData).subscribe(res => {
          if (res.status) {
            this.demoClasses[this.selectedClass.index].name = this.selectedClass.name;
            this.demoClasses[this.selectedClass.index].maxAttempts = this.selectedClass.maxAttempts;
            this.selectedClass = {};
            this.classAttachedFile = null;
            this.toastSer.success('Success!');
            this.modalService.dismissAll();
          } else {
            this.toastSer.error(res.message);
          }
        })
      } else {
        if (!this.classAttachedFile) {
          this.toastSer.warning("In-complete info!");
          return;
        }
        this.classSer.createDemoClass(formData).subscribe(res => {
          if (res.status) {
            this.demoClasses.unshift(res.data);
            this.classAttachedFile = null;
            this.toastSer.success('Success!');
            this.modalService.dismissAll();
          } else {
            this.toastSer.error(res.message);
          }
        })
      }

    } else {
      this.toastSer.warning("In-complete info!");
    }
  }
  selectFile(event) {
    if (event.target.files && event.target.files[0]) {
      let inputEl: HTMLInputElement = document.querySelector('#classGuide');
      this.classAttachedFile = inputEl.files.item(0);
    }
  }
}
