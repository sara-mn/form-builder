import { UserPermissionEnum } from '@domain/user/enums/user-permission.enum';
import { UserRoleEnum } from '@domain/user/enums/user-role.enum';

export const ROLE_PERMISSIONS: Record<UserRoleEnum, UserPermissionEnum[]> = {
    [UserRoleEnum.Admin]: [UserPermissionEnum.FormView, UserPermissionEnum.FormCreate, UserPermissionEnum.FormEdit, UserPermissionEnum.FormDelete, UserPermissionEnum.FormGenerate, UserPermissionEnum.UserManage],
    [UserRoleEnum.Editor]: [UserPermissionEnum.FormView, UserPermissionEnum.FormCreate, UserPermissionEnum.FormEdit, UserPermissionEnum.FormGenerate],
    [UserRoleEnum.Viewer]: [UserPermissionEnum.FormView]
};
