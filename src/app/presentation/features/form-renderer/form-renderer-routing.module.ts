import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DynamicFormComponent } from '@features/form-renderer/components/dynamic-form/dynamic-form.component';

const routes: Routes = [
  { path: '', component: DynamicFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRendererRoutingModule { }
