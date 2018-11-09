import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: {name?: string, icNo?: string, address?: string, bankName?: string, bankAcc?: string, email: string, phoneNo?: string};
  savedBankAcc: string;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = {
      name: "Farhan Ramli", 
      icNo: "830217-89-003",
      address: "39-1 Jalan Dato Senu 26, Taman Dato Senu, 51000 Kuala Lumpur",
      bankName: "Maybank",
      bankAcc: "165520939293",
      email: "user@gmail.com",
      phoneNo: "+60120043324"
    };
    this.savedBankAcc = this.user.bankAcc;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }

}
