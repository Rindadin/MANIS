import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatalistPage } from './datalist';

@NgModule({
  declarations: [
    DatalistPage,
  ],
  imports: [
    IonicPageModule.forChild(DatalistPage),
  ],
})
export class DatalistPageModule {}
