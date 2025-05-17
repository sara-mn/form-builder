import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormDesignerRoutingModule } from './form-designer-routing.module';
import { FormEntryComponent } from '@features/form-designer/components/form-entry/form-entry.component';
import { FieldEntryComponent } from '@features/form-designer/components/field-entry/field-entry.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormDesignerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FormEntryComponent,
    FieldEntryComponent
  ],
  providers:[

  ]
})
export class FormDesignerModule { }
