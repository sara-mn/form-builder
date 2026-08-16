import { Component, input, output } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
    selector: 'app-lock-banner',
    imports: [ButtonModule],
    templateUrl: './lock-banner.html'
})
export class LockBanner {
    cloning = input<boolean>(false);
    cloneRequested = output<void>();

    onCloneClick(): void {
        this.cloneRequested.emit();
    }
}
