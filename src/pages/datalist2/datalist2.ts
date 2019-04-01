import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, Config } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { HttpClient } from '@angular/common/http';
import { ApiProvider } from '../../providers/api/api';


@IonicPage()
@Component({
  selector: 'page-datalist2',
  templateUrl: 'datalist2.html',
})
export class Datalist2Page {
  public config: Config;
  asset: string;
  info: string;
  data: any;
  assetowning: {
    Name: string, SoftTag: string, assetID: string, RFID: string, AssetTaggedNo: string, Model: string, SerialNo: string, Speed: string, Type: string, MakeBrand: string,
    Flow: string, Head: string, Medium: string, ManufactureYear: string, manufacturer_no: string, Voltage: string, Frequency: string, CurrentA: string, kWHp: string, PressureRating: string,
    WorkingPressure: string, DesignPressure: string, ShellThickness: string, Diameter: string, Weight: string, Capacity: string, LubricantGrease: string,
    EquipmentName: string, Span: string, Size: string, OperatingVoltage: string, ConstructionYear: string, Ratio: string, Shape: string, Dimension: string,
    InletPipeDia: string, OutletPipeDia: string, Material: string, SizeOfBed: string, RateOfFilteration: string, TypeOfFilterMedia: string, HydraulicTestPressure: string,
    Ampere: string, Ph: string, Cycle: string, FilterMediaDepth: string, LastPreventive: string, LastCorrective: string
  };
  assetowningList: Array<any>
  index: number;

  constructor(public api: ApiProvider, public _HTTP: HttpClient, public storage: Storage, public viewController: ViewController, public navCtrl: NavController, public navParams: NavParams) {

    this.assetowning = {
      Name: null,
      SoftTag: null,
      assetID: null,
      RFID: null,
      AssetTaggedNo: null,
      Model: null,
      SerialNo: null,
      Speed: null,
      Type: null,
      MakeBrand: null,
      Flow: null,
      Head: null,
      Medium: null,
      ManufactureYear: null,
      manufacturer_no: null,
      Voltage: null,
      Frequency: null,
      CurrentA: null,
      kWHp: null,
      PressureRating: null,
      WorkingPressure: null,
      DesignPressure: null,
      ShellThickness: null,
      Diameter: null,
      Weight: null,
      Capacity: null,
      LubricantGrease: null,
      EquipmentName: null,
      Span: null,
      Size: null,
      OperatingVoltage: null,
      ConstructionYear: null,
      Ratio: null,
      Shape: null,
      Dimension: null,
      InletPipeDia: null,
      OutletPipeDia: null,
      Material: null,
      SizeOfBed: null,
      RateOfFilteration: null,
      TypeOfFilterMedia: null,
      HydraulicTestPressure: null,
      Ampere: null,
      Ph: null,
      Cycle: null,
      FilterMediaDepth: null,
      LastPreventive: null,
      LastCorrective: null
    }
    this.assetowningList=[];
    this.data = this.navParams.get('params');
    console.log(this.data);
  }

  closeModal() {
    this.viewController.dismiss(null)
  }

  goToInspectionPage() {
    this.viewController.dismiss({ data: this.assetowning, type: 'inspect' })
  }

  // checkAssetName(Name: string) {
  //   return (Name == "Crane");
  // }



  ionViewDidLoad(): void {
    this.storage.get('ASSETOWNINGLIST').then(data => {
      let result: any = JSON.parse(data); 
      this.assetowningList = result.Actuator.concat(result.AirReceiver, result.Chlorinator, result.Compressor, result.Crane, result.Gearbox, result.Grinder, result.Motor, result.Pump, result.SandFilter, result.SurgeVessel, result.Tank, result.Valve);
      console.log(this.assetowningList)
      let index = this.assetowningList.findIndex(asset => asset.assetID == this.data.id);

      if (index >= 0) {
        console.log(this.assetowning)
        this.assetowning = this.assetowningList[index];
      } else {
        console.log('asset not found')
      }
    })



    // console.log(this.data.id);
    // this.api.getTechnicalSpect(this.data.id).then( res =>{
    //   let response:any = res;
    //   console.log(response);
    // })

  }
}
