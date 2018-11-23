import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the DatalistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
    id: number, owning_org: string,  main_op: string, op: string, region: string, wtp: string,
    process_loc: string, function: string, sub_system: string, sub_function: string, class: string, asset_type: string, sub_cat1: string, sub_cat2: string
  };
  assetowningList: Array<any>

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
      sub_cat2: null
    }

    this.data = this.navParams.get('params');
    console.log(this.data);
  }

  closeModal() {
    this.viewController.dismiss(null)
  }

  goToEditPage(){
    this.viewController.dismiss({data: this.assetowning, type: 'edit'})
  }

  goToInspectionPage(){
    this.viewController.dismiss({data: this.assetowning, type: 'inspection'})
  }



  // dismiss() {
  //   this.viewController.dismiss(null)
  // }


  ionViewDidLoad() {
    this.storage.get('ASSETOWNING_LIST').then((val) => {

      if (val) {
        console.log('data', this.data.id)
        this.assetowningList = JSON.parse(val);
        console.log(JSON.stringify(this.assetowningList))

        let index = this.assetowningList.findIndex(asset => asset.id == this.data.id);

        if (index >= 0) {
          this.assetowning = this.assetowningList[index];
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
