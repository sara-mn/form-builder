import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  imports: [],
  standalone: true,
  template: `
    <div class="grid grid-cols-12 gap-8">
<!--      <app-stats-widget class="contents" />-->
      <div class="col-span-12 xl:col-span-6">

      </div>
      <div class="col-span-12 xl:col-span-6">

      </div>
    </div>
  `
})
export class Dashboard {}
