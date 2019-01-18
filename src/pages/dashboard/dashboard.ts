import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
// import{ Chart } from 'chart.js';
import { ChartsModule } from 'ng2-charts';
import { ApiProvider } from '../../providers/api/api';
import { Storage } from '@ionic/storage';
// import {
//   GoogleMaps,
//   GoogleMap,
//   GoogleMapsEvent,
//   GoogleMapOptions,
//   CameraPosition,
//   MarkerOptions,
//   Marker,
//   Environment
// } from '@ionic-native/google-maps';


@Component({
  selector: 'page-dashboard',
  templateUrl: 'dashboard.html'
})
export class DashboardPage {
  public registered: number;
  public rejected: number;
  public validated: number;
  public verified: number;

  // map: GoogleMap;

  public doughnutChartLabels: string[] = ['registered', 'rejected', 'validated', 'verified'];
  public doughnutChartData: number[] = [null, null, null, null];
  public doughnutChartType: string = 'doughnut';

  // events
  public chartClicke(e: any): void {
    console.log(e);
  }

  public chartHovere(e: any): void {
    console.log(e);
  }
  constructor(public storage: Storage, public loadingCtrl: LoadingController, public api: ApiProvider, public navCtrl: NavController, public chart: ChartsModule) {
    this.registered = 0;
    this.rejected = 0;
    this.validated = 0;
    this.verified = 0;
  }
  getDashboardData() {

    this.storage.get('DASHBOARD').then(res => {

      let result2: any = res;
      let result = JSON.parse(result2);
      console.log(result);
      this.registered = result.registered;
      this.rejected = result.rejected;
      this.verified = result.verified;
      this.validated = result.validated;
      console.log(this.registered, this.rejected, this.verified,this.validated);
      this.doughnutChartData = [this.registered, this.rejected, this.verified, this.validated];

    }).catch(err => {
      console.log(err);
    });

  }


  ionViewDidLoad() {
    this.getDashboardData()
  }

  // loadMap() {

  //   // This code is necessary for browser
  //   Environment.setEnv({
  //     'API_KEY_FOR_BROWSER_RELEASE': '(your api key for `https://AIzaSyB6uMyYkMCtqpw6_87hN84aVJ4oCHU-kN4`)',
  //     'API_KEY_FOR_BROWSER_DEBUG': '(your api key for `http://AIzaSyB6uMyYkMCtqpw6_87hN84aVJ4oCHU-kN4`)'
  //   });

  //   let mapOptions: GoogleMapOptions = {
  //     camera: {
  //        target: {
  //          lat: 43.0741904,
  //          lng: -89.3809802
  //        },
  //        zoom: 18,
  //        tilt: 30
  //      }
  //   };

  //   this.map = GoogleMaps.create('map_canvas', mapOptions);

  //   let marker: Marker = this.map.addMarkerSync({
  //     title: 'Ionic',
  //     icon: 'blue',
  //     animation: 'DROP',
  //     position: {
  //       lat: 43.0741904,
  //       lng: -89.3809802
  //     }
  //   });
  //   marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
  //     alert('clicked');
  //   });

}








