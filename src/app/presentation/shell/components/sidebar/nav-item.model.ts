export interface NavItemModel {
    label: string;
    icon: string;
    routerLink?: string[];
    items?: NavItemModel[];
}
