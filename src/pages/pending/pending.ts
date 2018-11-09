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
  assetgroup: {id: string, primary: string, sub1: string, rfid: string, aisid: string, sub2: string};
  imageData:{id: null, photo: null, title: null, description: null, dateCaptured: null, dateUploaded: null};
  assetlocList: Array<any>
  assetgroupList: Array<any>
  imageList: Array<any>
  tablestyle = 'bootstrap';
  public config : Config;
  public columns : any;
  public rows : any;
  users: any;

  constructor( public storage:Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.assetlocList = [];
    this.assetgroupList = [];
    this.columns= [
      { prop:'photo', name: 'photo' },
      { prop:'id', name: 'Asset ID' },
      { prop:'primary', name:'Asset Primary Category' },
      { prop:'sub1', name:'Sub Category 1' }
     
    ];
  }

  ionViewDidLoad() {
        this.storage.get('ASSETLOC_LIST').then((val) =>{

      if(val) {
        this.assetlocList = JSON.parse(val);
        console.log(this.assetlocList);
      }else{
        this.assetlocList = [];
      console.log(this.assetlocList);
      }
      
    })

    this.storage.get('ASSETGROUP_LIST').then((val) =>{

      if(val) {
        this.assetgroupList = JSON.parse(val);
        console.log(this.assetgroupList);
      }else {
        this.assetgroupList = [];
        console.log(this.assetgroupList);
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
