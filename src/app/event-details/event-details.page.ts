import { EventService } from './../services/events.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

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
  constructor(private activatedRoute: ActivatedRoute, private eventService: EventService, public loadingController: LoadingController) { }
 
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
}
