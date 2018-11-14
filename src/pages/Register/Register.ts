import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  asset:string;
  info: string;

  
  // assetgroup: {id: string, primary: string, sub1: string, rfid: string, aisid: string, sub2: string};

  // assetloc:{description: string, room: string, build: string, position: string, address1: string, address2: string, 
  // address3: string, city: string, postcode: string, tag: string, service: string, contact: string, plan: string, 
  // rate: string, failure: string, direction: string, breaker: string, state: string, country: string, pid: string, org: string, 
  // manager: string, rcm: string, backlog: string, connectedto: string, offset: string, source: string};

  assetowning:{ id: number, owning_org: string, asset_own: string, main_op: string, op: string, region: string, wtp:string,
  process_loc: string, function: string, sub_system: string, sub_function: string, sub_cat1: string, sub_cat2: string};

  gis:{ gis_id:string, lat:string, long:string };

  
  
  // assetgroupList: Array<any>;
  // assetlocList: Array<any>;
  assetowningList: Array<any>;
  gisList: Array<any>;
  id: any;

  imageList: Array<any>;

  constructor( public modal: ModalController, public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.info = 'general-info';

    this.imageList = [];
    this.storage.get("id").then(id => {
      if (id) {
        this.id=parseInt(id)+1;
      }
      else {
        this.id=1; 
      }
      console.log(this.id);
      this.assetowning = {
        id: this.id,
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
       };
   
    }
  )
    
    // this.assetgroup = {
    //   id:null,
    //   primary:null,
    //   sub1:null,
    //   rfid:null,
    //   aisid:null,
    //   sub2:null
    // };
   
  //  this.assetloc = {
  //   description: null, 
  //   room: null, 
  //   build: null, 
  //   position: null, 
  //   address1: null, 
  //   address2: null, 
  //   address3: null, 
  //   city: null, 
  //   postcode: null, 
  //   tag: null, 
  //   service: null, 
  //   contact: null, 
  //   plan: null, 
  //   rate: null, 
  //   failure: null, 
  //   direction: null, 
  //   breaker: null, 
  //   state: null, 
  //   country: null, 
  //   pid: null, 
  //   org: null, 
  //   manager: null, 
  //   rcm: null, 
  //   backlog: null, 
  //   connectedto: null, 
  //   offset: null, 
  //   source: null

  //  };

   this.assetowning = {
     id: this.id,
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
    };

    this.gis = { 
    gis_id:null, 
    lat:null, 
    long:null 
    };

    this.storage.get('ASSETOWNING_LIST').then((val) =>{
      
      if(val) {
        this.assetowningList = JSON.parse(val);
      }else {
        this.assetowningList = [];
      }
    })

    this.storage.get('GIS_LIST').then((val) =>{
      
      if(val) {
        this.gisList = JSON.parse(val);
      }else {
        this.gisList = [];
      }
    })

    console.log
    this.assetowningList = [];

  }

  saveAsset(){

    console.log(this.assetowning);
    this.storage.set("id", this.id)
    this.assetowningList.push(this.assetowning);
    console.log(this.assetowningList);
    this.storage.set('ASSETOWNING_LIST',JSON.stringify(this.assetowningList));

    this.gisList.push(this.gis);
    console.log(this.gisList);
    this.storage.set('ASSETLOC_LIST',JSON.stringify(this.gisList));
  }

  goToPendingPage(){
    this.navCtrl.push('PendingPage');
  }

  showImage(image){
    if (!image){
      return null;
    } else {
      return 'data:image/jpeg;base64,' + image;
    }
  }

  openModal() {
    // let imageId = this.imageList.length;
    let id: any = Number(this.imageList.length) + 1;

    let params = {
      type: 'new',
      id: id
    }

    const myModal = this.modal.create('CameraPage', {params: params},  {cssClass: 'camera-modal' })

    myModal.onDidDismiss(data => {
      if(data){
        this.imageList.push(data);
      }
    })
    myModal.present();
  }

  ionViewDidLoad(){
    this.asset="general-info";
   
  }

  
}
