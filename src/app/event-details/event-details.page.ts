import { EventService } from './../services/events.service';
import { FcmService } from './../services/fcm.service';
import { StorageService, Item } from '../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController, NavController } from '@ionic/angular';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {

  information: Observable<any>;
  results;

  /**
   * Constructor of our details page
   * @param activatedRoute Information about the route we are on
   * @param eventService The event Service to get data
   */
  constructor(private activatedRoute: ActivatedRoute,
    private eventService: EventService,
    public loadingController: LoadingController,
    private toastController: ToastController,
    private storageService: StorageService,
    private navController: NavController,
    private fcmService: FcmService) { }
 
  ngOnInit() {
    this.getDetails();
  }

  async getDetails() {
    // Show loading spinner
    const loading = await this.loadingController.create({
      message: 'Please Wait',
      translucent: true,
    });
    await loading.present();

    // Get the ID that was passed with the URL
    let id = this.activatedRoute.snapshot.paramMap.get('id');

    // Get the information from the API and hide loading spinner
    this.information = this.eventService.getDetails(id);
    this.information.subscribe(results => this.results = results);
    loading.dismiss();
  }

  openWebsite(url: string) {
    window.open('https://facebook.com/' + url, '_system');
  }

  openAction(url: string) {
    window.open(url, '_system');
  }

  openLive() {
    window.open('http://livestre.am/5s6wW');
  }

  // Starring feature functions

  items: Item[] = [];
  newItem: Item = <Item>{};
  thisItem: Item = <Item>{};
  is_starred: boolean;

  // Toast function
  async showToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      showCloseButton: true
    });
    toast.present();
  }

  toggleItem() {
    if (this.is_starred) {
      this.deleteItem(this.thisItem);
      this.fcmService.topicUnsubscribe(this.results.event_id);
    }
    else {
      this.addItem();
      this.fcmService.topicSubscribe(this.results.event_id);
    }
  }

  // CREATE
  addItem() {
    this.newItem.modified = Date.now();
    this.newItem.id = this.results.event_id;
    this.newItem.event_name = this.results.event_name;
    this.newItem.event_date = this.results.event_date;
    this.newItem.event_start = this.results.event_start;
    this.newItem.event_type = this.results.event_type;
    this.newItem.event_photo_url = this.results.event_photo_url

    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
      this.showToast('Event saved! Find it in the Starred tab.')
      this.loadItems();
    });
  }

  // READ
  loadItems(update = false) {
    this.storageService.getItems().then(items => {
      this.items = items;
      this.thisItem = this.checkStarred();
      if (update) {
        // Keep saved item up to date
        this.updateItem(this.thisItem);
      };
    });
  }

  // UPDATE
  updateItem(item: Item) {
    item.modified = Date.now();
    item.event_name = this.results.event_name;
    item.event_date = this.results.event_date;
    item.event_start = this.results.event_start;
    item.event_type = this.results.event_type

    this.storageService.updateItem(item).then(item => { });
  }

  // DELETE
  deleteItem(item: Item) {
    this.storageService.deleteItem(item.id).then(item => {
      this.showToast('Event unsaved.');
      this.loadItems();
    });
  }

  // READ: check if this event is already starred
  checkStarred() {
    for (var i = 0; i < this.items.length; i++) {
      if (this.items[i].id === this.results.event_id) {
        this.is_starred = true;
        return this.items[i];
      }
    }
    this.is_starred = false;
  };

  // Update saved status every time page viewed
  ionViewDidEnter() {
    this.loadItems();
  }
}
