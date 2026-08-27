import { Service } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { FormModel, FormPageModel, Guid } from '@app/domain';
import { toCrossFieldValidatorFn } from '@app/presentation/shared/validators/cross-field-validator.factory';
import { toFieldValidatorFn } from '@app/presentation/shared/validators/field-validator.factory';

@Service()
export class DynamicFormBuilderService {
    buildPageGroups(form: FormModel): FormGroup[] {
        const groups = form.pages.map((page) => this.buildPageGroup(page));

        const fieldIdToControl = new Map<Guid, FormControl>();
        form.pages.forEach((page, pageIndex) => {
            page.fields.forEach((field) => {
                const control = groups[pageIndex].get(field.name) as FormControl;
                fieldIdToControl.set(field.id, control);
            });
        });

        const getFieldValue = (fieldId: Guid): unknown => fieldIdToControl.get(fieldId)?.value;

        form.pages.forEach((page, pageIndex) => {
            const crossFieldValidators: ValidatorFn[] = page.validators.map((validatorConfig) => toCrossFieldValidatorFn(validatorConfig, getFieldValue));
            groups[pageIndex].setValidators(crossFieldValidators);
        });

        return groups;
    }

    private buildPageGroup(page: FormPageModel): FormGroup {
        const controls: Record<string, FormControl> = {};

        for (const field of page.fields) {
            const fieldValidators: ValidatorFn[] = field.validators.map(toFieldValidatorFn);
            controls[field.name] = new FormControl(null, fieldValidators);
        }

        return new FormGroup(controls);
    }
}
