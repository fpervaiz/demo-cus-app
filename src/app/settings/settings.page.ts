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
    this.updateFcm();
  }

  async getSettings() {
    this.level_notifs = await this.storage.get('level_notifs');
    if (!this.level_notifs) {
      this.level_notifs = 'starred';
    }
  }

  settingsChanged() {
    this.storage.set('level_notifs', this.level_notifs);
    this.updateFcm();
  }

  updateFcm() {
    if (this.level_notifs === 'all') {
      this.fcmservice.topicSubscribe('all');
    }
    else {
      this.fcmservice.topicUnsubscribe('all');
    }
  }

}
