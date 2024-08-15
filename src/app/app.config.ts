import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'ringoffire-c61d4',
        appId: '1:514714210182:web:ce8f8937d903748d13e607',
        storageBucket: 'ringoffire-c61d4.appspot.com',
        apiKey: 'AIzaSyB2BCxDXuvLrenJOQXWhIqVNJqRnch_QB0',
        authDomain: 'ringoffire-c61d4.firebaseapp.com',
        messagingSenderId: '514714210182',
      })
    ),
    provideFirestore(() => getFirestore()),
  ],
};
