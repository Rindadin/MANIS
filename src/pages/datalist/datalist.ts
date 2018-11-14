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
  asset:string;
  info: string;
  assetowning: { id:number, owning_org: string, asset_own: string, main_op: string, op: string, region: string, wtp:string,
  process_loc: string, function: string, sub_system: string, sub_function: string, sub_cat1: string, sub_cat2: string};
  assetowningList: Array<any>

  constructor( public storage: Storage, public viewController: ViewController, public navCtrl: NavController, public navParams: NavParams) {
 let data = this.navParams.get('params');

 this.assetowning = this.navParams.get('params');
 
 
 this.assetowning = {

  id:null,  
  owning_org: null, 
  asset_own: null, 
  main_op: null, 
  op: null, 
  region: null, 
  wtp: null,
  process_loc: null, 
  function: null, 
  sub_system: null, 
  sub_function: null, 
  sub_cat1: null, 
  sub_cat2: null
 }
 if(data.type == 'new'){
  let id = data.id;
  this.assetowning.id = id;
}
}

 closeModal() {
  this.navCtrl.pop();
  }

  dismiss() {
    this.viewController.dismiss(null)
  }
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatalistPage');
  }

}
