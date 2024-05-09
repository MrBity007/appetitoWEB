import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {LoginModule} from "./pages/login/login.module";
import {FormsModule} from "@angular/forms";
import {MatButtonModule} from "@angular/material/button";
import {AngularFirestore, AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {AngularFireModule} from "@angular/fire/compat";
import { environment } from '../enviroments/enviroment.prod';
import {MatSidenavContainer} from "@angular/material/sidenav";
import {MatListModule, MatNavList} from "@angular/material/list";
import {MatIcon, MatIconModule} from '@angular/material/icon';
import {MatToolbar, MatToolbarModule} from "@angular/material/toolbar";
import {HttpClientModule} from "@angular/common/http";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { MatSidenavModule } from '@angular/material/sidenav';


const firebaseConfig = {
  apiKey: "AIzaSyBUcGTonHddpUpabZQVtTFB1Bh-T-5E1oY",
  authDomain: "appetitoweb-7309b.firebaseapp.com",
  projectId: "appetitoweb-7309b",
  storageBucket: "appetitoweb-7309b.appspot.com",
  messagingSenderId: "481023255487",
  appId: "1:481023255487:web:fce7e68e94918b4f4b770a"
};

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,

    provideFirebaseApp(() => initializeApp({
      "projectId": "appetitoweb-7309b",
      "appId": "1:481023255487:web:fce7e68e94918b4f4b770a",
      "storageBucket": "appetitoweb-7309b.appspot.com",
      "apiKey": "AIzaSyBUcGTonHddpUpabZQVtTFB1Bh-T-5E1oY",
      "authDomain": "appetitoweb-7309b.firebaseapp.com",
      "messagingSenderId": "481023255487"
    })),

    provideFirebaseApp(() => initializeApp(firebaseConfig)), // Firebase inicializálása
    provideAuth(() => getAuth()), // Auth szolgáltatás elérhetővé tétele
    provideFirestore(() => getFirestore()), // Firestore szolgáltatás elérhetővé tétele
    provideStorage(() => getStorage()),

    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage()),
    LoginModule,
    MatSidenavContainer,
    MatNavList,
    MatIcon,
    MatToolbar


  ],
  providers: [
    AngularFirestore,
    provideAnimationsAsync()
  ],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

 }
