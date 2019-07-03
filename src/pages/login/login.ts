import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userInfo: { username: string, password: string }
  constructor(public events:Events,  private loadingController: LoadingController, public navCtrl: NavController, public navParams: NavParams, public user: UserProvider) {
    this.userInfo = { username: null, password: null };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin() {
    this.user.login(this.userInfo);
    // this.navCtrl.setRoot(HomePage, {}, {animate: true});
    // this.events.publish('user:login'); 
  }

  forgotPassword() {

  }

}
