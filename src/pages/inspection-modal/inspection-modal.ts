import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-inspection-modal',
  templateUrl: 'inspection-modal.html',
})
export class InspectionModalPage {
  asset: string;
  info: string;
  data: any;
  

  assetinspect: { 
    ID: number,
    assetID: string, 
    ins_id: number, 
    RFID: number, 
    ins_type: string, 
    start_date: string, 
    last_date: Date, 
    process_loc: string, 
    class: string, 
    asset_type: string,
    routine: { assetstatus: any, replace: boolean, plan: boolean, measurement: boolean, remark: string },
    images: {
      imageBefore: Array<any>,
      imageDuring: Array<any>,
      imageAfter: Array<any>
    }
   };
  assetinspectList: Array<any>
  index:number;
  myphoto: any;

  constructor( public viewController: ViewController, public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {

    this.myphoto = 'assets/imgs/nod-home.jpg';
    this.assetinspect = {
      ID: null,
      assetID: null,
      ins_id: null,
      RFID: null,
      ins_type: null,
      start_date: null,
      last_date: null,
      process_loc: null,
      class: null,
      asset_type: null,
      routine: { assetstatus: null, replace: null, plan: null, measurement: null, remark: null },
      images: {
        imageBefore: [],
        imageDuring: [],
        imageAfter: []
      }
    };
    this.data = this.navParams.get('params');
    console.log(this.data);
  }

  closeModal() {
    this.viewController.dismiss(null)
  }

  goToEditPage(){
    this.viewController.dismiss({data: this.assetinspect, type: 'edit', index: this.index})
  }


  dismiss() {
    this.viewController.dismiss(null)
  }

  ionViewDidLoad() {
    this.storage.get('ASSETINSPECT_LIST').then((val) =>{
      if (val) {
        console.log('data',this.data.id)
        this.assetinspectList = JSON.parse(val);
        //console.log(JSON.stringify(this.assetinspectList))

        this.index = this.assetinspectList.findIndex(inspection => inspection.ins_id == this.data.id);

        if (this.index >= 0) {
          this.assetinspect = this.assetinspectList[this.index];
          if(this.assetinspect.images.imageBefore[0]){
            let photo = this.assetinspect.images.imageBefore[0].photo;
            if(photo){
              this.myphoto = 'data:image/jpeg;base64,'+ photo;
            } else {
              this.myphoto = null;
            }
          } else {
            this.myphoto = null;
          }
        } else {
          console.log('asset not found')
        }
        console.log(this.assetinspect);

        
      } else {
        this.assetinspectList = [];
      }
    })
  
  }

}
