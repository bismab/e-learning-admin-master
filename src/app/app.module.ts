import { AuthModule } from './auth/auth.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ErrorHandler } from '@angular/core';
import { ToastrModule } from "ngx-toastr";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ElearningModule } from './elearning/elearning.module';
import { FullComponent } from './layout/full/full.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpRequestLoaderInterceptor } from './core/http-request-loader.interceptor';
import { OverlaySettingsModule } from './overlay-settings/overlay-settings.module';
import { AppErrorHandler } from './core/app-error-handler';

@NgModule({
  declarations: [
    FooterComponent,
    NavbarComponent,
    AppComponent,
    FullComponent,
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: "toast-bottom-right",
      // preventDuplicates: true,
      progressAnimation: "decreasing",
      progressBar: true,
      closeButton: true,
    }),

    //custom Modules
    ElearningModule,
    AuthModule,
    OverlaySettingsModule
  ],
  providers: [
    {
      provide: ErrorHandler,
      useClass: AppErrorHandler
    },
    // {
    //   provide: PERFECT_SCROLLBAR_CONFIG,
    //   useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    // },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpRequestLoaderInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
