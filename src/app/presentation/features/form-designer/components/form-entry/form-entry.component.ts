import { Component, OnInit } from '@angular/core';
import { Button } from 'primeng/button';
import { FieldConfigModel, FieldTypeEnum, FormSchemaModel } from '@app/domain';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputText } from 'primeng/inputtext';
import { FieldEntryComponent } from '@features/form-designer/components/field-entry/field-entry.component';
import { ActivatedRoute } from '@angular/router';
import { FormDesignerFacadeService } from '@features/form-designer/services/form-designer-facade.service';
import { FieldListComponent } from '@features/form-designer/components/field-list/field-list.component';

enum FieldEntryModeEnum {
  add,
  edit,
  noMode
}

@Component({
  selector: 'app-form-entry',
  imports: [
    Button,
    FormsModule,
    InputText,
    ReactiveFormsModule,
    FieldEntryComponent,
    FieldListComponent
  ],
  templateUrl: './form-entry.component.html',
  standalone: true,
  styleUrl: './form-entry.component.scss'
})
export class FormEntryComponent implements OnInit {
  private initialField = { name: '', label: '', type: FieldTypeEnum.Text };
  private editedFieldIndex = -1;

  fields: FieldConfigModel[] = [];
  form: FormSchemaModel = { title: '', fields: [] };
  field: FieldConfigModel = this.initialField;
  fieldEntryMode: FieldEntryModeEnum = FieldEntryModeEnum.noMode;


  constructor(private activatedRoute: ActivatedRoute,
              private formDesignerFacade: FormDesignerFacadeService) {
  }

  ngOnInit(): void {
    const formId = this.activatedRoute.snapshot.paramMap.get('id');
    if (formId) {
      this.formDesignerFacade.getFormById(formId).subscribe({
        next: (form) => {
          this.form = form;
        }
      });
    }
  }

  enterField(event: FieldConfigModel) {
    switch (this.fieldEntryMode){
      case FieldEntryModeEnum.add:
        this.form.fields.push(event);
        break;
      case FieldEntryModeEnum.edit:
        this.form.fields[this.editedFieldIndex] = event;
        break;
      default:
        break;
    }

    this.fieldEntryMode = FieldEntryModeEnum.noMode;
  }

  addField(){
    this.field = this.initialField;
    this.fieldEntryMode = FieldEntryModeEnum.add;
  }

  updateField(event: {index: number, field: FieldConfigModel}) {
    this.field = event.field;
    this.fieldEntryMode = FieldEntryModeEnum.edit;
    this.editedFieldIndex = event.index;
  }

  deleteField(index: number) {
    this.form.fields.splice(index, 1);
  }

  previewField(field: FieldConfigModel) {
  }

  createForm() {

  }

  protected readonly FieldEntryModeEnum = FieldEntryModeEnum;
}
