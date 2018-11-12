import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Config } from 'ionic-angular';
import { Storage } from '@ionic/storage';

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
  // assetgroup: {id: string, primary: string, sub1: string, rfid: string, aisid: string, sub2: string};
  imageData:{id: null, photo: null, title: null, description: null, dateCaptured: null, dateUploaded: null};
  assetowning: {
     owning_org: string, asset_own: string, main_op: string, op: string, region: string, wtp: string,
    process_loc: string, 
  function: string, sub_system: string, sub_function: string, sub_cat1: string, sub_cat2: string};
  gis:{ gis_id:string, lat:string, long:string };

  
  // assetlocList: Array<any>
  assetowningList: Array<any>
  // assetgroupList: Array<any>
  gisList: Array<any>
  imageList: Array<any>
  tablestyle = 'bootstrap';
  public config : Config;
  public columns : any;
  public rows : any;
  users: any;

  constructor( public storage:Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.assetowningList = [];
    // this.assetlocList = [];
    // this.assetgroupList = [];
    this.gisList =[];
    this.columns= [
      
      { prop:'process_loc', name: 'Process Location' },
      { prop:'function', name:'Process Function ' },
      { prop:'sub_system', name:'Sub System Category' },
      { prop:'sub_function', name:'Sub System Function' }

     
    ];
  }

  ionViewDidLoad() {
        this.storage.get('ASSETOWNING_LIST').then((val) =>{

      if(val) {
        this.assetowning = JSON.parse(val);
        console.log(this.assetowningList);
      }else{
        this.assetowningList = [];
      console.log(this.assetowningList);
      }
      
    })

    this.storage.get('GIS_LIST').then((val) =>{

      if(val) {
        this.gisList = JSON.parse(val);
        console.log(this.gisList);
      }else {
        this.gisList = [];
        console.log(this.gisList);
      }
    })

    this.storage.get('IMAGE_LIST').then((val) =>{

      if(val) {
        this.imageList = JSON.parse(val);
        console.log(this.imageList);
      }else {
        this.imageList = [];
        console.log(this.imageList);
      }
    })


  }



}
