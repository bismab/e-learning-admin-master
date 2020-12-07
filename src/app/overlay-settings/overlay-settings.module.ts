import { OverlayModule } from '@angular/cdk/overlay';
import { OverlaySpinnerComponent } from './../shared/overlay-spinner/overlay-spinner.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatProgressSpinnerModule,
} from '@angular/material/progress-spinner';
import { OverlayService } from './services/overlay.service';



@NgModule({
  declarations: [OverlaySpinnerComponent],
  imports: [
    CommonModule,
    OverlayModule,
    MatProgressSpinnerModule
  ],
  providers: [OverlayService]
})
export class OverlaySettingsModule { }
