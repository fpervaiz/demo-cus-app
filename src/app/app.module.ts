import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage';

import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';

import { NewsModalPageModule } from './news-modal/news-modal.module'

const firebaseConfig = {
  apiKey: "AIzaSyA1gNyGk-wTGgXaLCyqhYNXEMvjhW7ZIJw",
  authDomain: "cambridge-union-app.firebaseapp.com",
  databaseURL: "https://cambridge-union-app.firebaseio.com",
  projectId: "cambridge-union-app",
  storageBucket: "cambridge-union-app.appspot.com",
  messagingSenderId: "948486446960",
};

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    NewsModalPageModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    FirebaseX,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
