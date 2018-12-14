import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-inspection',
  templateUrl: 'inspection.html',
})
export class InspectionPage {
  inspect: string;
  info: string;
  routine: { good: boolean, repair: boolean, replace: boolean, plan: boolean, measurement: boolean, remark: string };

  assetinspect: { routine: any, asset_id: number, id: number, rfid: number, ins_type: string, start_date: string, last_date: Date, process_loc: string, class: string, asset_type: string };
  //public date = new Date();
  
  imageList: Array<any>;
  assetowningList: Array<any>;
  assetinspectList: Array<any>;
  // ins_id: any = 0;
  id: any = 0;
  type: any;
  index: number;
  
  constructor(public alertCtrl: AlertController, public storage: Storage, public modal: ModalController, public navCtrl: NavController, public navParams: NavParams) {
    this.routine = { good: false, repair: false, replace: false, plan: false, measurement: false, remark: null}

    this.assetinspect = {
      asset_id: null,
      id: null,
      rfid: null,
      ins_type: null,
      start_date: null,
      last_date: null,
      process_loc: null,
      class: null,
      asset_type: null,
      routine: null
    };
    this.imageList = [];

    let data = this.navParams.get('params');
    console.log('data');
    console.log(data);

    if (data) {
      
      // this.storage.get("id").then(id => {
      //   console.log(id);
      //   if (id) {
      //     this.id = parseInt(id) + 1;
      //   }
      //   else {
      //     this.id = 1;
      //   }
      // })

      let _date = new Date();
      this.id = String(_date.getTime()) + '-' + data.id;
      let month = _date.getMonth() + 1;
      let day = _date.getDay();
      let year = _date.getFullYear();

      this.assetinspect = {
        asset_id: data.id,
        id: this.id,
        rfid: null,
        ins_type: null,
        start_date: day + '/' + month + '/' + year,
        last_date: null,
        process_loc: data.process_loc,
        class: data.class,
        asset_type: data.asset_type,
        routine: null
      };

    }

    this.storage.get('ASSETINSPECT_LIST').then((val) => {
      console.log(val);
      if (val) {
        this.assetinspectList = JSON.parse(val);
      } else {
        this.assetinspectList = [];
      }
    })
  }

  saveAsset() {
    //this.storage.set("id", this.id);
    this.assetinspect.routine = this.routine;
    this.assetinspectList.push(this.assetinspect);
    console.log(this.assetinspectList);
    this.storage.set('ASSETINSPECT_LIST', JSON.stringify(this.assetinspectList));
    this.showAlert();
    this.goToPendingPage();
  }

  showAlert(){
    const alert = this.alertCtrl.create({
      title:'The inspection is saved successfully',
      buttons: ['OK']
    });
    alert.present();
  }

  goToPendingPage() {
    this.navCtrl.setRoot('PendingPage');
  }

  showImage2(pic) { 
    return 'data:image/jpeg;base64,' + pic;
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
        alert(JSON.stringify(data));
        this.imageList.push(data);
      }
    })
    myModal.present();
  }


  ionViewDidLoad() {
    this.inspect = "general-info";
  }

}
