import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

export interface Config {
  asset: string;
}

@IonicPage()
@Component({
  selector: 'page-inspectlist',
  templateUrl: 'inspectlist.html',
})
export class InspectlistPage {
  assetowning: {
    id: number, owning_org: string, main_op: string, op: string, region: string, wtp: string,
    process_loc: string, function: string, sub_system: string, sub_function: string, class: string, asset_type: string, sub_cat1: string, sub_cat2: string
  };
  assetowningList: Array<any>
  tablestyle = 'bootstrap';
  public config: Config;
  public columns: any;
  public rows: any;

  constructor( public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.assetowningList = [

    ];
    
    this.columns = [
      { prop: 'assetID', name: 'asset ID' },
      { prop: 'RFID', name: 'RFID ' },
      { prop: 'SoftTag', name: 'Soft Tag' },
      { prop: 'Name', name: 'Name' }
    ];
  
  
  }

  ionViewDidLoad() {
    this.storage.get('ASSETOWNINGLIST').then(data =>{
      this.assetowningList = JSON.parse(data)
      this.rows = this.assetowningList;
      console.log(this.rows);
    })

    
  }

}
