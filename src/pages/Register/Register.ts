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
  assetowningSubProcessSystem: Array<any>;
  assetowningSub_function: Array<any>;
  assetowningClass: Array<any>;
  assetOwningClassType: Array<any>;
  assetowningAsset_type: Array<any>;
  assetowningAssetTypeSubCat1: Array<any>;
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

    this.assetowningSubProcessSystem = [

      {
        id:"01" ,
        name:"PRE LIME DOSING CHAMBER",
        type: [
          { id: "01", name: "PRE LIME" },
       ]
      },

      {
        id:"02" ,
        name:"PRE OXIDATION TANK",
        type: [
          { id: "02", name: "POTASSIUM PERMANGANATE DOSING" },
       ]
      },

      {
        id:"03" ,
        name:"FLOCCULATION TANK",
        type: [
          { id: "03", name: "CHEMICAL MIXING CHAMBER" },
          { id: "04", name: "FLOCCULATOR" },
          { id: "05", name: "POLYMER DOSING" },
       ]
      },

      {
        id:"04" ,
        name:"HOLDING TANK",
        type: [
          { id: "06", name: "POST CHLORINE" },
       ]
      },

      {
        id:"05" ,
        name:"PROCESS CONTROL BUILDING",
        type: [
          { id: "07", name: "TEST ROOM (ANALYZER)" },
       ]
      },

      {
        id:"06" ,
        name:"CHEMICAL PLANT -  CHLORINE GAS SYSTEM",
        type: [
          { id: "08", name: "CHLORINATION ROOM" },
       ]
      },

      {
        id:"07" ,
        name:"SCRUBBER SYSTEM",
        type: [
          { id: "09", name: "NAOH STORAGE TANK" },
       ]
      },

      {
        id:"08" ,
        name:"CHEMICAL PLANT -  FLORIDE",
        type: [
          { id: "10", name: "FLORIDE DOSING SYSTEM" },
          { id: "11", name: "DUST EXTRACTION SYSTEM" },
       ]
      },

      {
        id:"9" ,
        name:"CHEMICAL PLANT - LIME/SODA",
        type: [
          { id: "12", name: "LIME DOSING SYSTEM" },
          { id: "13", name: "LIME SILO" },
       ]
      },

      {
        id:"10" ,
        name:"CHEMICAL PLANT -  PAC",
        type: [
          { id: "14", name: "PAC DOSING SYSTEM" },
          { id: "15", name: "PAC TANK" },
       ]
      },

      {
        id:"11" ,
        name:"CHEMICAL PLANT -  POLYMER/POLYELECTROLYTE",
        type: [
          { id: "16", name: "POLYMER DOSING SYSTEM" },
       ]
      },

      {
        id:"12" ,
        name:"CHEMICAL PLANT -  POTTASIUM PERMANGANATE",
        type: [
          { id: "17", name: "POTASSIUM DOSING SYSTEM" },
          { id: "18", name: "POTASSIUM CONTROL ROOM" },
       ]
      },

      {
        id:"13" ,
        name:"AIR COMPRESSOR BAY",
        type: [
          { id: "19", name: "PUMPSET BE 1 211 MLD" },
          { id: "20", name: "PUMPSET BE 2 211 MLD" },
          { id: "21", name: "PUMPSET BE 3 211 MLD" },
          { id: "22", name: "PUMPSET BE 4 211 MLD" },
          { id: "23", name: "PUMPSET BE 5 211 MLD" },
          { id: "24", name: "PUMPSET BE 6 211 MLD" },
          { id: "25", name: "PUMPSET BE 7 211 MLD" },
          { id: "26", name: "PUMPSET HLL 1 145 MLD" },
          { id: "27", name: "PUMPSET HLL 2 145 MLD" },
          { id: "28", name: "PUMPSET HLS 1 72.5 MLD" },
          { id: "29", name: "PUMPSET HLS 2 72.5 MLD" },
          { id: "30", name: "PUMPSET HLS 3 72.5 MLD" },
          { id: "31", name: "VENTILATION SYSTEM" },
          { id: "32", name: "5T MANUAL CHAIN BLOCK 1" },
          { id: "33", name: "5T MANUAL CHAIN BLOCK 2" },
          { id: "34", name: "5T MANUAL CHAIN BLOCK 3" },
          { id: "35", name: "5T MANUAL CHAIN BLOCK 4" },
          { id: "36", name: "5T MANUAL CHAIN BLOCK 5" },
          { id: "37", name: "5T MANUAL CHAIN BLOCK 6" },
          { id: "38", name: "5T MANUAL CHAIN BLOCK 7" },
          { id: "39", name: "5T MANUAL CHAIN BLOCK 8" },
          { id: "40", name: "5T MANUAL CHAIN BLOCK 9" },
          { id: "41", name: "5T MANUAL CHAIN BLOCK 10" },
          { id: "42", name: "5T MANUAL CHAIN BLOCK 11" },
          { id: "43", name: "5T MANUAL CHAIN BLOCK 12" },
          { id: "44", name: "VENTILATOR #" },
       ]
      },

      {
        id:"14" ,
        name:"SCOUR VALVE CHAMBER TYPE 1",
        type: [
          { id: "45", name: "AIR COMPRESSOR 1" },
          { id: "46", name: "AIR COMPRESSOR STARTERBOARD" },
       ]
      },

      {
        id:"15" ,
        name:"SCOUR VALVE CHAMBER TYPE 2",
        type: [
          { id: "47", name: "SLUICE VALVE" },
          { id: "48", name: "HEADSTOCK" },
     
       ]
      },

      {
        id:"16" ,
        name:"TRANSFORMER YARD",
        type: [
          { id: "49", name: "SLUICE VALVE" },
          { id: "50", name: "HEADSTOCK" },
       ]
      },

      {
        id:"17" ,
        name:"SURGE VESSEL 1",
        type: [
          { id: "51", name: "NOT AVAILABLE" },
       ]
      },

      {
        id:"18" ,
        name:"SURGE VESSEL 2",
        type: [
          { id: "52", name: "NOT AVAILABLE" },
       ]
      },

      {
        id:"19" ,
        name:"SURGE VESSEL 3",
        type: [
          { id: "53", name: "NOT AVAILABLE" },
       ]
      },

      {
        id:"20" ,
        name:"SURGE VESSEL 4",
        type: [
          { id: "54", name: "NOT AVAILABLE" },
       ]
      },

      {
        id:"21" ,
        name:"SURGE VESSEL 5",
        type: [
          { id: "55", name: "NOT AVAILABLE" },
       ]
      },

      {
        id:"22" ,
        name:"SURGE VESSEL 6",
        type: [
          { id: "56", name: "NOT AVAILABLE" },
       ]
      },

      {
        id:"23" ,
        name:"SURGE VESSEL 7",
        type: [
          { id: "57", name: "NOT AVAILABLE" },
       ]
      },

      {
        id:"24" ,
        name:"SURGE VESSEL 8",
        type: [
          { id: "58", name: "NOT AVAILABLE" },
       ]
      },

      {
        id:"25" ,
        name:"SURGE VESSEL 9",
        type: [
          { id: "59", name: "NOT AVAILABLE" },
       ]
      },

      {
        id:"26" ,
        name:"UPS & DC SUPPLY ROOM",
        type: [
          { id: "60", name: "UPS PANEL" },
          { id: "61", name: "DC SUPPLY PANEL" },
       ]
      },

      {
        id:"27" ,
        name:"TRANSFORMER AREA",
        type: [
        
       ]
      },

      {
        id:"28" ,
        name:"415V SWITCHROOM",
        type: [
          { id: "63", name: "415V MAIN SWITCHBOARD" },
       ]
      },

      {
        id:"29" ,
        name:"INERT GAS CYLINDER ROOM",
        type: [
          { id: "64", name: "GAS CYLINDER" },
       ]
      },

      {
        id:"30" ,
        name:"REMOTE SWITCHING STATION ROOM",
        type: [
          { id: "65", name: "REMOTE SWITCHING PANEL" },
       ]
      },

      {
        id:"31" ,
        name:"DEWATERING PLANT",
        type: [
          { id: "66", name: "DECANTER SYSTEM" },
       ]
      },

      {
        id:"32" ,
        name:"THICKENED RESIDUAL STORAGE TANK",
        type: [
          { id: "67", name: "PUMP" },
       ]
      },

      {
        id:"33" ,
        name:"RESIDUAL STORAGE YARD",
        type: [
          { id: "68", name: "LANDING VALVE" },
          { id: "69", name: "SCREW CONVEYOR" },
       ]
      },

      {
        id:"34" ,
        name:"SLUDGE THICKENING TANK 1",
        type: [
          { id: "70", name: "OUTLET VALVE CHAMBER" },
          { id: "71", name: "SLUDGE HOLDING TANK A1" },
          { id: "72", name: "RESIDUAL THICKENER 1" },
    
       ]
      },

      {
        id:"35" ,
        name:"SLUDGE THICKENING TANK 2",
        type: [
          { id: "73", name: "OUTLET VALVE CHAMBER" },
          { id: "74", name: "SLUDGE HOLDING TANK A2" },
          { id: "75", name: "RESIDUAL THICKENER 2" },
        ]
      },

      {
        id:"36" ,
        name:"SLUDGE THICKENING TANK 3",
        type: [
          { id: "76", name: "OUTLET VALVE CHAMBER" },
          { id: "77", name: "SLUDGE HOLDING TANK B3" },
          { id: "78", name: "RESIDUAL THICKENER 3" },
        
       ]
       
      },

      {
        id:"37" ,
        name:"SLUDGE THICKENING TANK 4",
        type: [
          { id: "79", name: "OUTLET VALVE CHAMBER" },
          { id: "80", name: "SLUDGE HOLDING TANK B4" },
          { id: "81", name: "RESIDUAL THICKENER 4" },
       ]
      },

      {
        id:"38" ,
        name:"WASHWATER RECOVERY TANK",
        type: [
          { id: "82", name: "PENSTOCK" },
       ]
      },

      {
        id:"39" ,
        name:"RESIDUAL HOLDING TANK",
        type: [
          { id: "83", name: "PANEL BOARD" },
          { id: "84", name: "1T SLEWING JIB" },
          { id: "85", name: "PENSTOCK" },
          { id: "86", name: "SUBMERSIBLE MIXER" },
       ]
      },

      {
        id:"40" ,
        name:"FLOWMETER CHAMBER",
        type: [
          { id: "87", name: "FLOWMETER" },
       ]
      },

      {
        id:"41" ,
        name:"VALVE CHAMBER",
        type: [
          { id: "88", name: "BUTTERFLY VALVE" },
          { id: "89", name: "SLUICE VALVE" },
          { id: "90", name: "SCOUR VALVE" },
       ]
      },

      {
        id:"42" ,
        name:"LABORATORY",
        type: [
          { id: "91", name: "MICROBIOLOGY ROOM" },
          { id: "92", name: "CHEMIST ROOM" },
          
       ]
      },

      {
        id:"43" ,
        name:"COMMAND CENTRE",
        type: [
          { id: "93", name: "SERVER" },
       ]
      },

      {
        id:"44" ,
        name:"CHLORINE CONTACT TANK 1",
        type: [
          { id: "94", name: "POST CHLORINE DOSING" },
        ]
      },
    
      {
        id:"45" ,
        name:"CHLORINE CONTACT TANK 2",
        type: [
          { id: "95", name: "POST CHLORINE DOSING" },
         
           
       ]
      },

      {
        id:"46" ,
        name:"CHLORINE CONTACT TANK 3",
        type: [
          { id: "96", name: "POST CHLORINE DOSING" },
          
       ]
      },

      {
        id:"47" ,
        name:"CHLORINE CONTACT TANK 4",
        type: [
          { id: "97", name: "POST CHLORINE DOSING" },
         
       ]
      },

      {
        id:"48" ,
        name:"CLEAR WATER TANK 1",
        type: [
          { id: "98", name: "NOT AVAILABLE" },
          
       ]
      },

      {
        id:"49" ,
        name:"CLEAR WATER TANK 2",
        type: [
          { id: "99", name: "NOT AVAILABLE" },
          
       ]
      },

      {
        id:"50" ,
        name:"CLEAR WATER TANK 3",
        type: [
          { id: "100", name: "NOT AVAILABLE" },
          
       ]
      },

      {
        id:"51" ,
        name:"CLEAR WATER TANK 4",
        type: [
          { id: "101", name: "NOT AVAILABLE" },
       ]
      },

      {
        id:"52" ,
        name:"SCOUR CHAMBER 1",
        type: [
          { id: "102", name: "SLUICE VALVE" },
          { id: "103", name: "HEADSTOCK" },
          
       ]
      },

      {
        id:"53" ,
        name:"SCOUR CHAMBER 2",
        type: [
          { id: "104", name: "SLUICE VALVE" },
          { id: "105", name: "HEADSTOCK" },
         
       ]
      },

      {
        id:"54" ,
        name:"SCOUR CHAMBER 3",
        type: [
          { id: "106", name: "SLUICE VALVE" },
          { id: "107", name: "HEADSTOCK" },
         
       ]
      },

      {
        id:"55" ,
        name:"SCOUR CHAMBER 4",
        type: [
          { id: "108", name: "SLUICE VALVE" },
          { id: "109", name: "HEADSTOCK" },
          
       ]
      },

      {
        id:"56" ,
        name:"SCOUR CHAMBER 5",
        type: [
          { id: "110", name: "SLUICE VALVE" },
          { id: "111", name: "HEADSTOCK" },
          
       ]
      },

      {
        id:"57" ,
        name:"SCOUR CHAMBER 6",
        type: [
          { id: "112", name: "SLUICE VALVE" },
          { id: "113", name: "HEADSTOCK" },
          
       ]
      },

      {
        id:"58" ,
        name:"SCOUR CHAMBER 7",
        type: [
          { id: "114", name: "SLUICE VALVE" },
          { id: "115", name: "HEADSTOCK" },
          
       ]
      },

      {
        id:"59" ,
        name:"SCOUR CHAMBER 8",
        type: [
          { id: "116", name: "SLUICE VALVE" },
          { id: "117", name: "HEADSTOCK" },
          
       ]
      },

      {
        id:"60" ,
        name:"SCOUR CHAMBER 9",
        type: [
          { id: "118", name: "SLUICE VALVE" },
          { id: "119", name: "HEADSTOCK" },
          
       ]
      },

      {
        id:"61" ,
        name:"SCOUR CHAMBER 10",
        type: [
          { id: "120", name: "SLUICE VALVE" },
          { id: "121", name: "HEADSTOCK" },
         
       ]
      },

      {
        id:"62" ,
        name:"SCOUR CHAMBER 11",
        type: [
          { id: "122", name: "SLUICE VALVE" },
          { id: "123", name: "HEADSTOCK" },
          
       ]
      },

      {
        id:"63" ,
        name:"SCOUR CHAMBER 12",
        type: [
          { id: "124", name: "SLUICE VALVE" },
          { id: "125", name: "HEADSTOCK" },
       ]
      },

      {
        id:"64" ,
        name:"WEIGHBRIDGE",
        type: [
          { id: "126", name: "NOT AVAILABLE" },
       ]
      },

      {
        id:"65" ,
        name:"GENERATOR",
        type: [
          { id: "127", name: "WATER STORAGE TANK" },
          { id: "128", name: "COOLING TOWER" },
          { id: "129", name: "VIBRATION MONITORING SYSTEM" },
       ]
      },

      {
        id:"66" ,
        name:"BUTTERFLY VALVE CHAMBER",
        type: [
          { id: "130", name: "MOTORISED BUTTERFLY VALVE" },
          { id: "131", name: "ELECTRIC ACTUATOR" },
         
       ]
      },

      {
        id:"67" ,
        name:"LANDSCAPING VALVE CHAMBER",
        type: [
          { id: "132", name: "MOTORISED BUTTERFLY VALVE" },
          { id: "133", name: "ELECTRIC ACTUATOR" },
       ]
      },

      {
        id:"68" ,
        name:"RESIDUAL EMERGENCY LAGOON NO.1",
        type: [
          { id: "134", name: "PENSTOCK" },
          { id: "135", name: "ELECTRIC ACTUATOR" },
          { id: "136", name: "LANDING VALVE" },
          { id: "137", name: "RESIDUAL TRANSFER PUMP 1A" },
          { id: "138", name: "RESIDUAL TRANSFER PUMP 1B" },
       ]
      },

      {
        id:"69" ,
        name:"RESIDUAL EMERGENCY LAGOON NO.2",
        type: [
          { id: "139", name: "PENSTOCK" },
          { id: "140", name: "ELECTRIC ACTUATOR" },
          { id: "141", name: "LANDING VALVE" },
          { id: "142", name: "BYPASS PENSTOCK" },
          { id: "143", name: "RESIDUAL TRANSFER PUMP 2A" },
          { id: "144", name: "RESIDUAL TRANSFER PUMP 2B" },
       ]
      },
    ];

    

    this.assetowningSub_function = [
      { id: "01", name: "PRE LIME" },
      { id: "02", name: "POTASSIUM PERMANGANATE DOSING" },
      { id: "03", name: "CHEMICAL MIXING CHAMBER" },
      { id: "04", name: "FLOCCULATOR" },
      { id: "05", name: "POLYMER DOSING" },
      { id: "06", name: "POST CHLORINE" },
      { id: "07", name: "TEST ROOM (ANALYZER)" },
      { id: "08", name: "CHLORINATION ROOM" },
      { id: "09", name: "NAOH STORAGE TANK" },
      { id: "10", name: "FLORIDE DOSING SYSTEM" },
      { id: "11", name: "DUST EXTRACTION SYSTEM" },
      { id: "12", name: "LIME DOSING SYSTEM" },
      { id: "13", name: "LIME SILO" },
      { id: "14", name: "PAC DOSING SYSTEM" },
      { id: "15", name: "PAC TANK" },
      { id: "16", name: "POLYMER DOSING SYSTEM" },
      { id: "17", name: "POTASSIUM DOSING SYSTEM" },
      { id: "18", name: "POTASSIUM CONTROL ROOM" },
      { id: "19", name: "PUMPSET BE 1 211 MLD" },
      { id: "20", name: "PUMPSET BE 2 211 MLD" },
      { id: "21", name: "PUMPSET BE 3 211 MLD" },
      { id: "22", name: "PUMPSET BE 4 211 MLD" },
      { id: "23", name: "PUMPSET BE 5 211 MLD" },
      { id: "24", name: "PUMPSET BE 6 211 MLD" },
      { id: "25", name: "PUMPSET BE 7 211 MLD" },
      { id: "26", name: "PUMPSET HLL 1 145 MLD" },
      { id: "27", name: "PUMPSET HLL 2 145 MLD" },
      { id: "28", name: "PUMPSET HLS 1 72.5 MLD" },
      { id: "29", name: "PUMPSET HLS 2 72.5 MLD" },
      { id: "30", name: "PUMPSET HLS 3 72.5 MLD" },
      { id: "31", name: "VENTILATION SYSTEM" },
      { id: "32", name: "5T MANUAL CHAIN BLOCK 1" },
      { id: "33", name: "5T MANUAL CHAIN BLOCK 2" },
      { id: "34", name: "5T MANUAL CHAIN BLOCK 3" },
      { id: "35", name: "5T MANUAL CHAIN BLOCK 4" },
      { id: "36", name: "5T MANUAL CHAIN BLOCK 5" },
      { id: "37", name: "5T MANUAL CHAIN BLOCK 6" },
      { id: "38", name: "5T MANUAL CHAIN BLOCK 7" },
      { id: "39", name: "5T MANUAL CHAIN BLOCK 8" },
      { id: "40", name: "5T MANUAL CHAIN BLOCK 9" },
      { id: "41", name: "5T MANUAL CHAIN BLOCK 10" },
      { id: "42", name: "5T MANUAL CHAIN BLOCK 11" },
      { id: "43", name: "5T MANUAL CHAIN BLOCK 12" },
      { id: "44", name: "VENTILATOR #" },
      { id: "45", name: "AIR COMPRESSOR 1" },
      { id: "46", name: "AIR COMPRESSOR STARTERBOARD" },
      { id: "47", name: "SLUICE VALVE" },
      { id: "48", name: "HEADSTOCK" },
      { id: "49", name: "SLUICE VALVE" },
      { id: "50", name: "HEADSTOCK" },
      { id: "51", name: "NOT AVAILABLE" },
      { id: "52", name: "NOT AVAILABLE" },
      { id: "53", name: "NOT AVAILABLE" },
      { id: "54", name: "NOT AVAILABLE" },
      { id: "55", name: "NOT AVAILABLE" },
      { id: "56", name: "NOT AVAILABLE" },
      { id: "57", name: "NOT AVAILABLE" },
      { id: "58", name: "NOT AVAILABLE" },
      { id: "59", name: "NOT AVAILABLE" },
      { id: "60", name: "UPS PANEL" },
      { id: "61", name: "DC SUPPLY PANEL" },
      { id: "62", name: "TRANSFORMER" },
      { id: "63", name: "415V MAIN SWITCHBOARD" },
      { id: "64", name: "GAS CYLINDER" },
      { id: "65", name: "REMOTE SWITCHING PANEL" },
      { id: "66", name: "DECANTER SYSTEM" },
      { id: "67", name: "PUMP" },
      { id: "68", name: "LANDING VALVE" },
      { id: "69", name: "SCREW CONVEYOR" },
      { id: "70", name: "OUTLET VALVE CHAMBER" },
      { id: "71", name: "SLUDGE HOLDING TANK A1" },
      { id: "72", name: "RESIDUAL THICKENER 1" },
      { id: "73", name: "OUTLET VALVE CHAMBER" },
      { id: "74", name: "SLUDGE HOLDING TANK A2" },
      { id: "75", name: "RESIDUAL THICKENER 2" },
      { id: "76", name: "OUTLET VALVE CHAMBER" },
      { id: "77", name: "SLUDGE HOLDING TANK B3" },
      { id: "78", name: "RESIDUAL THICKENER 3" },
      { id: "79", name: "OUTLET VALVE CHAMBER" },
      { id: "80", name: "SLUDGE HOLDING TANK B4" },
      { id: "81", name: "RESIDUAL THICKENER 4" },
      { id: "82", name: "PENSTOCK" },
      { id: "83", name: "PANEL BOARD" },
      { id: "84", name: "1T SLEWING JIB" },
      { id: "85", name: "PENSTOCK" },
      { id: "86", name: "SUBMERSIBLE MIXER" },
      { id: "87", name: "FLOWMETER" },
      { id: "88", name: "BUTTERFLY VALVE" },
      { id: "89", name: "SLUICE VALVE" },
      { id: "90", name: "SCOUR VALVE" },
      { id: "91", name: "MICROBIOLOGY ROOM" },
      { id: "92", name: "CHEMIST ROOM" },
      { id: "93", name: "SERVER" },
      { id: "94", name: "POST CHLORINE DOSING" },
      { id: "95", name: "POST CHLORINE DOSING" },
      { id: "96", name: "POST CHLORINE DOSING" },
      { id: "97", name: "POST CHLORINE DOSING" },
      { id: "98", name: "NOT AVAILABLE" },
      { id: "99", name: "NOT AVAILABLE" },
      { id: "100", name: "NOT AVAILABLE" },
      { id: "101", name: "NOT AVAILABLE" },
      { id: "102", name: "SLUICE VALVE" },
      { id: "103", name: "HEADSTOCK" },
      { id: "104", name: "SLUICE VALVE" },
      { id: "105", name: "HEADSTOCK" },
      { id: "106", name: "SLUICE VALVE" },
      { id: "107", name: "HEADSTOCK" },
      { id: "108", name: "SLUICE VALVE" },
      { id: "109", name: "HEADSTOCK" },
      { id: "110", name: "SLUICE VALVE" },
      { id: "111", name: "HEADSTOCK" },
      { id: "112", name: "SLUICE VALVE" },
      { id: "113", name: "HEADSTOCK" },
      { id: "114", name: "SLUICE VALVE" },
      { id: "115", name: "HEADSTOCK" },
      { id: "116", name: "SLUICE VALVE" },
      { id: "117", name: "HEADSTOCK" },
      { id: "118", name: "SLUICE VALVE" },
      { id: "119", name: "HEADSTOCK" },
      { id: "120", name: "SLUICE VALVE" },
      { id: "121", name: "HEADSTOCK" },
      { id: "122", name: "SLUICE VALVE" },
      { id: "123", name: "HEADSTOCK" },
      { id: "124", name: "SLUICE VALVE" },
      { id: "125", name: "HEADSTOCK" },
      { id: "126", name: "NOT AVAILABLE" },
      { id: "127", name: "WATER STORAGE TANK" },
      { id: "128", name: "COOLING TOWER" },
      { id: "129", name: "VIBRATION MONITORING SYSTEM" },
      { id: "130", name: "MOTORISED BUTTERFLY VALVE" },
      { id: "131", name: "ELECTRIC ACTUATOR" },
      { id: "132", name: "MOTORISED BUTTERFLY VALVE" },
      { id: "133", name: "ELECTRIC ACTUATOR" },
      { id: "134", name: "PENSTOCK" },
      { id: "135", name: "ELECTRIC ACTUATOR" },
      { id: "136", name: "LANDING VALVE" },
      { id: "137", name: "RESIDUAL TRANSFER PUMP 1A" },
      { id: "138", name: "RESIDUAL TRANSFER PUMP 1B" },
      { id: "139", name: "PENSTOCK" },
      { id: "140", name: "ELECTRIC ACTUATOR" },
      { id: "141", name: "LANDING VALVE" },
      { id: "142", name: "BYPASS PENSTOCK" },
      { id: "143", name: "RESIDUAL TRANSFER PUMP 2A" },
      { id: "144", name: "RESIDUAL TRANSFER PUMP 2B" },

    ];

    this.assetowningClass = [
      { id: "01", name: "ELECTRICAL" },
      { id: "02", name: "MECHANICAL" },
      { id: "03", name: "INSTRUMENT" },
      { id: "04", name: "STRUCTURE" },
      { id: "05", name: "OTHERS" },
    ];

    this.assetOwningClassType = [
      { id: "01", 
        name: "ELECTRICAL" ,
        type: [
          { id: "01", name: "VALVE" },
          { id: "02", name: "PANEL" },
          { id: "16", name: "TRANSFORMER" },
          { id: "17", name: "SYSTEM" },
          { id: "18", name: "SERVER" },
          { id: "19", name: "ADMIN" },
          { id: "16", name: "TRANSFORMER" },
          { id: "17", name: "SYSTEM" },
          { id: "18", name: "SERVER" },
          { id: "19", name: "ADMIN" },
        ]
      },
      { 
        id: "02", 
        name: "MECHANICAL",
        type: [
          { id: "03", name: "VALVE" },
          { id: "04", name: "PUMP" },
          { id: "05", name: "MOTOR" },
          { id: "06", name: "TRANSMITTER" },
          { id: "07", name: "FLOWMETER" },
          { id: "08", name: "MIXER" },
          { id: "09", name: "LIFTING" },
          { id: "12", name: "SYSTEM" },
          { id: "13", name: "FILTER" },
          { id: "14", name: "LAB" },
          { id: "15", name: "PIPE" },
          { id: "25", name: "ACTUATOR" },
          { id: "26", name: "METER" },
        ]
      },
      { id: "03", 
        name: "INSTRUMENT",
        type: [
          { id: "10", name: "LEVEL ELECTRODE" },
          { id: "11", name: "FLOWSWITCH" },
          { id: "20", name: "FLOWMETER" },
          { id: "21", name: "TRANSMITTER" },
        ] 
      },
      { id: "04", 
        name: "STRUCTURE",
        type: [
          { id: "22", name: "MAIN BUILDING" },
          { id: "23", name: "TANK" },
        ] 
      },

      { id: "05", 
        name: "OTHERS",
        type: [
          { id: "24", name: "NOT AVAILABLE" },
        ] 
      }
    ];

    this.assetowningAsset_type = [
      { id: "01", name: "VALVE" },
      { id: "02", name: "PANEL" },
      { id: "03", name: "VALVE" },
      { id: "04", name: "PUMP" },
      { id: "05", name: "MOTOR" },
      { id: "06", name: "TRANSMITTER" },
      { id: "07", name: "FLOWMETER" },
      { id: "08", name: "MIXER" },
      { id: "09", name: "LIFTING" },
      { id: "10", name: "LEVEL ELECTRODE" },
      { id: "11", name: "FLOWSWITCH" },
      { id: "12", name: "SYSTEM" },
      { id: "13", name: "FILTER" },
      { id: "14", name: "LAB" },
      { id: "15", name: "PIPE" },
      { id: "16", name: "TRANSFORMER" },
      { id: "17", name: "SYSTEM" },
      { id: "18", name: "SERVER" },
      { id: "19", name: "ADMIN" },
      { id: "20", name: "FLOWMETER" },
      { id: "21", name: "TRANSMITTER" },
      { id: "22", name: "MAIN BUILDING" },
      { id: "23", name: "TANK" },
      { id: "24", name: "NOT AVAILABLE" },
      { id: "25", name: "ACTUATOR" },
      { id: "26", name: "METER" },
    ];

    this.assetowningAssetTypeSubCat1 = [

      {
        id:"01" ,
        name:"VALVE",
        type: [
          { id: "01", name: "POWERBOARD" },
          { id: "10", name: "DB" },
          { id: "30", name: "MCC" },
          { id: "31", name: "VENTILATION FAN STATER BOARD" },
          { id: "39", name: "STARTER BOARD" },
          { id: "40", name: "SWITCHBOARD" },
          { id: "90", name: "LV SWITCHBOARD/MCC" },
          { id: "91", name: "LV BOARD" },
       ]
      },

      {
        id:"02" ,
        name:"PANEL",
        type: [
          { id: "02", name: "LCP" },
          { id: "03", name: "SCADA UPS PANEL" },
          { id: "04", name: "SCADA UPS BATTERY PANEL" },
          { id: "17", name: "DOSED WATER MONITORING" },
          { id: "26", name: "CLARIFIER CONTROL PANEL" },
          { id: "27", name: "CLARIFIER PNEUMATIC PANEL" },
          { id: "41", name: "VFD PANEL" },
          { id: "45", name: "FILTER LCP" },
          { id: "69", name: "DC SUPPLY/CHARGER PANEL" },
          { id: "70", name: "BATTERY PANEL(FOR DC)" },
          { id: "71", name: "HT SWITCHGEAR/VY PANEL" },
          { id: "72", name: "GENERATOR NEP PANEL" },
          { id: "73", name: "TRANSFORMER OLTC PANEL" },
          { id: "74", name: "ENGINE INSTRUMENT/ALARM PANEL" },
          { id: "75", name: "TANK GAUGING PANEL" },
          { id: "76", name: "LEAK DETECTOR BATTERY PANEL" },
          { id: "77", name: "HOUSE GENERATOR AMF PANEL" },
          { id: "78", name: "GENERATOR CONTROL & ALARM PANEL" },
          { id: "79", name: "GENERATOR SYNCHRONIZIING PANEL" },
          { id: "80", name: "MAIN HT SWDB REMOTE SWITCHING PANEL" },
          { id: "81", name: "GENERATOR SUPERVISING PANEL" },
          { id: "82", name: "PUMP MOTOR STARTED BD RRP LV DIST PANEL" },
          { id: "83", name: "TNB METERING PANEL" },
          { id: "84", name: "CONSUMER REMOTE SWITCHING PANEL" },
          { id: "85", name: "POWER FACTOR CORRECTION PANEL" },
          { id: "86", name: "HT FEEDER & VT PANEL" },
          { id: "87", name: "SCADA OUTSTATION PANEL(O/S4)" },
          { id: "88", name: "TWPS REMOTE SWITCHING PANEL" },
          { id: "89", name: "INCOMER PANEL" },
       ]
      },

      {
        id:"03" ,
        name:"VALVE",
        type: [
          { id: "06", name: "BUTTERFLY VALVE" },
          { id: "12", name: "GATE VALVE" },
          { id: "13", name: "PRESSURE REDUCING VALVE" },
          { id: "14", name: "LANDING VALVE" },
          { id: "15", name: "CHLORINE VALVE" },
          { id: "16", name: "AIR VALVE" },
          { id: "21", name: "PENSTOCK" },
          { id: "24", name: "MANUAL OVERRIDE" },
          { id: "34", name: "NON RETURN VALVE" },
          { id: "35", name: "GEAR BOX" },
          { id: "46", name: "BALL VALVE" },
       ]
      },

      {
        id:"04" ,
        name:"PUMP",
        type: [
          { id: "07", name: "SAMPLING PUMP" },
          { id: "33", name: "SUBMERSIBLE PUMP" },
          { id: "37", name: "PUMP" },
          { id: "47", name: "DOSING PUMP" },
          { id: "48", name: "TRANSFER PUMP" },
          { id: "49", name: "METERING PUMP" },
          { id: "50", name: "SUMP PUMP" },
       ]
      },

      {
        id:"05" ,
        name:"MOTOR",
        type: [
          { id: "08", name: "PUMP MOTOR" },
          { id: "28", name: "AIR COMPRESSOR SET" },
          { id: "38", name: "MOTOR" },
          { id: "42", name: "BLOWER" },
          { id: "43", name: "BLOWER MOTOR" },
          { id: "54", name: "FLOCULATOR" },
          { id: "147", name: "MECHANICAL MIXER" },
       ]
      },

      {
        id:"06" ,
        name:"TRANSMITTER",
        type: [
          { id: "141", name: "NOT AVAILABLE" },
       ]
      },

      {
        id:"07" ,
        name:"FLOWMETER",
        type: [
          { id: "11", name: "PRESSURE INDICATOR" },
       ]
      },

      {
        id:"08" ,
        name:"MIXER",
        type: [
          { id: "18", name: "STATIC MIXER" },
          { id: "22", name: "MECHANICAL MIXER" },
          { id: "51", name: "SUBMESIBLE MIXER" },
          { id: "52", name: "LAMELLA THROUGH" },
          { id: "53", name: "LAMELLA PLATE" },
       ]
      },

      {
        id:"9" ,
        name:"LIFTING",
        type: [
          { id: "19", name: "MONORAIL HOIST" },
          { id: "23", name: "SLEWING JIB" },
          { id: "44", name: "OVERHEAD CRANE" },
          { id: "65", name: "LIFTING JIB" },
          { id: "66", name: "PORTAL CRANE" },
          { id: "67", name: "LIFTING DEVICE" },
          { id: "68", name: "SWIVEL BEND C/W FLOATING ARM" },
          { id: "146", name: "ELECTRIC OVERHEAD" }
       ]
      },

      {
        id:"10" ,
        name:"LEVEL ELECTRODE",
        type: [
          { id: "20", name: "ELECTRODE" },
         
       ]
      },

      {
        id:"11" ,
        name:"FLOWSWITCH",
        type: [
          { id: "25", name: "FLOW SWITCH(CALORIMETRIC TYPE)" },
       ]
      },

      {
        id:"12" ,
        name:"SYSTEM",
        type: [
          { id: "29", name: "VENTILATION SYSTEM" },
          { id: "55", name: "CHEMICAL SYSTEM" },
          { id: "56", name: "CHLORINATION SYSTEM" },
          { id: "57", name: "EVAPORATON SYSTEM" },
          { id: "58", name: "DUST EXTRACTION SYSTEM" },
          { id: "59", name: "CHLORINE SCRUBBER SYSTEM" },
          { id: "60", name: "CIRCULAR SCRAPPER SYSTEM" },
          { id: "61", name: "OLTC SYSTEM" },
          { id: "62", name: "DATA LOGGING SYSTEM" },
          { id: "63", name: "BUS SECTION" },
       ]
      },

      {
        id:"13" ,
        name:"FILTER",
        type: [
          { id: "32", name: "FILTER MEDIA" },
       ]
      },

      {
        id:"14" ,
        name:"LAB",
        type: [
          { id: "142", name: "NOT AVAILABLE" },
         
       ]
      },

      {
        id:"15" ,
        name:"PIPE",
        type: [
          
          { id: "143", name: "NOT AVAILABLE" },
       ]
      },

      {
        id:"16" ,
        name:"TRANSFORMER",
        type: [
          { id: "100", name: "TRANSFORMER" },
       ]
      },

      {
        id:"17" ,
        name:"SYSTEM",
        type: [
          { id: "64", name: "NOT AVAILABLE" },
       ]
      },

      {
        id:"18" ,
        name:"SERVER",
        type: [
          { id: "96", name: "DUAL SCADA MASTER STATION" },
          { id: "97", name: "HISTORIAN SERVER" },
          { id: "98", name: "WEB SERVER" },
          { id: "99", name: "CONTROL SERVER (MIMI'S)" },
       ]
      },

      {
        id:"19" ,
        name:"ADMIN",
        type: [
          { id: "92", name: "MANEGEMENT VIEW/ENGINEERING W/S C/W PRINTER" },
          { id: "93", name: "PRINTER" },
          { id: "94", name: "FILTER CONSOLE" },
          { id: "95", name: "LARGE SCREEN" },
       ]
      },

      {
        id:"20" ,
        name:"FLOWMETER",
        type: [     
          { id: "144", name: "NOT AVAILABLE" },
       ]
      },

      {
        id:"21" ,
        name:"TRANSMITTER",
        type: [
          { id: "09", name: "LEVEL TRANSMITTER" },
          { id: "36", name: "PRESSURE TRANSMITTER" },
       ]
      },

      {
        id:"22" ,
        name:"MAIN BUILDING",
        type: [
          { id: "102", name: "CLARIFIER" },
          { id: "103", name: "FILTER BUILDING" },
          { id: "104", name: "CHLORINE BUILDING" },
          { id: "105", name: "CHEMICAL BUILDING" },
          { id: "106", name: "TREATED WATER PUMPING STATION" },
          { id: "107", name: "RESIDUAL THIKENING PUMPING STATION" },
          { id: "108", name: "WASHWATER RECOVERY PLANT BUILDING" },
          { id: "109", name: "ADMINISTRATION BUILDING" },
          { id: "110", name: "CONSUMER 33KC SWITCHHOUSE" },
          { id: "111", name: "CLEAR WATER TANK" },
          { id: "112", name: "WORKSHOP" },
          { id: "113", name: "STORE HOUSE" },
          { id: "114", name: "GUARD HOUSE" },
          { id: "115", name: "RESIDUAL EMERGENCY LAGOON" },
          { id: "116", name: "GENERATOR HOUSE" },
       ]
      },

      {
        id:"23" ,
        name:"TANK",
        type: [
          { id: "117", name: "HORIZONTAL TANK" },
          { id: "118", name: "SILO" },
          { id: "119", name: "MIXING TANK" },
          { id: "120", name: "SERVICE TANK" },
          { id: "121", name: "DAILY TANK" },
          { id: "122", name: "BULK FUEL STORAGE TANK" },
       ]
      },

      {
        id:"24" ,
        name:"NOT AVAILABLE",
        type: [
          { id: "145", name: "NOT AVAILABLE" },
       ]
      },

      {
        id:"25" ,
        name:"ACTUATOR",
        type: [
          { id: "05", name: "ACTUATOR" },
       ]
      },

      {
        id:"26" ,
        name:"METER",
        type: [
          { id: "123", name: "TURBIDITY METER(HIGH RANGE)" },
      { id: "124", name: "TURBIDITY METER(LOW RANGE)" },
      { id: "125", name: "RESIDUAL BLANKET LEVEL METER" },
      { id: "126", name: "PH METER" },
      { id: "127", name: "AMMONIA METER" },
      { id: "128", name: "CHEMICAL OXYGEN DEMAND METER" },
      { id: "129", name: "DISSOLVED OXYGEN METER" },
      { id: "130", name: "MANGANESE METER" },
      { id: "131", name: "IRON METER" },
      { id: "132", name: "FREE CHLORINE RESIDUAL METER" },
      { id: "133", name: "FLUORIDE RESIDUAL METER" },
      { id: "134", name: "ALUMINIUM METER" },
      { id: "135", name: "RESIDUAL DENSITY METER" },
      { id: "136", name: "WATER FLOWMETER" },
      { id: "137", name: "RESIDUAL FLOWMETER" },
      { id: "138", name: "ELECTROMAGNETIC FLOWMETER" },
      { id: "139", name: "ULTRASONIC FLOWMETER" },
      { id: "140", name: "WATER METER" },
       ]
      },
    ];

    this.assetowningSub_cat1 = [
      { id: "01", name: "POWERBOARD" },
      { id: "02", name: "LCP" },
      { id: "03", name: "SCADA UPS PANEL" },
      { id: "04", name: "SCADA UPS BATTERY PANEL" },
      { id: "05", name: "ACTUATOR" },
      { id: "06", name: "BUTTERFLY VALVE" },
      { id: "07", name: "SAMPLING PUMP" },
      { id: "08", name: "PUMP MOTOR" },
      { id: "09", name: "LEVEL TRANSMITTER" },
      { id: "10", name: "DB" },
      { id: "11", name: "PRESSURE INDICATOR" },
      { id: "12", name: "GATE VALVE" },
      { id: "13", name: "PRESSURE REDUCING VALVE" },
      { id: "14", name: "LANDING VALVE" },
      { id: "15", name: "CHLORINE VALVE" },
      { id: "16", name: "AIR VALVE" },
      { id: "17", name: "DOSED WATER MONITORING" },
      { id: "18", name: "STATIC MIXER" },
      { id: "19", name: "MONORAIL HOIST" },
      { id: "20", name: "ELECTRODE" },
      { id: "21", name: "PENSTOCK" },
      { id: "22", name: "MECHANICAL MIXER" },
      { id: "23", name: "SLEWING JIB" },
      { id: "24", name: "MANUAL OVERRIDE" },
      { id: "25", name: "FLOW SWITCH(CALORIMETRIC TYPE)" },
      { id: "26", name: "CLARIFIER CONTROL PANEL" },
      { id: "27", name: "CLARIFIER PNEUMATIC PANEL" },
      { id: "28", name: "AIR COMPRESSOR SET" },
      { id: "29", name: "VENTILATION SYSTEM" },
      { id: "30", name: "MCC" },
      { id: "31", name: "VENTILATION FAN STATER BOARD" },
      { id: "32", name: "FILTER MEDIA" },
      { id: "33", name: "SUBMERSIBLE PUMP" },
      { id: "34", name: "NON RETURN VALVE" },
      { id: "35", name: "GEAR BOX" },
      { id: "36", name: "PRESSURE TRANSMITTER" },
      { id: "37", name: "PUMP" },
      { id: "38", name: "MOTOR" },
      { id: "39", name: "STARTER BOARD" },
      { id: "40", name: "SWITCHBOARD" },
      { id: "41", name: "VFD PANEL" },
      { id: "42", name: "BLOWER" },
      { id: "43", name: "BLOWER MOTOR" },
      { id: "44", name: "OVERHEAD CRANE" },
      { id: "45", name: "FILTER LCP" },
      { id: "46", name: "BALL VALVE" },
      { id: "47", name: "DOSING PUMP" },
      { id: "48", name: "TRANSFER PUMP" },
      { id: "49", name: "METERING PUMP" },
      { id: "50", name: "SUMP PUMP" },
      { id: "51", name: "SUBMESIBLE MIXER" },
      { id: "52", name: "LAMELLA THROUGH" },
      { id: "53", name: "LAMELLA PLATE" },
      { id: "54", name: "FLOCULATOR" },
      { id: "55", name: "CHEMICAL SYSTEM" },
      { id: "56", name: "CHLORINATION SYSTEM" },
      { id: "57", name: "EVAPORATON SYSTEM" },
      { id: "58", name: "DUST EXTRACTION SYSTEM" },
      { id: "59", name: "CHLORINE SCRUBBER SYSTEM" },
      { id: "60", name: "CIRCULAR SCRAPPER SYSTEM" },
      { id: "61", name: "OLTC SYSTEM" },
      { id: "62", name: "DATA LOGGING SYSTEM" },
      { id: "63", name: "BUS SECTION" },
      { id: "64", name: "NOT AVAILABLE" },
      { id: "65", name: "LIFTING JIB" },
      { id: "66", name: "PORTAL CRANE" },
      { id: "67", name: "LIFTING DEVICE" },
      { id: "68", name: "SWIVEL BEND C/W FLOATING ARM" },
      { id: "69", name: "DC SUPPLY/CHARGER PANEL" },
      { id: "70", name: "BATTERY PANEL(FOR DC)" },
      { id: "71", name: "HT SWITCHGEAR/VY PANEL" },
      { id: "72", name: "GENERATOR NEP PANEL" },
      { id: "73", name: "TRANSFORMER OLTC PANEL" },
      { id: "74", name: "ENGINE INSTRUMENT/ALARM PANEL" },
      { id: "75", name: "TANK GAUGING PANEL" },
      { id: "76", name: "LEAK DETECTOR BATTERY PANEL" },
      { id: "77", name: "HOUSE GENERATOR AMF PANEL" },
      { id: "78", name: "GENERATOR CONTROL & ALARM PANEL" },
      { id: "79", name: "GENERATOR SYNCHRONIZIING PANEL" },
      { id: "80", name: "MAIN HT SWDB REMOTE SWITCHING PANEL" },
      { id: "81", name: "GENERATOR SUPERVISING PANEL" },
      { id: "82", name: "PUMP MOTOR STARTED BD RRP LV DIST PANEL" },
      { id: "83", name: "TNB METERING PANEL" },
      { id: "84", name: "CONSUMER REMOTE SWITCHING PANEL" },
      { id: "85", name: "POWER FACTOR CORRECTION PANEL" },
      { id: "86", name: "HT FEEDER & VT PANEL" },
      { id: "87", name: "SCADA OUTSTATION PANEL(O/S4)" },
      { id: "88", name: "TWPS REMOTE SWITCHING PANEL" },
      { id: "89", name: "INCOMER PANEL" },
      { id: "90", name: "LV SWITCHBOARD/MCC" },
      { id: "91", name: "LV BOARD" },
      { id: "92", name: "MANEGEMENT VIEW/ENGINEERING W/S C/W PRINTER" },
      { id: "93", name: "PRINTER" },
      { id: "94", name: "FILTER CONSOLE" },
      { id: "95", name: "LARGE SCREEN" },
      { id: "96", name: "DUAL SCADA MASTER STATION" },
      { id: "97", name: "HISTORIAN SERVER" },
      { id: "98", name: "WEB SERVER" },
      { id: "99", name: "CONTROL SERVER (MIMI'S)" },
      { id: "100", name: "TRANSFORMER" },
      { id: "101", name: "AERATOR" },
      { id: "102", name: "CLARIFIER" },
      { id: "103", name: "FILTER BUILDING" },
      { id: "104", name: "CHLORINE BUILDING" },
      { id: "105", name: "CHEMICAL BUILDING" },
      { id: "106", name: "TREATED WATER PUMPING STATION" },
      { id: "107", name: "RESIDUAL THIKENING PUMPING STATION" },
      { id: "108", name: "WASHWATER RECOVERY PLANT BUILDING" },
      { id: "109", name: "ADMINISTRATION BUILDING" },
      { id: "110", name: "CONSUMER 33KC SWITCHHOUSE" },
      { id: "111", name: "CLEAR WATER TANK" },
      { id: "112", name: "WORKSHOP" },
      { id: "113", name: "STORE HOUSE" },
      { id: "114", name: "GUARD HOUSE" },
      { id: "115", name: "RESIDUAL EMERGENCY LAGOON" },
      { id: "116", name: "GENERATOR HOUSE" },
      { id: "117", name: "HORIZONTAL TANK" },
      { id: "118", name: "SILO" },
      { id: "119", name: "MIXING TANK" },
      { id: "120", name: "SERVICE TANK" },
      { id: "121", name: "DAILY TANK" },
      { id: "122", name: "BULK FUEL STORAGE TANK" },
      { id: "123", name: "TURBIDITY METER(HIGH RANGE)" },
      { id: "124", name: "TURBIDITY METER(LOW RANGE)" },
      { id: "125", name: "RESIDUAL BLANKET LEVEL METER" },
      { id: "126", name: "PH METER" },
      { id: "127", name: "AMMONIA METER" },
      { id: "128", name: "CHEMICAL OXYGEN DEMAND METER" },
      { id: "129", name: "DISSOLVED OXYGEN METER" },
      { id: "130", name: "MANGANESE METER" },
      { id: "131", name: "IRON METER" },
      { id: "132", name: "FREE CHLORINE RESIDUAL METER" },
      { id: "133", name: "FLUORIDE RESIDUAL METER" },
      { id: "134", name: "ALUMINIUM METER" },
      { id: "135", name: "RESIDUAL DENSITY METER" },
      { id: "136", name: "WATER FLOWMETER" },
      { id: "137", name: "RESIDUAL FLOWMETER" },
      { id: "138", name: "ELECTROMAGNETIC FLOWMETER" },
      { id: "139", name: "ULTRASONIC FLOWMETER" },
      { id: "140", name: "WATER METER" },
      { id: "141", name: "NOT AVAILABLE" },
      { id: "142", name: "NOT AVAILABLE" },
      { id: "143", name: "NOT AVAILABLE" },
      { id: "144", name: "NOT AVAILABLE" },
      { id: "145", name: "NOT AVAILABLE" },
      { id: "146", name: "ELECTRIC OVERHEAD" },
      { id: "147", name: "MECHANICAL MIXER" }
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

  subProcessSystem(){
    this.assetowning.sub_function = null;
    let index = this.assetowningSubProcessSystem.findIndex(asset => asset.name == this.assetowning.sub_system)
    if (index > -1) {
      this.assetowningSub_function = this.assetowningSubProcessSystem[index].type;
      console.log('changed',this.assetowningSub_function);
    }
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

  assetCatChange(){
    this.assetowning.sub_cat1 = null;
    let index = this.assetowningAssetTypeSubCat1.findIndex(asset => asset.name == this.assetowning.asset_type)
    if (index > -1) {
      this.assetowningAsset_type = this.assetowningAssetTypeSubCat1[index].type;
      console.log('changed:',this.assetowningAsset_type)
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
