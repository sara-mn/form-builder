import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '@app/app.config';
import { AppComponent } from '@app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

// if (import.meta.hot) {
//   import.meta.hot.accept();
//   import.meta.hot.dispose(() => {
//     // Cleanup در صورت نیاز
//   });
// }
