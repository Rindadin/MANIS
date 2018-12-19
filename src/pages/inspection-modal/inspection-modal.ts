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
  routine: { assetstatus: any, replace: boolean, plan: boolean, measurement: boolean, remark: string };
  assetinspect: { routine: any, asset_id: number, ins_id: number, rfid: number, ins_type: string, start_date: string, last_date: Date, process_loc: string, class: string, asset_type: string };
  assetinspectList: Array<any>
  index:number;

  constructor( public viewController: ViewController, public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {

    this.routine = { assetstatus: true, replace: false, plan: false, measurement: false, remark: null}

    this.assetinspect = {
      asset_id: null,
      ins_id: null,
      rfid: null,
      ins_type: null,
      start_date: null,
      last_date: null,
      process_loc: null,
      class: null,
      asset_type: null,
      routine: true
    };
    this.data = this.navParams.get('params');
    console.log(this.data);
  }

  closeModal() {
    this.viewController.dismiss(null)
  }

  goToEditPage(){
    this.viewController.dismiss({data: this.assetinspect, type: 'edit_ins', index: this.index})
  }


  dismiss() {
    this.viewController.dismiss(null)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InspectionModalPage');
  }

}
