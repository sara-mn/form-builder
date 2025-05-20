import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormListRoutingModule } from './form-list-routing.module';
import { FormListComponent } from '@features/form-list/components/form-list/form-list.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormListRoutingModule,
    FormListComponent
  ]
})
export class FormListModule { }
