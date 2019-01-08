import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
// import { HomePage } from '../home/home';



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  userInfo: { username: string, password: string }
  constructor(private loadingController: LoadingController, public navCtrl: NavController, public navParams: NavParams, public user: UserProvider) {
    this.userInfo = { username: null, password: null };
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  doLogin() {
    const loading = this.loadingController.create({
      duration: 1500
    });
    loading.present();
    this.user.login(this.userInfo);
    //this.navCtrl.setRoot(HomePage, {}, {animate: true});
  }

  forgotPassword() {

  }

}
