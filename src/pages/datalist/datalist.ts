import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-datalist',
  templateUrl: 'datalist.html',
})
export class DatalistPage {
  asset: string;
  info: string;
  data: any;
  assetowning: {
    id: number, owning_org: string, main_op: string,
    op: string, region: string, wtp: string,
    process_loc: string, function: string, sub_system: string,
    sub_function: string, class: string, asset_type: string,
    sub_cat1: string, sub_cat2: string,
    pm: string, brand: string, size1: string,
    size2: string, size3: string, parentplate_no: string,
    cm: string, model_no: string, unit_size1: string,
    unit_size2: string, unit_size3: string, plate_no: string,
    formulated: string, serial_no: string, scada: string, asset_tag: string,
    vendor_part: string, external_id: string, pailet_no: string, imageList: Array<any>,
    gis: { gis_id: string, lat: number, long: number }
  };

  gis: { gis_id: string, lat: number, long: number };
  assetowningList: Array<any>
  gisList: Array<any>
  index: number;

  constructor(public storage: Storage, public viewController: ViewController, public navCtrl: NavController, public navParams: NavParams) {
   this.assetowning = {
      id: null,
      owning_org: null,
      main_op: null,
      op: null,
      region: null,
      wtp: null,
      process_loc: null,
      function: null,
      sub_system: null,
      sub_function: null,
      class: null,
      asset_type: null,
      sub_cat1: null,
      sub_cat2: null,
      pm: null, 
      brand: null, 
      size1:null, 
      size2: null, 
      size3:null, 
      parentplate_no: null, 
      cm: null, 
      model_no: null, 
      unit_size1: null,
      unit_size2: null, 
      unit_size3: null, 
      plate_no: null,
      formulated: null, 
      serial_no: null, 
      scada: null, 
      asset_tag: null,
      vendor_part: null, 
      external_id: null, 
      pailet_no: null,
      imageList: [],
      gis: { gis_id: null, lat: null, long: null }
    };

    this.gis = {
      gis_id: null, 
      lat: null, 
      long: null

    };

    this.data = this.navParams.get('params');
    console.log(this.data);
  }

  closeModal() {
    this.viewController.dismiss(null)
  }

  goToEditPage(){
    this.viewController.dismiss({data: this.assetowning, type: 'edit', index: this.index})
  }

  dismiss() {
    this.viewController.dismiss(null)
  }


  ionViewDidLoad() {
    this.storage.get('ASSETOWNING_LIST').then((val) => {

      if (val) {
        console.log('data', this.data.id)
        this.assetowningList = JSON.parse(val);
        console.log(JSON.stringify(this.assetowningList))

        this.index = this.assetowningList.findIndex(asset => asset.id == this.data.id);

        if (this.index >= 0) {
          this.assetowning = this.assetowningList[this.index];
        } else {
          console.log('asset not found')
        }

      } else {
        this.assetowningList = [];
      }

    })

    console.log(this.assetowning);

  }

}
