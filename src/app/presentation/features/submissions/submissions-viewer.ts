import { ChangeDetectionStrategy, Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SubmissionsFacade } from './services/submissions.facade';
import { Guid } from '@app/domain/shared/types/guid.type';

@Component({
    selector: 'app-submissions-viewer',
    standalone: true,
    imports: [TableModule, ButtonModule, DialogModule, RouterLink, DatePipe],
    templateUrl: './submissions-viewer.html',
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SubmissionsViewer implements OnInit {
    private route = inject(ActivatedRoute);
    protected readonly facade = inject(SubmissionsFacade);

    protected readonly selectedSubmissionId = signal<Guid | null>(null);

    protected readonly selectedAnswers = computed(() => {
        const id = this.selectedSubmissionId();
        if (!id) return [];
        const submission = this.facade.submissions().find((s) => s.id === id);
        if (!submission) return [];
        return this.facade.fieldLookup().map((f) => ({
            label: f.label,
            value: submission.answers[f.id] ?? '—'
        }));
    });

    ngOnInit(): void {
        const formId = this.route.snapshot.paramMap.get('id')!;
        this.facade.load(formId);
    }

    protected onView(submissionId: Guid): void {
        this.selectedSubmissionId.set(submissionId);
    }

    protected onCloseDetail(): void {
        this.selectedSubmissionId.set(null);
    }
}
