import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from '@app/app.config';
import { App } from '@app/app';

bootstrapApplication(App, appConfig).catch((err) => console.error(err));

// if (import.meta.hot) {
//   import.meta.hot.accept();
//   import.meta.hot.dispose(() => {
//     // Cleanup در صورت نیاز
//   });
// }
