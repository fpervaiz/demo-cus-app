import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { GetInvolvedPage } from './get-involved.page';

const routes: Routes = [
  {
    path: '',
    component: GetInvolvedPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [GetInvolvedPage]
})
export class GetInvolvedPageModule {}
