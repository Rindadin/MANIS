import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectlistPage } from './inspectlist';

@NgModule({
  declarations: [
    InspectlistPage,
  ],
  imports: [
    IonicPageModule.forChild(InspectlistPage),
  ],
})
export class InspectlistPageModule {}
