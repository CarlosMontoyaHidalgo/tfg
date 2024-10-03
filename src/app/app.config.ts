import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideFirebaseApp(() =>
      initializeApp({
        projectId: 'basededatos-95ff9',
        appId: '1:222121033861:web:d2a0d52eb19f6b3dcc29ec',
        storageBucket: 'basededatos-95ff9.appspot.com',
        apiKey: 'AIzaSyBA6gDpCajj-S9byzb8mJ5WVGFvzerPwqw',
        authDomain: 'basededatos-95ff9.firebaseapp.com',
        messagingSenderId: '222121033861',
        measurementId: 'G-2H5D03GQEL',
      })
    ),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
};
