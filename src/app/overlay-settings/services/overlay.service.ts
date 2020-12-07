import { OverlaySpinnerComponent } from './../../shared/overlay-spinner/overlay-spinner.component';
import { Injectable, TemplateRef, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayConfig, OverlayRef, PositionStrategy } from '@angular/cdk/overlay';
import { TemplatePortal, ComponentPortal } from '@angular/cdk/portal';

@Injectable({
  providedIn: 'root'
})
export class OverlayService {
  constructor(
    private overlay: Overlay
  ) { }
  private loaderRef: OverlayRef;
  createOverlay(config): OverlayRef {
    return this.overlay.create(config);
  }
  attachTemplatePortal(overlayRef: OverlayRef, templateRef: TemplateRef<any>, vcRef: ViewContainerRef) {
    let templatePortal = new TemplatePortal(templateRef, vcRef);
    overlayRef.attach(templatePortal);
  }
  positionGloballyCenter(): PositionStrategy {
    return this.overlay.position()
      .global()
      .centerHorizontally()
      .centerVertically();
  }
  showGlobalOverlay(): OverlayRef {
    return this.overlay.create({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      hasBackdrop: true
    });
    // }).attach(new ComponentPortal(AngularSpinnerComponent))
  }

  showLoader() {
    if (this.loaderRef && this.loaderRef.hasAttached()) {
      this.loaderRef.detach();
    }

    this.loaderRef = this.showGlobalOverlay();
    this.loaderRef.attach(new ComponentPortal(OverlaySpinnerComponent));
  }

  hideLoader() {
    this.loaderRef.detach()
  }
}
