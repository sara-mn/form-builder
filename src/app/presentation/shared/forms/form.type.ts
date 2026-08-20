import { FormControl, ɵValue } from '@angular/forms';

export type FormControls<T> = {
    [K in keyof T]: FormControl<T[K]>;
};

export type FormControlValues<T> = {
    [K in keyof FormControls<T>]: ɵValue<FormControls<T>[K]>;
};
