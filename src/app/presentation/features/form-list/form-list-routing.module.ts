import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormListComponent } from '@features/form-list/components/form-list/form-list.component';

const routes: Routes = [
  { path: '', component: FormListComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormListRoutingModule { }
