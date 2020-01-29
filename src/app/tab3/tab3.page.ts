import { Component, OnInit, ViewChild } from '@angular/core';
import { StorageService, Item } from '../services/storage.service';
import { LoadingController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  constructor(private storageService: StorageService, private toastController: ToastController, private navController: NavController, private loadingController: LoadingController) {}

  ngOnInit() {
    this.loadItems();
  }

  // Refresher
  doRefresh(event) {
    this.loadItems();
    setTimeout(() => {
      event.target.complete();
    }, 2000);
  }

  // Storage functions

  items: Item[] = [];
  //@ViewChild('savedList', {static: false})savedList: IonList;

  // READ
  async loadItems() {
    // Show loading spinner
    const loading = await this.loadingController.create({
      message: 'Please wait',
      translucent: true,
    });
    await loading.present();
    
    this.storageService.getItems().then(items => {
      this.items = items;
      loading.dismiss();
    });
  }

  // DELETE
  deleteItem(item: Item) {
    this.storageService.deleteItem(item.id).then(item => {
      this.showToast('Item removed!');
      //this.savedList.closeSlidingItems(); // Fix or sliding is stuck afterwards
      this.loadItems(); // Or splice it from the array directly
    });
  }

  // Show toast function
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  // Update saved status every time page viewed
  ionViewDidEnter() {
    this.loadItems();
  }
}
