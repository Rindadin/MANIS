import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Config } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';


@IonicPage()
@Component({
  selector: 'page-datalist2',
  templateUrl: 'datalist2.html',
})
export class Datalist2Page {
  public config: Config;
  asset: string;
  info: string;
  data: any;
  assetowning: {
    id: number, owning_org: string,  main_op: string, op: string, region: string, wtp: string,
    process_loc: string, function: string, sub_system: string, sub_function: string, class: string, asset_type: string, sub_cat1: string, sub_cat2: string
  };
  assetowningList: Array<any>
  index:number;

  constructor( public _HTTP: HttpClient,  public storage: Storage, public viewController: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    
    this.assetowning = {
      id: null,
      owning_org:  null,
      main_op:  null,
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

  goToInspectionPage(){
    this.viewController.dismiss({data: this.assetowning, type: 'inspect'})
  }


  ionViewDidLoad() : void {

   
    this._HTTP
    .get<Config>('../../assets/data/asset.json')
    .subscribe((data) =>
    {
      let value: any = data; 
      this.assetowningList = value.asset;
      let index = this.assetowningList.findIndex(asset => asset.id == this.data.id);
      
      if (index >= 0) {
        this.assetowning = this.assetowningList[index];
      } else {
        console.log('asset not found')
      }

    });
 }
  }
