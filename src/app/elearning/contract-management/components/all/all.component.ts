import { ContractService } from './../../services/contract.service';
import { Component, OnInit, ElementRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-all',
  templateUrl: './all.component.html',
  styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {
  currPage = 1;
  collSize = 0;
  numOfItems = 20;
  search = {} as any;
  contracts = [];
  contractInfo = {} as any;
  contractFile;
  selectedContract = {} as any;
  staticUrl = environment.staticFilesBaseUrl;

  constructor(private toastSer: ToastrService,
    private contractS: ContractService,
    private rout: Router,
    private el: ElementRef,
    private modalService: NgbModal,
    private actRout: ActivatedRoute) { }

  ngOnInit(): void {
    this.actRout.queryParamMap.subscribe(qparams => {
      this.currPage = parseInt(qparams.get('page'));
      if (this.currPage) {
        this.loadContracts();
      }
    })
  }

  loadContracts() {
    this.contractS.getAllContracts({ currPage: this.currPage, numOfItems: this.numOfItems, search: this.search }).subscribe(res => {
      this.contracts = (res.data[0].data) ? res.data[0].data : [];
      // this.tempUsers = (res.data[0].data) ? res.data[0].data : [];
      this.collSize = (res.data[0].count[0]) ? res.data[0].count[0].count : 0;
    });
  }



  deleteContract(contractId, index) {
    if (confirm("Are you sure you want to delete this contract ?")) {
      this.contractS.deleteContract(contractId).subscribe(res => {
        this.toastSer.success(res.message);
        this.contracts.splice(index, 1);
      });
    }
  }

  activationContract(contractId, isActive, index) {
    if (!isActive) {
      if (confirm("Are you sure you want to block this contract ?")) {
        this.contractS.activateContract(contractId).subscribe(res => {
          if (res.status) {
            this.contracts[index].isActive = true;
            this.toastSer.success(res.message);
          } else {
            this.toastSer.error(res.message);
          }
        });
      }
    } else if (isActive) {
      if (confirm("Are you sure you want to unblock this contract ?")) {
        this.contractS.deactivateContract(contractId).subscribe(res => {
          if (res.status) {
            this.contracts[index].isActive = false;
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

  openContractForm(content, contractId?, index?) {
    this.selectedContract = {};
    if (contractId && index > -1) {
      this.loadSelectedContractInfo(contractId);
      this.selectedContract.index = index;
    }
    this.modalService.open(content, { size: 'lg', scrollable: true, windowClass: "dark-modal" });
  }

  loadSelectedContractInfo(coontractId) {
    this.contractS.getContractInfo(coontractId).subscribe(res => {
      if (res.status) {
        Object.assign(this.selectedContract, res.data)
      }
    })
  }

  saveContract(v) {
    if (v.name && v.description) {
      let formData = new FormData();
      formData.append('name', v.name);
      formData.append('description', v.description);
      if (this.contractFile) {
        formData.append('contract', this.contractFile);
      }
      if (this.selectedContract._id) {
        this.contractS.updateContract(this.selectedContract._id, formData).subscribe(res => {
          if (res.status) {
            this.contracts[this.selectedContract.index].name = this.selectedContract.name;
            this.contractFile = null;
            this.toastSer.success('Success!');
            this.modalService.dismissAll();
          } else {
            this.toastSer.error(res.message);
          }
        })
      } else {
        if (!this.contractFile) {
          this.toastSer.warning("In-complete info!");
          return;
        }
        this.contractS.createContract(formData).subscribe(res => {
          if (res.status) {
            this.contracts.unshift(res.data);
            this.contractFile = null;
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
      let inputEl: HTMLInputElement = document.querySelector('#contract');
      this.contractFile = inputEl.files.item(0);
    }
  }
}
