import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';


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
  public columns: any;
  public rows: any;
  type: any;
  index: number;


  constructor( public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    let data = this.navParams.get('params');
    this.type = this.navParams.get('type');
    this.index = this.navParams.get('index');
    console.log('data');
    console.log(data);
    
    this.assetowningList =[data];

  

    
    this.columns = [
      { prop: 'assetID', name: 'asset ID' },
      { prop: 'RFID', name: 'RFID ' },
      { prop: 'SoftTag', name: 'Soft Tag' },
      { prop: 'Name', name: 'Name' }
    ];
  
  
  }

  ionViewDidLoad() {
    // this.storage.get('ASSETOWNINGLIST').then(data =>{
    //   this.assetowningList = JSON.parse(data)
    //   this.rows = this.assetowningList;
    //   console.log(this.rows);
    // })
    this.rows = this.assetowningList;

    
  }

}
