import {AbstractControl, ɵValue} from '@angular/forms';

export type FormValue<T> = {
  [K in keyof T]: T[K];
}

export type FormControls<T> = {
  [K in keyof T]: AbstractControl<any, any>;
};

export type FormControlValues<T> = {
  [K in keyof FormControls<T>]: ɵValue<FormControls<T>[K]>;
};
