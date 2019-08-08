import { EventService, SearchType } from './../services/events.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LoadingController } from '@ionic/angular';

// import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  
  results: Observable<any>;
  time: string = 'upcoming';
  type: SearchType = SearchType.all;
 
  /**
   * Constructor of our first page
   * @param eventService The event Service to get data
   */

  constructor(private eventService: EventService, public loadingController: LoadingController) { }

  ngOnInit() {this.termcardViewChanged()}
 
  async termcardViewChanged() {
    // Show loading spinner
    const loading = await this.loadingController.create({
      message: 'Please Wait',
      translucent: true,
    });
    await loading.present();

    // Call event service function which returns an Observable
    this.results = this.eventService.searchData(this.time, this.type);
    loading.dismiss();
  }
}
