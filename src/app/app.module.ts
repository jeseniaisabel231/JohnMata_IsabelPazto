import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"b-749b4","appId":"1:616602352669:web:64d0a1994c63f5401b9af4","storageBucket":"b-749b4.firebasestorage.app","apiKey":"AIzaSyC79D1lmkT-BMpwxhOD7Jvzx53YXI1BQQs","authDomain":"b-749b4.firebaseapp.com","messagingSenderId":"616602352669","measurementId":"G-9Z7W2H161B"})), provideAuth(() => getAuth()), provideFirestore(() => getFirestore()), provideStorage(() => getStorage())],
  bootstrap: [AppComponent],
})
export class AppModule {}
