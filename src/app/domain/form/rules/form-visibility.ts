import { UserPermissionEnum } from '@app/domain/user/enums/user-permission.enum';
import { FormStatusEnum } from '../enums/form-status.enum';
import { FormModel } from '../models/form.model';

export function canViewForm(form: Pick<FormModel, 'status'>, permissions: readonly UserPermissionEnum[]): boolean {
    return form.status === FormStatusEnum.Published || permissions.includes(UserPermissionEnum.FormEdit);
}
