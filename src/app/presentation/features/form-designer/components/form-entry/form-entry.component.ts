import { Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { FormSchemaService } from '@features/form-designer/services/form-schema.service';
import { FieldConfigModel, FormSchemaModel } from '@app/domain';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { FieldEntryComponent } from '@features/form-designer/components/field-entry/field-entry.component';

@Component({
  selector: 'app-form-entry',
  imports: [
    Button,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    FieldEntryComponent
  ],
  templateUrl: './form-entry.component.html',
  standalone: true,
  styleUrl: './form-entry.component.scss'
})
export class FormEntryComponent implements OnInit {
  formTitle: string = '';
  addedNewField: boolean = false;
  fields: FieldConfigModel[] = [];

  newForm!: FormSchemaModel;

  constructor(private formSchemaService: FormSchemaService) {
  }

  ngOnInit(): void {
  }

  addNewField() {
    this.addedNewField = true;
  }

  addField(event: FieldConfigModel) {
    this.formSchemaService.addField(event);
    this.fields.push(event);
    this.addedNewField = false;
  }

  createForm() {
    this.newForm = this.formSchemaService.getForm();
  }
}
