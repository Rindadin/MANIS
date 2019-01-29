import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InspectlistPage } from './inspectlist';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    InspectlistPage,
  ],
  imports: [
    IonicPageModule.forChild(InspectlistPage),
    NgxDatatableModule
  ],
})
export class InspectlistPageModule {}
