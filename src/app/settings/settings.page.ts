import { Component, OnInit } from '@angular/core';
import { FcmService } from './../services/fcm.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  global_notifs: boolean
  level_notifs: string

  globalDisabled: string

  constructor(private storage: Storage,
    private fcmservice: FcmService) { }

  ngOnInit() {
    this.getSettings();
  }

  async getSettings() {
    this.global_notifs = await this.storage.get('global_notifs');
    //this.level_notifs = await this.storage.get('level_notifs');
    this.toggleDisable();
  }

  settingsChanged() {
    this.storage.set('global_notifs', this.global_notifs);
    //this.storage.set('level_notifs', this.level_notifs);
    this.toggleDisable();
    this.updateFcm();
  }

  toggleDisable() {
    if (!this.global_notifs) {
      this.globalDisabled = 'true';
    }
    else {
      this.globalDisabled = 'false';
    }
  }

  /*updateFcm() {
    if (this.globalDisabled) {
      // Disable all notifications
      this.fcmservice.topicUnsubscribe('all');
    }
    else {
      if (this.level_notifs == 'all') {
        this.fcmservice.topicSubscribe('all');
      }
      else {
        this.fcmservice.topicUnsubscribe('all');
      }
    }
  }*/

  updateFcm() {
    if (this.globalDisabled) {
      this.fcmservice.topicUnsubscribe('all');
    }
    else {
      this.fcmservice.topicSubscribe('all');
    }
  }

}
