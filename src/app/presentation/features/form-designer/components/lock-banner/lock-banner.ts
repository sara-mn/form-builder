import { Component, input, output } from '@angular/core';
import { Guid } from '@app/domain';

@Component({
    selector: 'app-lock-banner',
    imports: [],
    templateUrl: './lock-banner.html',
    styleUrl: './lock-banner.scss'
})
export class LockBanner {
    cloning = input<boolean>(false);
    cloneRequested = output<void>();

    onCloneClick(): void {
        this.cloneRequested.emit();
    }
}
