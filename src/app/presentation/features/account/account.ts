import { Component, inject, OnInit, signal } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormControls } from '@shared/forms/form.type';
import { AccountFacade } from '@features/account/services/account.facade';
import { UpdateProfileFormModel } from '@features/account/services/account-profile-form.model';
import { ChangePasswordFormModel } from '@features/account/services/change-password-form.model';
import { AccountFormCreator } from '@features/account/services/account-form-creator';
import { UpdateProfileFormAdapter } from '@features/account/services/account-profile-form.adapter';
import { ChangePasswordFormAdapter } from '@features/account/services/change-password-form.adapter';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputPasswordModule } from 'primeng/inputpassword';
import { TabsModule } from 'primeng/tabs';
import { TabList } from 'primeng/tabs';
import { Tab } from 'primeng/tabs';
import { TabPanels } from 'primeng/tabs';
import { TabPanel } from 'primeng/tabs';

@Component({
    selector: 'app-account',
    imports: [ReactiveFormsModule, ButtonModule, InputTextModule, InputPasswordModule, TabsModule, TabList, Tab, TabPanels, TabPanel],
    templateUrl: './account.html'
})
export class Account implements OnInit {
    private formCreator = inject(AccountFormCreator);
    private accountFacade = inject(AccountFacade);

    profileForm!: FormGroup<FormControls<UpdateProfileFormModel>>;
    changePasswordForm!: FormGroup<FormControls<ChangePasswordFormModel>>;
    protected activeTab = signal('profile');
    protected mask = signal(true);
    protected profileSaved = signal(false);
    protected passwordChanged = signal(false);

    ngOnInit(): void {
        this.profileForm = this.formCreator.createProfileForm();
        this.changePasswordForm = this.formCreator.createChangePasswordForm();

        this.accountFacade.getProfile().then((user) => {
            this.profileForm.patchValue({ name: user.name, mobile: user.profile.mobile });
        });
    }

    onSubmitProfile() {
        if (this.profileForm.invalid) return;
        const payload = UpdateProfileFormAdapter.toDomain(this.profileForm.getRawValue());
        this.accountFacade.updateProfile(payload).then(() => {
            this.profileSaved.set(true);
        });
    }

    onSubmitChangePassword() {
        if (this.changePasswordForm.invalid) return;
        const payload = ChangePasswordFormAdapter.toDomain(this.changePasswordForm.getRawValue());
        this.accountFacade.changePassword(payload).then(() => {
            this.passwordChanged.set(true);
            this.changePasswordForm.reset();
        });
    }
}
