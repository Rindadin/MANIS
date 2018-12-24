import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Config, ModalController, } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { RegisterPage } from '../register/register';
import { InspectionPage } from '../inspection/inspection';
import { ifError } from 'assert';

@IonicPage()
@Component({
  selector: 'page-pending',
  templateUrl: 'pending.html',
})
export class PendingPage {
  modalOpen: boolean;
  pending: string;
  type:any;
  assetowning: {
    id: number, owning_org: string, main_op: string, 
    op: string, region: string, wtp: string,
    process_loc: string, function: string, sub_system: string, 
    sub_function: string, class: string, asset_type: string, 
    sub_cat1: string, sub_cat2: string,
    pm: string, brand: string, size1:string, 
    size2: string, size3:string, parentplate_no: string, 
    cm: string, model_no: string, unit_size1: string,
    unit_size2: string, unit_size3: string, plate_no: string,
    formulated: string, serial_no: string, scada: string, asset_tag: string,
    vendor_part: string, external_id: string, pailet_no: string, imageList: Array<any>,
    gis: { gis_id: string, lat: number, long: number }
  };


  assetinspect: { asset_id: number, ins_id: number, rfid: number, ins_type: string, start_date: Date, last_date: Date, process_loc: string, class: string, asset_type: string };

 
  imageData: { id: null, photo: null, title: null, description: null, dateCaptured: null, dateUploaded: null };


  
  assetowningList: Array<any>
  assetinspectList: Array<any>
  
  gisList: Array<any>
  imageList: Array<any>
  tablestyle = 'bootstrap';
  public config: Config;
  public columns1: any;
  public columns2: any;
  public rows: any;
  users: any;
  id;

  constructor(public modalCtrl: ModalController, public modal: ModalController, public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    // this.assetowningList = this.navParams.get('params');
    // this.assetlocList = [];
    // this.assetgroupList = [];
    this.modalOpen = true;
    this.gisList = [];
    this.columns1 = [
      { prop: 'id', name: 'id' },
      { prop: 'owning_org', name: 'Owning Organisation' },
      { prop: 'main_op', name: 'Main Operation' },
      { prop: 'op', name: 'Operation' },
      { prop: 'region', name: 'Region' }
      
    ];

    this.columns2 = [
      { prop: 'ins_id', name: 'Inspection no.' },
      { prop: 'asset_id', name: 'Asset id' },
      { prop: 'ins_type', name: 'Inspection type' },
      { prop: 'start_date', name: 'Start' },
      { prop: 'last_date', name: 'Finish' }
    ];
  }

   async openModal(e) {
    console.log('trigger',e);
    
     let params = {
        id: e.row.id
       
      }
      
      const modal = this.modal.create('DatalistPage', { params: params }, { cssClass: 'camera-modal' })

      modal.onDidDismiss(response => {
        this.modalOpen = true;
        if(response){
          console.log(response)
          if(response.type == 'edit'){
            this.navCtrl.setRoot(RegisterPage, {params: response.data, index: response.index });
          }
        }
      })
      if(this.modalOpen){
        this.modalOpen = false;
        return await  modal.present();
  
   
     
    
   
   
  }
}

  async openModalInspection(a) {
    let params = {
      id: a.row.ins_id
     
    }
    const modal = this.modal.create('InspectionModalPage', { params: params }, { cssClass: 'camera-modal' })
    modal.onDidDismiss(response => {
      this.modalOpen = true;
      if(response){
        console.log(response)
        if(response.type == 'edit_ins'){
          this.navCtrl.setRoot(InspectionPage, {params: response.data, index: response.index });
        }
      }
    })

    if(this.modalOpen){
      this.modalOpen = false;
      return await  modal.present();

    }
    
  }

 

  ionViewDidLoad() {
   
    this.storage.get('ASSETOWNING_LIST').then((val) => {

      if (val) {
        this.assetowningList = JSON.parse(val);
        console.log(JSON.stringify(this.assetowningList))
        this.pending = "register";
      } else {
        this.assetowningList = [];
        console.log(JSON.stringify(this.assetowningList))
      }
    })

    // this.storage.get('GIS_LIST').then((val) => {

    //   if (val) {
    //     this.gisList = JSON.parse(val);
    //     console.log(this.gisList);
    //   } else {
    //     this.gisList = [];
    //     console.log(this.gisList); 
    //   }
    // })

    // this.storage.get('IMAGE_LIST').then((val) => {
    //   if (val) {
    //     this.imageList = JSON.parse(val);
    //     console.log(this.imageList);
    //   } else {
    //     this.imageList = [];
    //     console.log(this.imageList);
    //   }
    // })

    this.storage.get('ASSETINSPECT_LIST').then((val) =>{
      if (val) {
        this.assetinspectList = JSON.parse(val);
        console.log(JSON.stringify(this.assetinspectList))
       
      } else {
        this.assetinspectList = [];
        console.log(JSON.stringify("no val"))
      }
    })
    
   
  }

  


}
