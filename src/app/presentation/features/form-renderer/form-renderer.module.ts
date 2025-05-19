import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormRendererRoutingModule } from './form-renderer-routing.module';
import { DynamicFormComponent } from '@features/form-renderer/components/dynamic-form/dynamic-form.component';
import { DynamicFieldComponent } from '@features/form-renderer/components/dynamic-field/dynamic-field.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormCreatorService } from '@features/form-renderer/services/form-creator.service';
import { Button } from "primeng/button";


@NgModule({
  declarations: [
    DynamicFormComponent,
    DynamicFieldComponent,
  ],
  imports: [
    CommonModule,
    FormRendererRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    Button
  ],
  providers:[
    FormCreatorService
  ]
})
export class FormRendererModule { }
