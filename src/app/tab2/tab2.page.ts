import { EventService, SearchType } from './../services/events.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs'
import { finalize } from 'rxjs/operators';
import { LoadingController } from '@ionic/angular';

// import { Component } from '@angular/core';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  
  results: Observable<any>;
  error: string;
  termResult: Observable<any>;
  time: string = 'upcoming';
  type: SearchType = SearchType.all;
 
  /**
   * Constructor of our first page
   * @param eventService The event Service to get data
   */

  constructor(private eventService: EventService, public loadingController: LoadingController) { }

  ngOnInit() {
    this.termResult = this.eventService.getTerm();
    this.termcardViewChanged()
  }
 
  async termcardViewChanged() {
    // Show loading spinner
    const loading = await this.loadingController.create({
      message: 'Please wait',
      translucent: true,
    });
    await loading.present();

    // Call event service function which returns an Observable
    this.eventService.searchData(this.time, this.type).pipe(
      finalize(async () => {
        // Hide the loading spinner on success or error
        await loading.dismiss();
      })
  )
  .subscribe(
      data => {
        // Set the data to display in the template
        this.results = data;
      },
      err => {
        // Set the error information to display in the template
        this.error = `An error occurred, the data could not be retrieved: Status: ${err.status}, Message: ${err.statusText}`;
      }
  );
  }
}
