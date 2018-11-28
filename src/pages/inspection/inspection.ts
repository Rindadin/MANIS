import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-inspection',
  templateUrl: 'inspection.html',
})
export class InspectionPage {
  inspect:string;
  info:string;
  
  assetowning: { id: number, process_loc: string, class: string, asset_type: string};
  assetinspect: { inspect_id: number, rfid: number, ins_type: string, start_date: string, last_date: string };
  


  imageList: Array<any>;
  assetowningList: Array<any>;
  assetinspectList: Array<any>;
  id: any = 0;
  
  

  constructor( public storage: Storage, public modal: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    this.assetinspect = {
      inspect_id: null, 
      rfid: null, 
      ins_type: null, 
      start_date: null, 
      last_date: null 
    };
    this.imageList = [];

    let data = this.navParams.get('params');
    console.log('data');
    console.log(data);
    if (data) {
      this.assetowning = data;
    } else {
      this.storage.get("id").then(id => {
        if(id) {
          this.id = parseInt(id) + 1;
        } else {
          this.id = 1;
        }

        
      })
    }

    this.storage.get('ASSETINSPECT_LIST').then((val) => {

      if (val) {
        this.assetinspectList = JSON.parse(val);
      } else {
        this.assetinspectList = [];
      }
    })
 
  }

  saveAsset() {

    this.storage.set("id", this.id)
    this.assetinspectList.push(this.assetinspect);
    console.log(this.assetinspectList);
    this.storage.set('ASSETINSPECT_LIST', JSON.stringify(this.assetinspectList));
  }

  goTOPendingPage() {
    this.navCtrl.push('PendingPage');
  }

  showImage(image) {
    if (!image) {
      return null;
    } else {
      return 'data:image/jpeg;base64' + image;
    }
  }


  openModal() {
    let id: any = Number(this.imageList.length) + 1;
    
    let params = {
      type: 'new',
      id: id
    }
    const myModal = this.modal.create('Camera2Page', { params: params }, { cssClass: 'camera2-modal' })
    myModal.onDidDismiss(data => {
      if (data) {
        this.imageList.push(data);
      }
    })
    myModal.present();
  }

 
  ionViewDidLoad() {
    
    this.inspect="general-info";

    console.log('ionViewDidLoad InspectionPage');
  }

}
