import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable, Injector, Inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AppErrorHandler extends ErrorHandler {
    constructor(@Inject(Injector) private readonly injector: Injector) {
        super();
    }
    handleError(error: HttpErrorResponse): void {        
        // console.log(error);
        // const toastS = this.injector.get(ToastrService);
        const message = error.error ? error.error.message : "Failed.";
        // this.toastrService.error("errorrr", null, { onActivateTick: true });
        if (error.error && error.error.message) {
            this.toastrService.error(message, null, { onActivateTick: true });
        } else {
            this.toastrService.error("Un-expected error occured.", null, { onActivateTick: true });
        }
        // super.handleError(error);
    }

    private get toastrService(): ToastrService {
        return this.injector.get(ToastrService);
    }

}