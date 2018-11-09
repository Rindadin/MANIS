import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';

/**
 * Generated class for the InspectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inspection',
  templateUrl: 'inspection.html',
})
export class InspectionPage {
  inspect:string;
  info:string;

  constructor( public modal: ModalController, public navCtrl: NavController, public navParams: NavParams) {
  }
  
  openModal() {
    const myModal = this.modal.create('CameraPage')

    myModal.present();
  }
  ionViewDidLoad() {
    this.info = 'general-info';
    this.inspect="general-info";

    console.log('ionViewDidLoad InspectionPage');
  }

}
