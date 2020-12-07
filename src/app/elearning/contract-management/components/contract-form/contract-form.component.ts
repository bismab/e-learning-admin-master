import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ContractService } from './../../services/contract.service';
import { Component, OnInit } from '@angular/core';
import FroalaEditor from 'froala-editor';
@Component({
  selector: 'app-contract-form',
  templateUrl: './contract-form.component.html',
  styleUrls: ['./contract-form.component.scss']
})
export class ContractFormComponent implements OnInit {
  contract = {} as any;
  currentCaretPosition = 0;
  contractId;
  templates = [];
  // options: any = {
    // buttons: ['bold', 'italic', 'underline', 'strikeThrough', 'subscript', 'superscript', 'fontFamily', 'fontSize', 'color', 'formatBlock', 'blockStyle', 'inlineStyle', 'align', 'insertOrderedList', 'insertUnorderedList', 'outdent', 'indent', 'selectAll', 'createLink', 'insertImage', 'insertVideo', 'table', 'undo', 'redo', 'html', 'save', 'insertHorizontalRule', 'uploadFile', 'removeFormat', 'fullscreen'],
    // placeholderText: 'Contract Content...',
    // charCounterCount: false,
    // attribution: false,
    // toolbarButtons: {
    //   text: {
    //     buttons: ['bold', 'italic', 'underline']
    //   },
    //   moreText: {
    //     buttons: ['fontFamily', 'fontSize', 'textColor', 'backgroundColor', 'inlineClass', 'inlineStyle', 'strikeThrough', 'subscript', 'superscript', 'outdent', 'indent', 'selectAll', 'createLink', 'insertImage', 'insertVideo', 'table', 'html', 'save', 'insertHorizontalRule', 'uploadFile', 'removeFormat', 'fullscreen'],
    //     align: 'left',
    //     buttonsVisible: 1
    //   },
    //   moreParagraph: {
    //     buttons: ['alignLeft', 'alignCenter', 'formatOLSimple', 'alignRight', 'alignJustify', 'insertHR', 'formatOL', 'formatUL', 'paragraphFormat', 'paragraphStyle', 'lineHeight', 'quote'],
    //     align: 'left',
    //     buttonsVisible: 3
    //   },

      // moreRich: {
      //   buttons: ['insertLink', 'insertImage', 'insertVideo', 'insertTable', 'emoticons', 'fontAwesome', 'specialCharacters', 'embedly', 'insertFile', 'insertHR'],
      //   align: 'left',
      //   buttonsVisible: 3
      // },

      // moreMisc: {
      //   buttons: ['undo', 'redo', 'fullscreen', 'print', 'getPDF', 'spellChecker', 'selectAll', 'html', 'help'],
      //   align: 'right',
      //   buttonsVisible: 2
      // },
  //     more: {
  //       buttons: ['dropdown', 'clearFormatting', 'undo', 'redo'],
  //       align: 'right',
  //       buttonsVisible: 4
  //     },
  //   },
  // };
  constructor(private contractS: ContractService,
    private toastS: ToastrService,
    private actRoute: ActivatedRoute,
    private route: Router) { }

  ngOnInit(): void {
    this.contractId = this.actRoute.snapshot.paramMap.get('contractId');
    if (this.contractId) {
      this.loadContractInfo(this.contractId);
    }
    // this.insertDropdown()
    this.loadTemplates();
  }

  // insertDropdown() {
  //   FroalaEditor.DefineIcon('dropdown', { NAME: 'plus', SVG_KEY: 'add' });
  //   FroalaEditor.RegisterCommand('dropdown', {
  //     title: 'Dropdown',
  //     type: 'dropdown',
  //     focus: true,
  //     undo: false,
  //     refreshAfterCallback: true,
  //     options: {
  //       '{{TEACHER_NAME}}': 'Teacher Name',
  //       '{{TEACHER_EXPERIENCE}}': 'Teacher Experience',
  //       '{{TEACHER_EXPERIENCE_LEVEL}}': 'Teacher Experience Level',
  //       '{{TEACHER_EDUCATION}}': 'Teacher Education',
  //       '{{TEACHER_EMAIL}}': 'Teacher Email',
  //       '{{CONTRACT_DATE}}': 'Contract Date'
  //     },
  //     callback(cmd: any, val: any) {
  //       this.html.insert(val);
  //     }
  //   });
  // }

  saveContract() {
    if (this.contractId) {
      this.contractS.updateContract(this.contractId, this.contract).subscribe(res => {
        if (res.status) {
          this.toastS.success(res.message);
          this.route.navigate(['/contract/all'])
        }
      })
    } else {
      this.contractS.createContract(this.contract).subscribe(res => {
        if (res.status) {
          this.toastS.success(res.message);
          this.route.navigate(['/contract/all'])
        }
      })
    }
  }

  loadTemplates() {
    this.contractS.getContractTemplatesForAssignment().subscribe(res => {
      if (res.status) {
        this.templates = (res.data) ? res.data : [];
      }
    })
  }

  loadContractInfo(contractId) {
    this.contractS.getContractInfo(contractId).subscribe(res => {
      if (res.status) {
        this.contract = res.data;
      }
    })
  }

  addValues(value: string) {
    if (!this.contract.description) {
      this.contract.description = "";
    }
    let customValue = "{{" + value + "}}";
    if (this.currentCaretPosition && this.contract.description.length > 0) {
      const temp = this.contract.description;
      this.contract.description = `${temp.substr(0, this.currentCaretPosition)}${customValue}${temp.substr(this.currentCaretPosition, temp.length)}`;
      this.currentCaretPosition += customValue.length;
    } else {
      this.contract.description += customValue;
      this.currentCaretPosition += customValue.length;
    }

  }

  getCaretCharacterOffsetWithin(element) {
    var caretOffset = 0;
    var doc = element.ownerDocument || element.document;
    var win = doc.defaultView || doc.parentWindow;
    var sel;

    if (typeof win.getSelection != "undefined") {
      sel = win.getSelection();

      if (sel.rangeCount > 0) {
        var range = win.getSelection().getRangeAt(0);
        var preCaretRange = range.cloneRange();
        preCaretRange.selectNodeContents(element);
        preCaretRange.setEnd(range.endContainer, range.endOffset);
        caretOffset = preCaretRange.toString().length;
      }
    } else if ((sel = doc.selection) && sel.type != "Control") {
      var textRange = sel.createRange();
      var preCaretTextRange = doc.body.createTextRange();
      preCaretTextRange.moveToElementText(element);
      preCaretTextRange.setEndPoint("EndToEnd", textRange);
      caretOffset = preCaretTextRange.text.length;
    }
    return caretOffset;
  }

  showCaretPos() {
    var el = document.getElementById("description");
    this.currentCaretPosition = this.getCaretCharacterOffsetWithin(el);
  }

}
