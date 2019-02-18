import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
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
  assetCorrectiveList: Array<any>;
  pm: any;
  gis: { gis_id: string, lat: number, long: number };

  assetowning: {
    id: number, owning_org: string, main_op: string,
    op: string, region: string, wtp: string,
    process_loc: string, function: string, sub_system: string,
    sub_function: string, class: string, asset_type: string,
    sub_cat1: string, sub_cat2: string,
    pm: string, brand: string, size1: string,
    size2: string, size3: string, parentplate_no: string,
    cm: string, model_no: string, unit_size1: string,
    unit_size2: string, unit_size3: string, plate_no: string,
    formulated: string, serial_no: string, scada: string, asset_tag: string,
    vendor_part: string, external_id: string, pailet_no: string, imageList: Array<any>,
    gis: { gis_id: string, lat: number, long: number }
  };

  assetowningList: Array<any>;
  gisList: Array<any>;
  assetowningFunction: Array<any>;
  assetowningProcess_loc: Array<any>;
  assetowningProcessLocFunction: Array<any>;
  assetowningFunctionSubSystem: Array<any>;
  assetowningSub_system: Array<any>;
  assetowningSub_function: Array<any>;
  assetowningClass: Array<any>;
  assetOwningClassType: Array<any>;
  assetowningAsset_type: Array<any>;
  assetowningSub_cat1: Array<any>;
  assetowningSub_cat2: Array<any>;
  id: any = 0;
  type: any;
  index: number;

  imageList: Array<any>;

  constructor(public loadingCtrl: LoadingController, public alertCtrl: AlertController, private geolocation: Geolocation, public modal: ModalController, public storage: Storage, public navCtrl: NavController, public navParams: NavParams) {
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
      sub_cat2: null,
      pm: null,
      brand: null,
      size1: null,
      size2: null,
      size3: null,
      parentplate_no: null,
      cm: null,
      model_no: null,
      unit_size1: null,
      unit_size2: null,
      unit_size3: null,
      plate_no: null,
      formulated: null,
      serial_no: null,
      scada: null,
      asset_tag: null,
      vendor_part: null,
      external_id: null,
      pailet_no: null,
      imageList: [],
      gis: { gis_id: null, lat: null, long: null }
    };
    // this.imageList = [];


    let data = this.navParams.get('params');
    this.index = this.navParams.get('index');
    //console.log('data');
    //console.log(data);
    if (data) {
      // for edit case
      this.assetowning = data;
      // this.gis = this.assetowning.gis;
      this.type = 'edit';
      this.title = 'Edit Asset';
    } else {
      // new registration
      let loading = this.loadingCtrl.create({
        spinner: 'circles',
        content: 'Please Wait for latitude and longitude to be retrieve..'
      });
      // loading.present();

      this.type = 'register';
      this.title = 'Asset Registration'
      this.storage.get("id").then(id => {
        if (id) {
          this.id = parseInt(id) + 1;
        }
        else {
          this.id = 1;
        }
        let d = new Date();
        this.pm = new Date();
        this.pm.setDate(d.getDate() + 90);
        // console.log('cm',this.cm);
        // console.log(this.id);

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
          sub_cat2: null,
          pm: this.pm.toISOString(),
          brand: null,
          size1: null,
          size2: null,
          size3: null,
          parentplate_no: null,
          cm: null,
          model_no: null,
          unit_size1: null,
          unit_size2: null,
          unit_size3: null,
          plate_no: null,
          formulated: null,
          serial_no: null,
          scada: null,
          asset_tag: null,
          vendor_part: null,
          external_id: null,
          pailet_no: null,
          imageList: [],
          gis: { gis_id: null, lat: null, long: null }
        };

        this.geolocation.getCurrentPosition().then((resp) => {
          loading.dismiss();
          this.assetowning.gis.lat = resp.coords.latitude;
          this.assetowning.gis.long = resp.coords.longitude;
          console.log(this.assetowning.gis.lat);
        }).catch((error) => {
          console.log('Error getting location', error);
          loading.dismiss();
        });

      })


      // this.assetowning.pm = (this.cm.setDate(d.getDate()+90)).toISOString();
    }

    this.assetowningProcess_loc = [
      { id: "01", name: "TREATMENT PROCESS" },
      { id: "02", name: "ADMIN" },
      { id: "03", name: "RAW WATER" },
      { id: "04", name: "SLUDGE TREATMENT" },
      { id: "05", name: "POWER SUPPLY" }
    ];

    this.assetowningProcessLocFunction = [
      {
        id: "01",
        name: "TREATMENT PROCESS",
        type: [
          { id: "01", name: "AERATOR/INLET CHAMBER" },
          { id: "02", name: "CLARIFIER" },
          { id: "03", name: "FILTER" },
          { id: "04", name: "CHEMICAL BUILDING" },
          { id: "05", name: "CLEAR WATER TANK" },
          { id: "06", name: "RESIDUAL EMERGENCY LAGOON" },
          { id: "07", name: "TREATED WATER PUMPING STATION" },
          { id: "08", name: "WASH WATER RECOVERY PLANT" },
          { id: "18", name: "CHLORINE BUILDING" },
          { id: "19", name: "RESIDUAL THICKENING PUMPING STATION" },
          { id: "20", name: "GENERATOR HOUSE" },
        ]
      },
      
      {
        id: "02",
        name: "ADMIN",
        type: [
          { id: "09", name: "ADMINISTRATION BUILDING" },
          { id: "10", name: "GUARD HOUSE" },
          { id: "11", name: "STORE HOUSE" },
          { id: "12", name: "WORKSHOP" },
        ]
      },

      {
        id: "03",
        name: "RAW WATER",
        type: []
      },

     

      {
        id: "04",
        name: "SLUDGE TREATMENT",
        type: [
          { id: "13", name: "THICKENED RESIDUAL PUMPING STATION" },
        ]
      },

      {
        id: "05",
        name: "POWER SUPPLY",
        type: [
          { id: "14", name: "CONSUMER 33KV SWITCH HOUSE" },
          { id: "15", name: "GENSET GENERATOR PLANT" },
          { id: "16", name: "TRANSFORMER YARD" },
          { id: "17", name: "TREATMENT PLANT SWITCH HOUSE" },
        ]
      }
    ];

    this.assetowningFunction = [
      { id: "01", name: "AERATOR/INLET CHAMBER" },
      { id: "02", name: "CLARIFIER" },
      { id: "03", name: "FILTER" },
      { id: "04", name: "CHEMICAL BUILDING" },
      { id: "05", name: "CLEAR WATER TANK" },
      { id: "06", name: "RESIDUAL EMERGENCY LAGOON" },
      { id: "07", name: "TREATED WATER PUMPING STATION" },
      { id: "08", name: "WASH WATER RECOVERY PLANT" },
      { id: "09", name: "ADMINISTRATION BUILDING" },
      { id: "10", name: "GUARD HOUSE" },
      { id: "11", name: "STORE HOUSE" },
      { id: "12", name: "WORKSHOP" },
      { id: "13", name: "THICKENED RESIDUAL PUMPING STATION" },
      { id: "14", name: "CONSUMER 33KV SWITCH HOUSE" },
      { id: "15", name: "GENSET GENERATOR PLANT" },
      { id: "16", name: "TRANSFORMER YARD" },
      { id: "17", name: "TREATMENT PLANT SWITCH HOUSE" },
      { id: "18", name: "CHLORINE BUILDING" },
      { id: "19", name: "RESIDUAL THICKENING PUMPING STATION" },
      { id: "20", name: "GENERATOR HOUSE" },
    ];

    this.assetowningFunctionSubSystem = [

      {
        id:"01" ,
        name:"AERATOR/INLET CHAMBER",
        type: [
          { id: "01", name: "PRE LIME DOSING CHAMBER" },
          { id: "02", name: "PRE OXIDATION TANK" },
       ]
      },

      {
        id:"02" ,
        name:"CLARIFIER",
        type: [
          { id: "03", name: "FLOCCULATION TANK" },
       ]
      },

      {
        id:"03" ,
        name:"FILTER",
        type: [
          { id: "04", name: "HOLDING TANK" },
          { id: "05", name: "PROCESS CONTROL BUILDING" },
       ]
      },

      {
        id:"04" ,
        name:"CHEMICAL BUILDING",
        type: [
          { id: "08", name: "CHEMICAL PLANT -  FLORIDE" },
          { id: "09", name: "CHEMICAL PLANT - LIME/SODA" },
          { id: "10", name: "CHEMICAL PLANT -  PAC" },
          { id: "11", name: "CHEMICAL PLANT -  POLYMER/POLYELECTROLYTE" },
          { id: "12", name: "CHEMICAL PLANT -  POTTASIUM PERMANGANATE" },
       ]
      },

      {
        id:"05" ,
        name:"CLEAR WATER TANK",
        type: [
          { id: "44", name: "CHLORINE CONTACT TANK 1" },
          { id: "45", name: "CHLORINE CONTACT TANK 2" },
          { id: "46", name: "CHLORINE CONTACT TANK 3" },
          { id: "47", name: "CHLORINE CONTACT TANK 4" },
          { id: "48", name: "CLEAR WATER TANK 1" },
          { id: "49", name: "CLEAR WATER TANK 2" },
          { id: "50", name: "CLEAR WATER TANK 3" },
          { id: "51", name: "CLEAR WATER TANK 4" },
          { id: "52", name: "SCOUR CHAMBER 1" },
          { id: "53", name: "SCOUR CHAMBER 2" },
          { id: "54", name: "SCOUR CHAMBER 3" },
          { id: "55", name: "SCOUR CHAMBER 4" },
          { id: "56", name: "SCOUR CHAMBER 5" },
          { id: "57", name: "SCOUR CHAMBER 6" },
          { id: "58", name: "SCOUR CHAMBER 7" },
          { id: "59", name: "SCOUR CHAMBER 8" },
          { id: "60", name: "SCOUR CHAMBER 9" },
          { id: "61", name: "SCOUR CHAMBER 10" },
          { id: "62", name: "SCOUR CHAMBER 11" },
          { id: "63", name: "SCOUR CHAMBER 12" },
       ]
      },

      {
        id:"06" ,
        name:"RESIDUAL EMERGENCY LAGOON",
        type: [
          { id: "66", name: "BUTTERFLY VALVE CHAMBER" },
          { id: "67", name: "LANDSCAPING VALVE CHAMBER" },
          { id: "68", name: "RESIDUAL EMERGENCY LAGOON NO.1" },
          { id: "69", name: "RESIDUAL EMERGENCY LAGOON NO.2" }
       ]
      },

      {
        id:"07" ,
        name:"TREATED WATER PUMPING STATION",
        type: [
          { id: "13", name: "PUMP HALL" },
          { id: "14", name: "AIR COMPRESSOR BAY" },
          { id: "15", name: "SCOUR VALVE CHAMBER TYPE 1" },
          { id: "16", name: "SCOUR VALVE CHAMBER TYPE 2" },
          { id: "17", name: "SURGE VESSEL 1" },
          { id: "18", name: "SURGE VESSEL 2" },
          { id: "19", name: "SURGE VESSEL 3" },
          { id: "20", name: "SURGE VESSEL 4" },
          { id: "21", name: "SURGE VESSEL 5" },
          { id: "22", name: "SURGE VESSEL 6" },
          { id: "23", name: "SURGE VESSEL 7" },
          { id: "24", name: "SURGE VESSEL 8" },
          { id: "25", name: "SURGE VESSEL 9" },
          { id: "26", name: "UPS & DC SUPPLY ROOM" },
          { id: "27", name: "TRANSFORMER AREA" },
          { id: "28", name: "415V SWITCHROOM" },
          { id: "29", name: "INERT GAS CYLINDER ROOM" },
          { id: "30", name: "REMOTE SWITCHING STATION ROOM" },
       ]
      },

      {
        id:"08" ,
        name:"WASH WATER RECOVERY PLANT",
        type: [
          { id: "38", name: "WASHWATER RECOVERY TANK" },
          { id: "39", name: "RESIDUAL HOLDING TANK" },
          { id: "40", name: "FLOWMETER CHAMBER" },
          { id: "41", name: "VALVE CHAMBER" },
       ]
      },

      {
        id:"9" ,
        name:"ADMINISTRATION BUILDING",
        type: [
          { id: "42", name: "LABORATORY" },
          { id: "43", name: "COMMAND CENTRE" },
       ]
      },

      {
        id:"10" ,
        name:"GUARD HOUSE",
        type: [
          
       ]
      },

      {
        id:"11" ,
        name:"STORE HOUSE",
        type: [
          { id: "64", name: "WEIGHBRIDGE" },
       ]
      },

      {
        id:"12" ,
        name:"WORKSHOP",
        type: [
          
       ]
      },

      {
        id:"13" ,
        name:"THICKENED RESIDUAL PUMPING STATION",
        type: [
          
       ]
      },

      {
        id:"14" ,
        name:"CONSUMER 33KV SWITCH HOUSE",
        type: [
          
       ]
      },

      {
        id:"15" ,
        name:"GENSET GENERATOR PLANT",
        type: [
          
       ]
      },

      {
        id:"16" ,
        name:"TRANSFORMER YARD",
        type: [
          
       ]
      },

      {
        id:"17" ,
        name:"TREATMENT PLANT SWITCH HOUSE",
        type: [
          
       ]
      },

      {
        id:"18" ,
        name:"CHLORINE BUILDING",
        type: [
          { id: "06", name: "CHEMICAL PLANT -  CHLORINE GAS SYSTEM" },
          { id: "07", name: "SCRUBBER SYSTEM" },
       ]
      },

      {
        id:"19" ,
        name:"RESIDUAL THICKENING PUMPING STATION",
        type: [
          { id: "31", name: "DEWATERING PLANT" },
          { id: "32", name: "THICKENED RESIDUAL STORAGE TANK" },
          { id: "33", name: "RESIDUAL STORAGE YARD" },
          { id: "34", name: "SLUDGE THICKENING TANK 1" },
          { id: "35", name: "SLUDGE THICKENING TANK 2" },
          { id: "36", name: "SLUDGE THICKENING TANK 3" },
          { id: "37", name: "SLUDGE THICKENING TANK 4" },
       ]
      },

      {
        id:"20" ,
        name:"GENERATOR HOUSE",
        type: [
          { id: "65", name: "GENERATOR" },
       ]
      },
    ];
    

    this.assetowningSub_system = [
      { id: "01", name: "PRE LIME DOSING CHAMBER" },
      { id: "02", name: "PRE OXIDATION TANK" },
      { id: "03", name: "FLOCCULATION TANK" },
      { id: "04", name: "HOLDING TANK" },
      { id: "05", name: "PROCESS CONTROL BUILDING" },
      { id: "06", name: "CHEMICAL PLANT -  CHLORINE GAS SYSTEM" },
      { id: "07", name: "SCRUBBER SYSTEM" },
      { id: "08", name: "CHEMICAL PLANT -  FLORIDE" },
      { id: "09", name: "CHEMICAL PLANT - LIME/SODA" },
      { id: "10", name: "CHEMICAL PLANT -  PAC" },
      { id: "11", name: "CHEMICAL PLANT -  POLYMER/POLYELECTROLYTE" },
      { id: "12", name: "CHEMICAL PLANT -  POTTASIUM PERMANGANATE" },
      { id: "13", name: "PUMP HALL" },
      { id: "14", name: "AIR COMPRESSOR BAY" },
      { id: "15", name: "SCOUR VALVE CHAMBER TYPE 1" },
      { id: "16", name: "SCOUR VALVE CHAMBER TYPE 2" },
      { id: "17", name: "SURGE VESSEL 1" },
      { id: "18", name: "SURGE VESSEL 2" },
      { id: "19", name: "SURGE VESSEL 3" },
      { id: "20", name: "SURGE VESSEL 4" },
      { id: "21", name: "SURGE VESSEL 5" },
      { id: "22", name: "SURGE VESSEL 6" },
      { id: "23", name: "SURGE VESSEL 7" },
      { id: "24", name: "SURGE VESSEL 8" },
      { id: "25", name: "SURGE VESSEL 9" },
      { id: "26", name: "UPS & DC SUPPLY ROOM" },
      { id: "27", name: "TRANSFORMER AREA" },
      { id: "28", name: "415V SWITCHROOM" },
      { id: "29", name: "INERT GAS CYLINDER ROOM" },
      { id: "30", name: "REMOTE SWITCHING STATION ROOM" },
      { id: "31", name: "DEWATERING PLANT" },
      { id: "32", name: "THICKENED RESIDUAL STORAGE TANK" },
      { id: "33", name: "RESIDUAL STORAGE YARD" },
      { id: "34", name: "SLUDGE THICKENING TANK 1" },
      { id: "35", name: "SLUDGE THICKENING TANK 2" },
      { id: "36", name: "SLUDGE THICKENING TANK 3" },
      { id: "37", name: "SLUDGE THICKENING TANK 4" },
      { id: "38", name: "WASHWATER RECOVERY TANK" },
      { id: "39", name: "RESIDUAL HOLDING TANK" },
      { id: "40", name: "FLOWMETER CHAMBER" },
      { id: "41", name: "VALVE CHAMBER" },
      { id: "42", name: "LABORATORY" },
      { id: "43", name: "COMMAND CENTRE" },
      { id: "44", name: "CHLORINE CONTACT TANK 1" },
      { id: "45", name: "CHLORINE CONTACT TANK 2" },
      { id: "46", name: "CHLORINE CONTACT TANK 3" },
      { id: "47", name: "CHLORINE CONTACT TANK 4" },
      { id: "48", name: "CLEAR WATER TANK 1" },
      { id: "49", name: "CLEAR WATER TANK 2" },
      { id: "50", name: "CLEAR WATER TANK 3" },
      { id: "51", name: "CLEAR WATER TANK 4" },
      { id: "52", name: "SCOUR CHAMBER 1" },
      { id: "53", name: "SCOUR CHAMBER 2" },
      { id: "54", name: "SCOUR CHAMBER 3" },
      { id: "55", name: "SCOUR CHAMBER 4" },
      { id: "56", name: "SCOUR CHAMBER 5" },
      { id: "57", name: "SCOUR CHAMBER 6" },
      { id: "58", name: "SCOUR CHAMBER 7" },
      { id: "59", name: "SCOUR CHAMBER 8" },
      { id: "60", name: "SCOUR CHAMBER 9" },
      { id: "61", name: "SCOUR CHAMBER 10" },
      { id: "62", name: "SCOUR CHAMBER 11" },
      { id: "63", name: "SCOUR CHAMBER 12" },
      { id: "64", name: "WEIGHBRIDGE" },
      { id: "65", name: "GENERATOR" },
      { id: "66", name: "BUTTERFLY VALVE CHAMBER" },
      { id: "67", name: "LANDSCAPING VALVE CHAMBER" },
      { id: "68", name: "RESIDUAL EMERGENCY LAGOON NO.1" },
      { id: "69", name: "RESIDUAL EMERGENCY LAGOON NO.2" }
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
      { id: "04", name: "INSTRUMENT" }
    ];

    this.assetOwningClassType = [
      { id: "01", 
        name: "ELECTRICAL" ,
        type: [
          { id: "03", name: "ELECTRIC ACTUATOR" },
          { id: "12", name: "TRANSFORMERS" },
          { id: "13", name: "GENERATORS" },
          { id: "14", name: "ALTERNATORS" },
        ]
      },
      { 
        id: "02", 
        name: "MECHANICAL",
        type: [
          { id: "04", name: "VALVE" },
          { id: "05", name: "PUMP" },
          { id: "06", name: "MOTOR" },
          { id: "07", name: "FLOWMETER" },
          { id: "08", name: "TANKS" },
          { id: "09", name: "FILTERS" },
        ]
      },
      { id: "03", 
        name: "STRUCTURE",
        type: [
          { id: "01", name: "BOARD" },
          { id: "02", name: "PANELS" }
        ] 
      },
      { id: "04", 
        name: "INSTRUMENT",
        type: [
          { id: "15", name: "AIR RECEIVERS" },
          { id: "16", name: "ACCUMULATORS" },
          { id: "17", name: "LIFTING" },
          { id: "10", name: "SLUDGE THICKENER" },
          { id: "11", name: "DRIVE ASSEMBLY" },
        ] 
      }
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

    this.assetCorrectiveList = [
      { id: 1, name: "Once a year" },
      { id: 2, name: "Twice a year" },
      { id: 3, name: "Three times a year" }
    ]

    this.gis = {
      gis_id: null,
      lat: null,
      long: null
    };


    // let loading = this.loadingCtrl.create({
    //   spinner: 'circles',
    //   content: 'Please Wait for latitude and longitude to be retrieve..'
    // });


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

  assetClassChange(){
    console.log(this.assetowning.class);
    this.assetowning.asset_type = null;
    let index = this.assetOwningClassType.findIndex(asset => asset.name == this.assetowning.class)
    if (index > -1) {
      this.assetowningAsset_type = this.assetOwningClassType[index].type;
      console.log('changed: ',this.assetowningAsset_type);
    }
  }

  processLocChange(){
    this.assetowning.function = null;
    let index = this.assetowningProcessLocFunction.findIndex(asset => asset.name == this.assetowning.process_loc)
    if (index > -1) {
      this.assetowningFunction = this.assetowningProcessLocFunction[index].type;
      console.log('chaged: ',this.assetowningFunction);
    }

  }

  functionChange(){
    this.assetowning.sub_system = null;
    let index = this.assetowningFunctionSubSystem.findIndex(asset => asset.name == this.assetowning.function)
    if (index > -1) {
      this.assetowningSub_system = this.assetowningFunctionSubSystem[index].type;
      console.log('changed: ',this.assetowningSub_system);
    }
  }

  showAlert() {

    if (this.type == 'register') {

      const alert = this.alertCtrl.create({
        title: 'Registration is saved!',
        buttons: ['ok']


      });
      alert.present();
    } else {
      const alert = this.alertCtrl.create({
        title: 'Asset has been edited!',
        buttons: ['ok']
      });
      alert.present();
    }
  }

  showImage(image: string) {
    return 'data:image/jpeg;base64,' + image;
  }

  openModal() {
    // let imageId = this.imageList.length;
    let id: any = Number(this.assetowning.imageList.length) + 1;

    let params = {
      type: 'new',
      id: id
    }

    const myModal = this.modal.create('CameraPage', { params: params }, { cssClass: 'camera-modal', enableBackdropDismiss: false })

    myModal.onDidDismiss(data => {
      if (data) {
        this.assetowning.imageList.push(data);
      }
    })
    myModal.present();
  }



  ionViewDidLoad() {
    this.asset = "general-info";

  }

  saveAsset() {
    //this.assetowning.gis = this.gis;
    if (this.type == 'register') {
      console.log(this.assetowning);
      this.storage.set("id", this.id)
      this.assetowningList.push(this.assetowning);
      console.log(this.assetowningList);
      // this.gisList.push(this.gis);
      //console.log(this.gisList);
      //this.storage.set('GIS_LIST', JSON.stringify(this.gisList));
    } else {
      this.assetowningList[this.index] = this.assetowning;
    }
      this.storage.set('ASSETOWNING_LIST', JSON.stringify(this.assetowningList));
      this.showAlert();
      this.goToPendingPage()
  }

  goToPendingPage() {
    this.navCtrl.setRoot('PendingPage', {type: 'register'});
  }




}
