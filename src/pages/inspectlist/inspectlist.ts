import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';


@IonicPage()
@Component({
  selector: 'page-inspectlist',
  templateUrl: 'inspectlist.html',
})
export class InspectlistPage {

  scannedCode = null;

  assetowning: {
    id: number, owning_org: string, main_op: string, op: string, region: string, wtp: string,
    process_loc: string, function: string, sub_system: string, sub_function: string, class: string, asset_type: string, sub_cat1: string, sub_cat2: string
  };
  assetowningList: Array<any>
  inspectionCheckList: Array<any>
  tablestyle = 'bootstrap';
  public columns: any;
  public rows: any;
  // type: any;
  // index: number;


  constructor( private barcodeScanner: BarcodeScanner, public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
  
    this.columns = [
      { prop: 'asset_id', name: 'Asset ID' },
      { prop: 'RFID', name: 'RFID ' },
      { prop: '', name: 'Soft Tag' },
      { prop: '', name: 'Name' }
    ];
  
  
  }

  scanCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      this.scannedCode = barcodeData.text;
    })

  }

  ionViewDidLoad() {
    this.storage.get('INSPECTIONCHECKLIST').then(data =>{
      this.inspectionCheckList = JSON.parse(data)
      this.rows = this.inspectionCheckList;
      console.log(this.rows);
    })
    this.rows = this.assetowningList;

    
  }

}
