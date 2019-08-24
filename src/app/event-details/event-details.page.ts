import { EventService } from './../services/events.service';
import { StorageService, Item } from '../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController, ToastController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.page.html',
  styleUrls: ['./event-details.page.scss'],
})
export class EventDetailsPage implements OnInit {
 
  information = null;
 
  /**
   * Constructor of our details page
   * @param activatedRoute Information about the route we are on
   * @param eventService The event Service to get data
   */
  constructor(private activatedRoute: ActivatedRoute, private eventService: EventService, public loadingController: LoadingController, private toastController: ToastController, private storageService: StorageService, private navController: NavController) { }
 
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
    this.eventService.getDetails(id).subscribe(result => {
      this.information = result;
      // Update saved state
      this.loadItems(true);
      loading.dismiss();
    }, error => { loading.dismiss(); });
  }

  openWebsite() {
    window.open('https://facebook.com/' + this.information.event_id, '_system');
  }

  openAction() {
    window.open(this.information.event_action_url, '_system');
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
      duration: 2000
    });
    toast.present();
  }

  toggleItem() {
    if (this.is_starred) {
      this.deleteItem(this.thisItem);
    }
    else {
      this.addItem();
    }
  }

  // CREATE
  addItem() {
    this.newItem.modified = Date.now();
    this.newItem.id = this.information.event_id;
 
    this.storageService.addItem(this.newItem).then(item => {
      this.newItem = <Item>{};
      this.showToast('Event saved! Find it in the saved tab.')
      this.loadItems();
    });
  }

  // READ
  loadItems(update=false) {
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
    item.name = this.information.event_name;
    item.modified = Date.now();
    item.date = this.information.event_date;
    item.start_time = this.information.event_start_time;

    this.storageService.updateItem(item).then(item => {
      console.log('Item updated!');
    });
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
    for (var i=0; i < this.items.length; i++) {
      if (this.items[i].id === this.information.event_id) {
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
