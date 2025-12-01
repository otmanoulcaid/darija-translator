import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

fetch('/assets/config.json')
  .then(resp => resp.json())
  .then(config => {
    (window as any).APP_CONFIG = config;
    bootstrapApplication(AppComponent, appConfig)
      .catch((err) => console.error(err));
  });
