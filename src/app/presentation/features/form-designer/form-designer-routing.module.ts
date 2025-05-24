import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormEntryComponent } from '@features/form-designer/components/form-entry/form-entry.component';

const routes: Routes = [
  { path: 'form-entry', component: FormEntryComponent },
  { path: 'form-entry/:id', component: FormEntryComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormDesignerRoutingModule { }
