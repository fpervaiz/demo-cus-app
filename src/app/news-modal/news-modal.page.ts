import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular'

@Component({
  selector: 'app-news-modal',
  templateUrl: './news-modal.page.html',
  styleUrls: ['./news-modal.page.scss'],
})
export class NewsModalPage implements OnInit {

  id: string;
  date: string;
  title: string;
  content: string;
  thumb: string;

  constructor(private modalController: ModalController, private navParams: NavParams) { }

  ngOnInit() {
    this.id = this.navParams.data.id;
    this.date = this.navParams.data.date;
    this.title = this.navParams.data.title;
    this.content = this.navParams.data.content;
    this.thumb = this.navParams.data.thumb;
  }

  async closeModal() {
    await this.modalController.dismiss();
  }

}
