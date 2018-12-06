import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-register',
  templateUrl: 'register.html'
})
export class RegisterPage {
  asset: string;
  info: string;
  title: string;

  // assetgroup: {id: string, primary: string, sub1: string, rfid: string, aisid: string, sub2: string};

  // assetloc:{description: string, room: string, build: string, position: string, address1: string, address2: string, 
  // address3: string, city: string, postcode: string, tag: string, service: string, contact: string, plan: string, 
  // rate: string, failure: string, direction: string, breaker: string, state: string, country: string, pid: string, org: string, 
  // manager: string, rcm: string, backlog: string, connectedto: string, offset: string, source: string};

  assetowning: {
    id: number, owning_org: string, main_op: string, op: string, region: string, wtp: string,
    process_loc: string, function: string, sub_system: string, sub_function: string, class: string, asset_type: string, sub_cat1: string, sub_cat2: string
  };

  gis: { gis_id: string, lat: number, long: number };



  // assetgroupList: Array<any>;
  // assetlocList: Array<any>;
  assetowningList: Array<any>;
  gisList: Array<any>;
  assetowningFunction: Array<any>;
  assetowningProcess_loc: Array<any>;
  assetowningSub_system: Array<any>;
  assetowningSub_function: Array<any>;
  assetowningClass: Array<any>;
  assetowningAsset_type: Array<any>;
  assetowningSub_cat1: Array<any>;
  assetowningSub_cat2: Array<any>;
  id: any = 0;
  type: any;
  index: number;

  imageList: Array<any>;

  constructor( public alertCtrl: AlertController, private geolocation: Geolocation, public modal: ModalController, public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
    this.info = 'general-info';
    this.assetowning = {
      id: this.id,
      owning_org: null,
      main_op: null,
      op: null,
      region: null,
      wtp: null,
      process_loc: null,
      function: null,
      sub_system: null,
      sub_function: null,
      class: null,
      asset_type: null,
      sub_cat1: null,
      sub_cat2: null
    };
    this.imageList = [];


    let data = this.navParams.get('params');
    this.index = this.navParams.get('index');
    console.log('data');
    console.log(data);
    if (data) {
      // for edit case
      this.assetowning = data;
      this.type = 'edit';

      this.title = 'Edit Asset';
    } else {
      // new registration
      this.type = 'register';
      this.title = 'Asset Registration'
      this.storage.get("id").then(id => {
        if (id) {
          this.id = parseInt(id) + 1;
        }
        else {
          this.id = 1;
        }

        console.log(this.id);
        this.assetowning = {
          id: this.id,
          owning_org: 'PENGURUSAN AIR SELANGOR SDN BHD',
          main_op: 'OPERATION',
          op: 'WATER TREATMENT',
          region: 'EAST',
          wtp: 'LANGAT2',
          process_loc: null,
          function: null,
          sub_system: null,
          sub_function: null,
          class: null,
          asset_type: null,
          sub_cat1: null,
          sub_cat2: null
        };

      })
    }


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



    this.assetowningProcess_loc = [
      { id: "01", name: "ADMIN" },
      { id: "02", name: "RAW WATER" },
      { id: "03", name: "TREATMENT PROCESS" },
      { id: "04", name: "SLUDGE TREATMENT" },
      { id: "05", name: "POWER SUPPLY" }
    ];

    this.assetowningFunction = [
      { id: "01", name: "AERATOR/INLET CHAMBER" },
      { id: "02", name: "FILTER" },
      { id: "03", name: "THICKENED RESIDUAL PUMPING STATION" },
      { id: "04", name: "GENSET GENERATOR PLANT" }
    ];

    this.assetowningSub_system = [
      { id: "01", name: "PRE LIME DOSING CHAMBER" },
      { id: "02", name: "PRE OXIDATION TANK" },
      { id: "03", name: "HOLDING TANK" },
      { id: "04", name: "SLUDGE THICKENINGTANK 1" },
      { id: "05", name: "SLUDGE THICKENINGTANK 2" },
      { id: "06", name: "SLUDGE THICKENINGTANK 3" },
      { id: "07", name: "SLUDGE THICKENINGTANK 4" },
      { id: "08", name: "GENERATOR" }

    ];

    this.assetowningSub_function = [
      { id: "01", name: "PRE LIME" },
      { id: "02", name: "POTASSIUM PERMANGANATE DOSING" },
      { id: "03", name: "HOLDING TANK" },
      { id: "04", name: "POST CHLORINE" },
      { id: "05", name: "RESIDUAL THICKENER 1" },
      { id: "06", name: "RESIDUAL THICKENER 2" },
      { id: "07", name: "RESIDUAL THICKENER 3" },
      { id: "08", name: "RESIDUAL THICKENER 4" },
      { id: "09", name: "TRANSFORMER" }

    ];

    this.assetowningClass = [
      { id: "01", name: "ELECTRICAL" },
      { id: "02", name: "MECHANICAL" },
      { id: "03", name: "STRUCTURE" },
      { id: "04", name: "Instrument" }
    ];

    this.assetowningAsset_type = [
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

    this.assetowningSub_cat1 = [
      { id: "01", name: "POWERBOARD" },
      { id: "02", name: "LCP" },
      { id: "03", name: "SCADA UPS BATTERY PANEL" },
      { id: "04", name: "ACTUATOR" },
      { id: "05", name: "BUTTERFLY VALVE" },
      { id: "06", name: "SAMPLING PUMP" },
      { id: "07", name: "PUMP MOTOR" },
      { id: "08", name: "SCADA UPS PANEL" },
      { id: "09", name: "ACTUATOR" },
      { id: "10", name: "RAW WATER INFLOW" },
      { id: "11", name: "DB" },
      { id: "12", name: "DIAGPHRAM VALVE" },
      { id: "13", name: "ROTAMETER" },
      { id: "14", name: "SLUICE VALVE" },
      { id: "15", name: "PRESSURE REDUCING VALVE" },
      { id: "16", name: "PRESSURE INDICATOR" },
      { id: "17", name: "LANDING VALVE" },
      { id: "18", name: "FILTER TANKS" },
      { id: "19", name: "PENSTOCK" },
      { id: "20", name: "FILTER MEDIA" },
      { id: "21", name: "TRANSFORMER" },
      { id: "22", name: "GENERATOR" },
      { id: "23", name: "ALTERNATOR" },
      { id: "24", name: "AIR COMPRESSOR" },
      { id: "25", name: "MOTOR AIR COMPRESSOR" },
      { id: "26", name: "SECONDARY COOLING WATER PUMP" },
      { id: "27", name: "MOTOR COOLING WATER PUMP" },
      { id: "28", name: "AIR RECEIVER" },
      { id: "29", name: "ACCUMAULATOR" },
      { id: "30", name: "FUEL OIL PRIMARY FILTER" },
      { id: "31", name: "FUEL OIL SECONDARY FILTER" },
      { id: "32", name: "LUBRICATING OIL PRIMING PUMP" },
      { id: "33", name: "MOTOR LUBRICATING OIL PRIMING PUMP" },
      { id: "34", name: "LUBRICATING OIL SERVICE TANK" },
      { id: "35", name: "LUBRICATING OIL SUMP DRAINAGE TANK" },
      { id: "36", name: "LUBRICATING OIL FILTER" },
      { id: "37", name: "PRESSURE REGULATING VALVE" },
      { id: "38", name: "HOUSE GENERATOR AMF PANEL" },
      { id: "39", name: "FUEL OIL TRANSFER PUMP" },
      { id: "40", name: "MOTOR FUEL OIL TRANSFER PUMP" },
      { id: "41", name: "OVERHEAD CRANE" }


    ];

    this.assetowningSub_cat2 = [
      { id: "01", name: "POWERBOARD" },
      { id: "02", name: "LCP" },
      { id: "03", name: "SCADA UPS BATTERY PANEL" },
      { id: "04", name: "ACTUATOR" },
      { id: "05", name: "BUTTERFLY VALVE" },
      { id: "06", name: "SAMPLING PUMP" },
      { id: "07", name: "PUMP MOTOR" },
      { id: "08", name: "SCADA UPS PANEL" },
      { id: "09", name: "ACTUATOR" },
      { id: "10", name: "RAW WATER INFLOW" },
      { id: "11", name: "DB" },
      { id: "12", name: "DIAGPHRAM VALVE" },
      { id: "13", name: "ROTAMETER" },
      { id: "14", name: "SLUICE VALVE" },
      { id: "15", name: "PRESSURE REDUCING VALVE" },
      { id: "16", name: "PRESSURE INDICATOR" },
      { id: "17", name: "LANDING VALVE" },
      { id: "18", name: "FILTER TANKS" },
      { id: "19", name: "PENSTOCK" },
      { id: "20", name: "FILTER MEDIA" },
      { id: "21", name: "TRANSFORMER" },
      { id: "22", name: "GENERATOR" },
      { id: "23", name: "ALTERNATOR" },
      { id: "24", name: "AIR COMPRESSOR" },
      { id: "25", name: "MOTOR AIR COMPRESSOR" },
      { id: "26", name: "SECONDARY COOLING WATER PUMP" },
      { id: "27", name: "MOTOR COOLING WATER PUMP" },
      { id: "28", name: "AIR RECEIVER" },
      { id: "29", name: "ACCUMAULATOR" },
      { id: "30", name: "FUEL OIL PRIMARY FILTER" },
      { id: "31", name: "FUEL OIL SECONDARY FILTER" },
      { id: "32", name: "LUBRICATING OIL PRIMING PUMP" },
      { id: "33", name: "MOTOR LUBRICATING OIL PRIMING PUMP" },
      { id: "34", name: "LUBRICATING OIL SERVICE TANK" },
      { id: "35", name: "LUBRICATING OIL SUMP DRAINAGE TANK" },
      { id: "36", name: "LUBRICATING OIL FILTER" },
      { id: "37", name: "PRESSURE REGULATING VALVE" },
      { id: "38", name: "HOUSE GENERATOR AMF PANEL" },
      { id: "39", name: "FUEL OIL TRANSFER PUMP" },
      { id: "40", name: "MOTOR FUEL OIL TRANSFER PUMP" },
      { id: "41", name: "OVERHEAD CRANE" }


    ];


    this.gis = {
      gis_id: null,
      lat: null,
      long: null
    };

    this.geolocation.getCurrentPosition().then((resp) => {

      this.gis.lat = resp.coords.latitude;
      this.gis.long = resp.coords.longitude;
    }).catch((error) => {
      console.log('Error getting location', error);
    });

    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
    });

    this.storage.get('ASSETOWNING_LIST').then((val) => {

      if (val) {
        this.assetowningList = JSON.parse(val);
      } else {
        this.assetowningList = [];
      }
    })

    this.storage.get('GIS_LIST').then((val) => {

      if (val) {
        this.gisList = JSON.parse(val);
      } else {
        this.gisList = [];
      }
    })

    console.log
    this.gisList = [];



  }

  showAlert(){
    
    if (this.type == 'register') {
      
      const alert = this.alertCtrl.create({
        title:'Registration is saved!',
        buttons: ['ok']

        
      });
      alert.present();
    }else {
      const alert = this.alertCtrl.create({
        title:'Asset has been edited!',
        buttons: ['ok']
      });
      alert.present();

    }


  }




  saveAsset() {

    if (this.type == 'register') {
      console.log(this.assetowning);
      this.storage.set("id", this.id)
      this.assetowningList.push(this.assetowning);
      console.log(this.assetowningList);
      this.gisList.push(this.gis);
      console.log(this.gisList);
      this.storage.set('GIS_LIST', JSON.stringify(this.gisList));
      this.showAlert();{
        this.goToPendingPage()
      }

    } else  {

      this.assetowningList[this.index] = this.assetowning;
      this.showAlert();{
        this.goToPendingPage()
      }

      
    }

    this.storage.set('ASSETOWNING_LIST', JSON.stringify(this.assetowningList));


  }

  goToPendingPage() {
    this.navCtrl.push('PendingPage');
  }

  showImage(image) {
    if (!image) {
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

    const myModal = this.modal.create('CameraPage', { params: params }, { cssClass: 'camera-modal' })

    myModal.onDidDismiss(data => {
      if (data) {
        this.imageList.push(data);
      }
    })
    myModal.present();
  }



  ionViewDidLoad() {
    this.asset = "general-info";

  }


}
