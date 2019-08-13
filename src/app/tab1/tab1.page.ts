import { EventService } from './../services/events.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  nextResult: Observable<any>;
  eventName: string;
  eventStart: string;

  /**
   * Constructor of our first page
   * @param eventService The event Service to get data
   */

  constructor(private nextEventService: EventService) { }

  ngOnInit() {
    this.nextResult = this.nextEventService.nextEvent();
  }

}
