import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { InspectionPage } from '../inspection/inspection';


export interface Config {
	asset: string;
}


@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  assetowning: {
    id: number, owning_org: string,  main_op: string, op: string, region: string, wtp: string,
    process_loc: string, function: string, sub_system: string, sub_function: string, class: string, asset_type: string, sub_cat1: string, sub_cat2: string
  };
  //  assetgroup: {id: string, primary: string, sub1: string, rfid: string, aisid: string, sub2: string};
  // assetlocList: Array<any>
  // assetgroupList: Array<any>
  assetowningList: Array<any>
  tablestyle = 'bootstrap';
  public config : Config;
  public columns : any;
  public rows : any;
  users: any;

  constructor( public modalCtrl: ModalController, public modal: ModalController, public _HTTP :HttpClient, public storage:Storage, public navCtrl: NavController, public navParams: NavParams) {
    // this.assetlocList = [];
    // this.assetgroupList = [];
    this.assetowningList = [];
    this.columns= [
      {prop:'process_loc', name: 'Process Location' },
      { prop:'function', name:'Process Function ' },
      { prop:'sub_system', name:'Sub System Category' },
      { prop:'sub_function', name:'Sub System Function' }

    ];

  }

  openModal(e) {
console.log(e);
    let params = {
      id: e.row.id
    }

    const modal = this.modal.create('Datalist2Page', { params: params }, { cssClass: 'camera-modal' })

    modal.onDidDismiss(response => {
      if(response){
        if(response.type == 'inspect'){
          this.navCtrl.setRoot(InspectionPage, {params: response.data});
          
        }
      }
    })
    modal.present();

  }

  ionViewDidLoad() : void {

    this._HTTP
    .get<Config>('../../assets/data/asset.json')
    .subscribe((data) =>
    {
       this.rows = data.asset;
    });

    

 }
  }



