import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Config, ModalController, } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';


/**
 * Generated class for the PendingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pending',
  templateUrl: 'pending.html',
})
export class PendingPage {
  assetowning: {
    id: number, owning_org: string,  main_op: string, op: string, region: string, wtp: string,
    process_loc: string, function: string, sub_system: string, sub_function: string, class: string, asset_type: string, sub_cat1: string, sub_cat2: string
  };
  gis: { gis_id: string, lat: string, long: string };

  // assetgroup: {id: string, primary: string, sub1: string, rfid: string, aisid: string, sub2: string};
  imageData: { id: null, photo: null, title: null, description: null, dateCaptured: null, dateUploaded: null };


  // assetlocList: Array<any>
  assetowningList: Array<any>
  // assetgroupList: Array<any>
  gisList: Array<any>
  imageList: Array<any>
  tablestyle = 'bootstrap';
  public config: Config;
  public columns: any;
  public rows: any;
  users: any;

  constructor(public modalCtrl: ModalController, public modal: ModalController, public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    // this.assetowningList = this.navParams.get('params');
    // this.assetlocList = [];
    // this.assetgroupList = [];
    this.gisList = [];
    this.columns = [
      { prop: 'id', name: 'id' },
      { prop: 'owning_org', name: 'Owning Organisation' },
      { prop: 'main_op', name: 'Main Operation' },
      { prop: 'op', name: 'Operation' },
      { prop: 'region', name: 'Region' }
      
    ];
  }

  openModal(e) {

    let params = {
      id: e.row.id
    }

    const modal = this.modal.create('DatalistPage', { params: params }, { cssClass: 'camera-modal' })
    modal.onDidDismiss(response => {
      if(response){
        if(response.type == 'edit'){
          this.navCtrl.setRoot(RegisterPage, {params: response.data});
        }
      }
    })
    modal.present();
  }

  ionViewDidLoad() {
    this.storage.get('ASSETOWNING_LIST').then((val) => {

      if (val) {
        this.assetowningList = JSON.parse(val);
        console.log(JSON.stringify(this.assetowning))
      } else {
        this.assetowningList = [];
        console.log(JSON.stringify(this.assetowning))
      }
    })

    this.storage.get('GIS_LIST').then((val) => {

      if (val) {
        this.gisList = JSON.parse(val);
        console.log(this.gisList);
      } else {
        this.gisList = [];
        console.log(this.gisList);
      }
    })

    this.storage.get('IMAGE_LIST').then((val) => {
      if (val) {
        this.imageList = JSON.parse(val);
        console.log(this.imageList);
      } else {
        this.imageList = [];
        console.log(this.imageList);
      }
    })
  }


}
