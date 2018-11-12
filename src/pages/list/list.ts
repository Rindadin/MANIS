import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the ListPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  assetowning: { owning_org: string, asset_own: string, main_op: string, op: string, region: string, wtp: string,
   process_loc: string, function: string, sub_system: string, sub_function: string, sub_cat1: string, sub_cat2: string};
  //  assetgroup: {id: string, primary: string, sub1: string, rfid: string, aisid: string, sub2: string};
  // assetlocList: Array<any>
  // assetgroupList: Array<any>
  assetowningList: Array<any>
  tablestyle = 'bootstrap';
  public config : any;
  public columns : any;
  public rows : any;
  users: any;

  constructor( public storage:Storage, public navCtrl: NavController, public navParams: NavParams) {
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

  ionViewDidLoad() {
    console.log('ionViewDidLoad ListPage');
  }
//     this.storage.get('ASSETLOC_LIST').then((val) =>{

//   if(val) {
//     this.assetlocList = JSON.parse(val);
//     console.log(this.assetlocList);
//   }else{
//     this.assetlocList = [];
//   console.log(this.assetlocList);
//   }
  
// })

// this.storage.get('ASSETGROUP_LIST').then((val) =>{

//   if(val) {
//     this.assetgroupList = JSON.parse(val);
//     console.log(this.assetgroupList);
//   }else {
//     this.assetgroupList = [];
//     console.log(this.assetgroupList);
//   }
// })


// }

}
