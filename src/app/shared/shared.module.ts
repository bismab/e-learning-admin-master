import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from "@angular/common/http";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    HttpClientModule,
    NgbModule
  ],
  exports: [
    /* angular stuff */
    CommonModule,
    RouterModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
  ]
})
export class SharedModule { }
