import { Injectable } from '@angular/core';
import { FirebaseX } from '@ionic-native/firebase-x/ngx';
import { Platform } from '@ionic/angular';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable({
  providedIn: 'root'
})
export class FcmService {

  constructor(private firebase: FirebaseX,
    private afs: AngularFirestore,
    private platform: Platform) { }

  async getToken() {
    let token;

    if (this.platform.is('android')) {
      token = await this.firebase.getToken();
      console.log(token);
    }

    if (this.platform.is('ios')) {
      token = await this.firebase.getToken();
      await this.firebase.grantPermission();
      console.log(token);
    }

    this.saveToken(token);
  }

  private saveToken(token) {
    if (!token) return;

    const devicesRef = this.afs.collection('devices');

    const data = {
      token,
      userId: 'user-' + new Date().toISOString(),
    };

    return devicesRef.doc(token).set(data);
  }

  onNotifications() {
    return this.firebase.onMessageReceived().subscribe(data => console.log(`FCM message: ${data}`));;
  }

  topicSubscribe(topic) {
    this.firebase.subscribe(topic).then((res: any) => {
      console.log('Subscribed to topic: ' + topic, res);
    });
  }

  topicUnsubscribe(topic) {
    this.firebase.unsubscribe(topic).then((res: any) => {
      console.log('Unsubscribed from topic: ' + topic, res)
    });
  }

}
