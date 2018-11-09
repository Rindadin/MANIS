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
  assetgroup: {id: string, primary: string, sub1: string, rfid: string, aisid: string, sub2: string};

  assetloc:{description: string, room: string, build: string, position: string, address1: string, address2: string, 
  address3: string, city: string, postcode: string, tag: string, service: string, contact: string, plan: string, 
  rate: string, failure: string, direction: string, breaker: string, state: string, country: string, pid: string, org: string, 
  manager: string, rcm: string, backlog: string, connectedto: string, offset: string, source: string};
  
  assetgroupList: Array<any>;
  assetlocList: Array<any>;

  imageList: Array<any>;

  constructor( public modal: ModalController, public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.info = 'general-info';

    this.imageList = [];

    this.assetgroup = {
      id:null,
      primary:null,
      sub1:null,
      rfid:null,
      aisid:null,
      sub2:null
    };
   
   this.assetloc = {
    description: null, 
    room: null, 
    build: null, 
    position: null, 
    address1: null, 
    address2: null, 
    address3: null, 
    city: null, 
    postcode: null, 
    tag: null, 
    service: null, 
    contact: null, 
    plan: null, 
    rate: null, 
    failure: null, 
    direction: null, 
    breaker: null, 
    state: null, 
    country: null, 
    pid: null, 
    org: null, 
    manager: null, 
    rcm: null, 
    backlog: null, 
    connectedto: null, 
    offset: null, 
    source: null

   };

    this.storage.get('ASSETGROUP_LIST').then((val) =>{
      
      if(val) {
        this.assetgroupList = JSON.parse(val);
      }else {
        this.assetgroupList = [];
      }
    })

    this.storage.get('ASSETLOC_LIST').then((val) =>{
      
      if(val) {
        this.assetlocList = JSON.parse(val);
      }else {
        this.assetlocList = [];
      }
    })

    console.log
    this.assetgroupList = [];

  }

  saveAsset(){
    this.assetgroupList.push(this.assetgroup);
    console.log(this.assetgroupList);
    this.storage.set('ASSETGROUP_LIST',JSON.stringify(this.assetgroupList));

    this.assetlocList.push(this.assetloc);
    console.log(this.assetlocList);
    this.storage.set('ASSETLOC_LIST',JSON.stringify(this.assetlocList));
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
