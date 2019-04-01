import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';
import { InspectionPage } from '../inspection/inspection';


@IonicPage()
@Component({
  selector: 'page-inspectlist',
  templateUrl: 'inspectlist.html',
})
export class InspectlistPage {
  modalOpen: boolean;
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


  constructor( public modal: ModalController, private barcodeScanner: BarcodeScanner, public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
  
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
      this.openModal(this.scannedCode);
    })
    // this.openModal('WATR-0000200');
  }

  public openModal(e: any) {
    console.log('trigger', e);

    let params = {
      id: e
    }

    const modal = this.modal.create('Datalist2Page', { params: params }, { cssClass: 'camera-modal' })

    modal.onDidDismiss(response => {
      this.modalOpen = true;
      if (response) {
        console.log(response)
        if (response.type == 'inspect') {
          this.navCtrl.setRoot(InspectionPage, { params: response.data });
        }
      }
    });

    modal.present();

    // console.log(this.modalOpen);
    // if (this.modalOpen) {
    //   this.modalOpen = false;
    //   modal.present();
    // }
  }

  goToInspectionPage(row){
    this.assetowning = this.inspectionCheckList[row];
    // console.log('data', this.inspectionCheckList)
    // console.log(row);

    this.navCtrl.setRoot(InspectionPage, { params: this.assetowning, type: 'inspectList', index: this.assetowning })

  }

  ionViewDidLoad() {
    this.storage.get('INSPECTIONCHECKLIST').then(data =>{
      this.inspectionCheckList = JSON.parse(data)
      this.rows = this.inspectionCheckList;
      // console.log(this.rows);
    })
    this.rows = this.assetowningList;
    
    
  }

}
