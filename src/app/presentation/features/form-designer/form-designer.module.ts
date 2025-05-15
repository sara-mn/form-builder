import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormDesignerRoutingModule } from './form-designer-routing.module';
import { FormEntryComponent } from '@features/form-designer/components/form-entry/form-entry.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormDesignerRoutingModule,
    FormEntryComponent
  ]
})
export class FormDesignerModule { }
