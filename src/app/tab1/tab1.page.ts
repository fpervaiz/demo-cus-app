import { InfoService, InfoType } from './../services/info.service'
import { EventService } from './../services/events.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ModalController } from '@ionic/angular';
import { NewsModalPage } from '../news-modal/news-modal.page'

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  nextResult: Observable<any>;

  news: Observable<any>;
  newsType: InfoType = InfoType.news_few

  eventName: string;
  eventStart: string;

  /**
   * Constructor of our first page
   * @param eventService The event Service to get data
   */

  constructor(private nextEventService: EventService, private newsService: InfoService, public modalController: ModalController) { }

  ngOnInit() {
    this.nextResult = this.nextEventService.nextEvent();
    this.news = this.newsService.getInfo(this.newsType);
  }

  //ionViewDidEnter() {
  //  this.nextResult = this.nextEventService.nextEvent();
  //  this.news = this.newsService.getInfo(this.newsType);
  //}

  async openModal(id, date, title, content, thumb) {
    const modal = await this.modalController.create({
      component: NewsModalPage,
      componentProps: {
        "id": id,
        "date": date,
        "title": title,
        "content": content,
        "thumb": thumb
      }
    });

    return await modal.present();
  }

}
