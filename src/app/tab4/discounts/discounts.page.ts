import { InfoService, InfoType } from './../../services/info.service'
import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-discounts',
  templateUrl: './discounts.page.html',
  styleUrls: ['./discounts.page.scss'],
})
export class DiscountsPage implements OnInit {

  constructor(private infoService: InfoService, private loadingController: LoadingController) { }

  discounts = null;
  type: InfoType = InfoType.discounts

  ngOnInit() {
    this.getDiscounts();
  }

  async getDiscounts() {
    // Show loading spinner
    const loading = await this.loadingController.create({
      message: 'Please wait',
      translucent: true,
    });
    await loading.present();
 
    // Get the information from the API and hide loading spinner
    this.infoService.getInfo(this.type).subscribe(result => {
      this.discounts = result;
      loading.dismiss();
    }, error => { loading.dismiss(); });
  }

}
