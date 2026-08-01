import { Service } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn } from '@angular/forms';
import { FieldConfigModel, FormModel, FormPageModel } from '@app/domain';
import { toCrossFieldValidatorFn } from '@app/presentation/shared/validators/cross-field-validator.factory';
import { toFieldValidatorFn } from '@app/presentation/shared/validators/field-validator.factory';

@Service()
export class DynamicFormBuilderServic {
    buildPageGroups(form: FormModel): FormGroup[] {
        const allFields = form.pages.flatMap((page) => page.fields);

        return form.pages.map((page) => this.buildPageGroup(page, allFields, form));
    }

    private buildPageGroup(page: FormPageModel, allFields: FieldConfigModel[], form: FormModel): FormGroup {
        const controls: Record<string, FormControl> = {};

        for (const field of page.fields) {
            const fieldValidators: ValidatorFn[] = field.validators.map(toFieldValidatorFn);
            controls[field.name] = new FormControl(null, fieldValidators);
        }

        const formGroup = new FormGroup(controls);

        const crossFieldValidators: ValidatorFn[] = page.validators.map((validatorConfig) => toCrossFieldValidatorFn(validatorConfig, allFields));

        formGroup.setValidators(crossFieldValidators);

        return formGroup;
    }
}
