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
  asset_cat: string;
  data: any;
  inspectionCheckList: Array<any>;
  id: any = 0;
  assetowning: {
    ID: number, Name: string, SoftTag: string, assetID: string, RFID: string, AssetTaggedNo: string, Model: string, SerialNo: string, Speed: string, Type: string, MakeBrand: string,
    Flow: string, Head: string, Medium: string, ManufactureYear: string, manufacturer_no: string, Voltage: string, Frequency: string, CurrentA: string, kWHp: string, PressureRating: string,
    WorkingPressure: string, DesignPressure: string, ShellThickness: string, Diameter: string, Weight: string, Capacity: string, LubricantGrease: string,
    EquipmentName: string, Span: string, Size: string, OperatingVoltage: string, ConstructionYear: string, Ratio: string, Shape: string, Dimension: string,
    InletPipeDia: string, OutletPipeDia: string, Material: string, SizeOfBed: string, RateOfFilteration: string, TypeOfFilterMedia: string, HydraulicTestPressure: string,
    Ampere: string, Ph: string, Cycle: string, FilterMediaDepth: string, LastPreventive: string, LastCorrective: string
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
      { id: "01", name: "Actuator" },
      { id: "02", name: "AirReceiver" },
      { id: "03", name: "Chlorinator" },
      { id: "04", name: "Compressor" },
      { id: "05", name: "Crane" },
      { id: "06", name: "Gearbox" },
      { id: "07", name: "Grinder" },
      { id: "08", name: "Motor" },
      { id: "09", name: "Pump" },
      { id: "10", name: "SandFilter" },
      { id: "11", name: "SurgeVessel" },
      { id: "12", name: "Tank" },
      { id: "13", name: "Valve" },

    ];
    this.modalOpen = true;
    this.assetowningList = [];
    this.storage.get("id").then(id => {
      if (id) {
        this.id = parseInt(id) + 1;
      }
      else {
        this.id = 1;
      }
    })
  }

  async openModal(rows) {
    // console.log('row', rows);

    let params = {
      id: rows.assetID
    }

    const modal = this.modal.create('Datalist2Page', { params: params }, { cssClass: 'camera-modal' })

    modal.onDidDismiss(response => {
      this.modalOpen = true;
      if (response) {
        // console.log(response)
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

  addToInspection(row: any) {
    let asset: any = row;
    // console.log(asset)
    //for add data
    if (this.checkListExist(asset) == 'primary') {
      let inspectionData = {
        ID: asset.ID,
        assetID: asset.assetID,
        Name: asset.Name,
        RFID: asset.RFID
        //insert data on all asset
      }

      this.inspectionCheckList.push(inspectionData);
      console.log('inspection data', inspectionData);
    } else {
      let index = this.inspectionCheckList.findIndex(inspection => inspection.assetID == asset.assetID);
      //for remove data
      if (index >= 0) {
        this.inspectionCheckList.splice(index, 1);
      }
      // console.log("index",index)
    }
    // console.log('checklist',this.inspectionCheckList);
    this.storage.set('INSPECTIONCHECKLIST', JSON.stringify(this.inspectionCheckList));
  }

  checkListExist(row) {
    //must check if the data of inspection checklist is not empty array
    if (this.isNotEmpty(this.inspectionCheckList)) {
      let asset = this.inspectionCheckList.find(inspection => inspection.assetID == row.assetID);
      if (asset) {
        return 'secondary';
      } else {
        return 'primary';
      }

    }
    else {
      return 'primary';
    }
  }

  goToInspectionPage(row) {
    this.assetowning = this.assetowningList[row];
    // console.log(row);

    this.navCtrl.setRoot(InspectlistPage, { params: this.assetowning, type: 'inspect', index: this.assetowning })
  }

  getSyncCat(assetCat) {
    this.rows = this.assetSync[assetCat];
    // console.log("asset change", this.rows)
  }

  getSyncData() {
    let loading = this.loadingCtrl.create({
      cssClass: 'my-loading-class',
      spinner: 'circles',
      content: 'Initiate Ghost Protocol'
    });

    loading.present();
    this.api.getAssetAll().then(res => {
      loading.dismiss();
      let result: any = res;
      // result.push(this.id);
      // console.log('result', result);
      this.combineData(result);

      this.storage.set('ASSETOWNINGLIST', JSON.stringify(this.assetSync)).then(res => {
        this.ionViewDidLoad();
      });

    }).catch(err => {
      console.log('err', err)
      loading.dismiss();

    });
  }

  isNotEmpty(list) {
    return !this.api.isEmpty(list);
  }

  combineData(result) {
    this.assetSync = result;
    this.assetowningList = result.Actuator.concat(result.AirReceiver, result.Chlorinator, result.Compressor, result.Crane, result.Gearbox, result.Grinder, result.Motor, result.Pump, result.SandFilter, result.SurgeVessel, result.Tank, result.Valve);
    this.rows = this.assetowningList;
    //console.log('row',this.rows);
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
      if (data) {
        this.inspectionCheckList = JSON.parse(data);
      }
    })

    this.storage.get('ASSETOWNINGLIST').then(data => {
      if (data) {
        let result: any = JSON.parse(data)
        console.log(result);
        this.combineData(result);
      } else {
        this.assetowningList = [];
      }
      // this.assetSync = result;
      // this.assetowningList = result.Actuator.concat(result.AirReceiver, result.Chlorinator, result.Compressor, result.Crane, result.Gearbox, result.Grinder, result.Motor, result.Pump, result.SandFilter, result.SurgeVessel, result.Tank, result.Valve);
      // this.rows = this.assetowningList;
      //console.log(this.rows); 
    })
  }

  removeData() {
    this.inspectionCheckList.pop();
    this.storage.set('INSPECTIONCHECKLIST', JSON.stringify(this.inspectionCheckList))
  }
}



