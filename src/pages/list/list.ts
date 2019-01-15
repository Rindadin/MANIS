import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { InspectionPage } from '../inspection/inspection';
import { ApiProvider } from '../../providers/api/api';


export interface Config {
  asset: string;
}


@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  modalOpen: boolean;
  assetowning: {
    id: number, owning_org: string, main_op: string, op: string, region: string, wtp: string,
    process_loc: string, function: string, sub_system: string, sub_function: string, class: string, asset_type: string, sub_cat1: string, sub_cat2: string
  };
  //  assetgroup: {id: string, primary: string, sub1: string, rfid: string, aisid: string, sub2: string};
  // assetlocList: Array<any>
  // assetgroupList: Array<any>
  assetowningList: Array<any>
  tablestyle = 'bootstrap';
  public config: Config;
  public columns: any;
  public rows: any;
  users: any;

  constructor( public api: ApiProvider, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public modal: ModalController, public _HTTP: HttpClient, public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    // this.assetlocList = [];
    // this.assetgroupList = [];
    this.modalOpen = true;
    this.assetowningList = [
      
    ];
    this.columns = [
      { prop: 'assetID', name: 'asset ID' },
      { prop: 'RFID', name: 'RFID ' },
      { prop: 'SoftTag', name: 'Soft Tag' },
      { prop: 'Name', name: 'Name' }
    ];

  }

  async openModal(e) {
    console.log('trigger',e);

    let params = {
      id: e.row.assetID
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
    })
    if(this.modalOpen){
      this.modalOpen = false;
      return await modal.present();
    }
  }

  getSyncData(){
    
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Please Wait..'
    });


    loading.present();
    this.api.getAssetAll().then(res => {
      loading.dismiss();
      let result: any = res;
      console.log(result);
      this.assetowningList = result.assetCat;
      console.log(this.assetowningList);
      this.storage.set('ASSETOWNINGLIST', JSON.stringify(this.assetowningList)).then(res=>{
        this.ionViewDidLoad();
      });
      
    }).catch (err => {
      console.log(err)
      loading.dismiss();
      
    });
  }

  ionViewDidLoad(): void {
    // this._HTTP
    //   .get<Config>('../../assets/data/asset.json')
    //   .subscribe((data) => {
    //     this.rows = data.asset;
    //   });
    this.storage.get('ASSETOWNINGLIST').then(data =>{
      this.assetowningList = JSON.parse(data)
      this.rows = this.assetowningList;
      console.log(this.rows);
    })

  }



}



