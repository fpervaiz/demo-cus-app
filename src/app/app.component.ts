import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { FcmService } from './services/fcm.service';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html'
})
export class AppComponent {
  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FcmService,
    public toastController: ToastController
  ) {
    this.initializeApp();
  }

  private async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 3000
    });
    toast.present();
  }

  private notificationSetup() {
    this.fcm.getToken();
    this.fcm.onNotifications().subscribe(
      (msg) => {
        //if (this.platform.is('ios')) {
          //this.presentToast(msg.aps.alert);
        //} else {
          //this.presentToast(msg.body);
        //}
        if (msg.tap) {
          this.router.navigate(['/', 'tabs', 'tab2', 'event-details', msg.event_id]);
        }
      });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.notificationSetup();
      
      //this.statusBar.overlaysWebView(true);
      //this.statusBar.backgroundColorByHexString('#ffffff');
      if (this.platform.is('ios')) {
        this.statusBar.styleDefault();
      }
      else {
        this.statusBar.styleLightContent();
      }
      this.splashScreen.hide();
    });
  }
}
