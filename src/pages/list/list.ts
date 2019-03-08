import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, LoadingController, ViewController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { InspectionPage } from '../inspection/inspection';
import { ApiProvider } from '../../providers/api/api';
import { InspectlistPage } from '../inspectlist/inspectlist';

export interface Config {
  asset: string;
}

@IonicPage()
@Component({
  selector: 'page-list',
  templateUrl: 'list.html',
})
export class ListPage {
  modalOpen: boolean;
  data: any;
  inspectionCheckList: Array<any>;
  id: any = 0;
  assetowning: {
    id: number, owning_org: string, main_op: string, op: string, region: string, wtp: string,
    process_loc: string, function: string, sub_system: string, sub_function: string, class: string, asset_type: string, sub_cat1: string, sub_cat2: string
  };
  // assetgroup: {id: string, primary: string, sub1: string, rfid: string, aisid: string, sub2: string};
  // assetlocList: Array<any>
  // assetgroupList: Array<any>
  assetowningList: Array<any>
  assetSync: Array<any>
  tablestyle = 'bootstrap';
  public config: Config;
  public columns: any;
  public rows: any;
  users: any;
  assetcat: Array<any>;
  processloc: Array<any>;

  constructor(public viewController: ViewController, public api: ApiProvider, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public modal: ModalController, public _HTTP: HttpClient, public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.assetSync = [];
    // this.assetlocList = [];
    // this.assetgroupList = [];
    this.inspectionCheckList = [];
    this.processloc = [
      { id: "01", name: "ADMIN" },
      { id: "02", name: "RAW WATER" },
      { id: "03", name: "TREATMENT PROCESS" },
      { id: "04", name: "SLUDGE TREATMENT" },
      { id: "05", name: "POWER SUPPLY" }
    ];

    this.assetcat = [
      { id: "01", name: "BOARD" },
      { id: "02", name: "PANELS" },
      { id: "03", name: "ELECTRIC ACTUATOR" },
      { id: "04", name: "VALVE" },
      { id: "05", name: "PUMP" },
      { id: "06", name: "MOTOR" },
      { id: "07", name: "FLOWMETER" },
      { id: "08", name: "TANKS" },
      { id: "09", name: "FILTERS" },
      { id: "10", name: "SLUDGE THICKENER" },
      { id: "11", name: "DRIVE ASSEMBLY" },
      { id: "12", name: "TRANSFORMERS" },
      { id: "13", name: "GENERATORS" },
      { id: "14", name: "ALTERNATORS" },
      { id: "15", name: "AIR RECEIVERS" },
      { id: "16", name: "ACCUMULATORS" },
      { id: "17", name: "LIFTING" }
    ];
    this.modalOpen = true;
    this.assetowningList = [

    ];
  }

  async openModal(rows) {
    console.log('row', rows);

    let params = {
      id: rows.assetID
    }

    const modal = this.modal.create('Datalist2Page', { params: params }, { cssClass: 'camera-modal' })

    modal.onDidDismiss(response => {
      this.modalOpen = true;
      if (response) {
        console.log(response)
        if (response.type == 'inspect') {
          this.navCtrl.setRoot(InspectionPage, { params: response.data });
        }
      }
    })

    if (this.modalOpen) {
      this.modalOpen = false;
      return await modal.present();
    }
  }

  addToInspection(rowIndex: number) {
    let asset: any = this.assetowningList[rowIndex];
    //for add data
    if (this.checkListExist(rowIndex) == 'primary') {
      let inspectionData = {
        asset_id: asset.assetID
        //insert data on all asset
      }
      this.inspectionCheckList.push(inspectionData);
         
    } else {
      let index = this.inspectionCheckList.findIndex(inspection => inspection.asset_id == asset.assetID);
      //for remove data
      if (index >= 0) {
        this.inspectionCheckList.splice(index, 1);
      }
    }
    console.log(this.inspectionCheckList); 
    this.storage.set('INSPECTIONCHECKLIST', JSON.stringify(this.inspectionCheckList));
  }

  checkListExist(rowIndex) {
    // console.log('rowIndex',rowIndex);
    // console.log('length available',(rowIndex && (this.inspectionCheckList.length != 0)));
    if((rowIndex > -1) && (this.inspectionCheckList.length != 0)){
      let asset = this.assetowningList[rowIndex];
      console.log('asset',asset)
      let index = this.inspectionCheckList.findIndex(inspection => inspection.asset_id == asset.assetID);
      console.log('index',index)
      if (index > -1) {
        return 'secondary';
      } else {
        return 'primary';
      }
    } else {
      return 'primary';
    }
  }

  goToInspectionPage(row) {
    // let params = {
    //   id: row.assetID
    // }
    this.assetowning = this.assetowningList[row];
    console.log(row);

    this.navCtrl.setRoot(InspectlistPage, { params: this.assetowning, type: 'inspect', index: this.assetowning })
  }

  getSyncData(){

    let loading = this.loadingCtrl.create({
      cssClass: 'my-loading-class',
      spinner: 'circles',
      content: 'Initiate Ghost Protocol'
      
    });

    loading.present();
    this.api.getAssetAll().then(res => {
      loading.dismiss();

      let result: any = res;
      console.log('result',result);
      this.assetSync = result;
      this.assetowningList = result.Actuator.concat(result.AirReceiver, result.Chlorinator, result.Compressor, result.Crane, result.Gearbox, result.Grinder, result.Motor, result.Pump, result.SandFilter, result.SurgeVessel, result.Tank, result.Valve);
      // this.assetSync = this.assetSync.concat(result.Actuator);
      // this.assetSync = this.assetSync.concat(result.AirReceiver);
      // this.assetSync = this.assetSync.concat(result.Chlorinator);
      // this.assetSync = this.assetSync.concat(result.Compressor);
      // this.assetSync = this.assetSync.concat(result.Crane);
      // this.assetSync = this.assetSync.concat(result.Gearbox);
      // this.assetSync = this.assetSync.concat(result.Grinder);
      // this.assetSync = this.assetSync.concat(result.Motor);
      // this.assetSync = this.assetSync.concat(result.Pump);
      // this.assetSync = this.assetSync.concat(result.SandFilter);
      // this.assetSync = this.assetSync.concat(result.SurgeVessel);
      // this.assetSync = this.assetSync.concat(result.Tank);
      // this.assetSync = this.assetSync.concat(result.Valve);
      
      // this.assetowningList = this.assetSync;
      console.log(this.assetowningList);

      this.rows = this.assetowningList;
      //console.log(this.assetowningList);

      this.storage.set('ASSETOWNINGLIST', JSON.stringify(this.assetowningList)).then(res=>{
        this.ionViewDidLoad();
      });

    }).catch (err => {
      console.log('err',err)
      loading.dismiss();

    });
  }



  ionViewDidLoad(): void {
    // this._HTTP
    //   .get<Config>('../../assets/data/asset.json')
    //   .subscribe((data) => {
    //     this.rows = data.asset;
    //     this.assetowningList = this.rows;
    //     console.log(JSON.stringify(this.assetowningList));
    //   });

    this.storage.get('INSPECTIONCHECKLIST').then(data => {
      if(data){
        this.inspectionCheckList = JSON.parse(data);
      }
    })

    this.storage.get('ASSETOWNINGLIST').then(data =>{

      this.assetowningList = JSON.parse(data)
      this.rows = this.assetowningList;
      //console.log(this.rows); 
    })
  }

  removeData() {
    this.inspectionCheckList.pop();
    this.storage.set('INSPECTIONCHECKLIST', JSON.stringify(this.inspectionCheckList))
  }
}



