import { Component, animate } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DashboardPage } from '../dashboard/dashboard';
import { RegisterPage } from '../register/register';
import { ProfilePage } from '../profile/profile';
import { PendingPage } from '../pending/pending';
import { AssetPage } from '../asset/asset';
import { InspectionPage } from '../inspection/inspection';
import { ListPage } from '../list/list';


/**
 * Generated class for the HomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  goToDashboard(){
    this.navCtrl.setRoot(DashboardPage, {}, {animate: true});
  }

  goToRegister(){
    this.navCtrl.setRoot(RegisterPage, {}, {animate: true});
  }

  goToProfile(){
    this.navCtrl.setRoot(ProfilePage, {}, {animate: true});
  }

  goToPending(){
    this.navCtrl.setRoot(PendingPage, {}, {animate: true});
  }

  goToAsset(){
    this.navCtrl.setRoot(AssetPage, {}, {animate: true});
  }

  goToInspection(){
    this.navCtrl.setRoot(InspectionPage, {}, {animate: true});
  }

  goToList(){
    this.navCtrl.setRoot(ListPage, {}, {animate: true})
  }

}
