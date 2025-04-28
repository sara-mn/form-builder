import {NgModule} from '@angular/core';
import {SvgIconComponent, provideSvgIcons} from '@ngneat/svg-icon';
import { arrowIcons } from './icons/Arrow';


@NgModule({
  providers: [
    provideSvgIcons([
      ...arrowIcons,
    ]),
  ],
  imports: [
    SvgIconComponent,
  ],
  exports: [
    SvgIconComponent,
  ]
})
export class IconsModule {}
