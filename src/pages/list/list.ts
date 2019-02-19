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
  assetowning: {
    id: number, owning_org: string, main_op: string, op: string, region: string, wtp: string,
    process_loc: string, function: string, sub_system: string, sub_function: string, class: string, asset_type: string, sub_cat1: string, sub_cat2: string
  };
  // assetgroup: {id: string, primary: string, sub1: string, rfid: string, aisid: string, sub2: string};
  // assetlocList: Array<any>
  // assetgroupList: Array<any>
  assetowningList: Array<any>
  tablestyle = 'bootstrap';
  public config: Config;
  public columns: any;
  public rows: any;
  users: any;
  assetcat: Array<any>;
  processloc: Array<any>;

  constructor(public viewController: ViewController, public api: ApiProvider, public loadingCtrl: LoadingController, public modalCtrl: ModalController, public modal: ModalController, public _HTTP: HttpClient, public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
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
    this.columns = [
      { prop: 'ID', name: 'asset ID' },
      { prop: 'RFID', name: 'RFID ' },
      { prop: 'SoftTag', name: 'Soft Tag' },
      { prop: 'Name', name: 'Name' },
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
      this.inspectionCheckList.push(inspectionData)
      console.log(this.inspectionCheckList);    
    } else {
      let index = this.inspectionCheckList.findIndex(inspection => inspection.asset_id == asset.assetID);
      //for remove data
      if (index >= 0) {
        this.inspectionCheckList.splice(index, 1);
      }
    }
    this.storage.set('INSPECTIONCHECKLIST', JSON.stringify(this.inspectionCheckList));
  }

  checkListExist(rowIndex) {
    if(rowIndex && this.inspectionCheckList.length != 0){
      let asset = this.assetowningList[rowIndex];
      let index = this.inspectionCheckList.findIndex(inspection => inspection.asset_id == asset.assetID);
      if (index >= 0) {
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

  // getSyncData(){

  //   let loading = this.loadingCtrl.create({
  //     spinner: 'circles',
  //     content: 'Please Wait..'
  //   });

  //   loading.present();
  //   this.api.getAssetAll().then(res => {
  //     loading.dismiss();
  //     let result: any = res;
  //     console.log(result);
  //     this.assetowningList = result;
  //     console.log(this.assetowningList);
  //     this.storage.set('ASSETOWNINGLIST', JSON.stringify(this.assetowningList)).then(res=>{
  //       this.ionViewDidLoad();
  //     });

  //   }).catch (err => {
  //     console.log(err)
  //     loading.dismiss();

  //   });
  // }


  ionViewDidLoad(): void {
    this._HTTP
      .get<Config>('../../assets/data/asset.json')
      .subscribe((data) => {
        this.rows = data.asset;
        this.assetowningList = this.rows;
      });
    this.storage.get('INSPECTIONCHECKLIST').then(data => {
      if(data){
        this.inspectionCheckList = JSON.parse(data);
      }
      console.log('chelklist',this.inspectionCheckList);
    })
    // this.storage.get('ASSETOWNINGLIST').then(data =>{
    //   this.assetowningList = JSON.parse(data)
    //   this.rows = this.assetowningList;
    //   console.log(this.rows); 
    // })
  }

  removeData() {
    this.inspectionCheckList.pop();
    this.storage.set('INSPECTIONCHECKLIST', JSON.stringify(this.inspectionCheckList))
  }
}



