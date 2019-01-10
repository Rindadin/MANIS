import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import { Storage } from '@ionic/storage';



@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  user: {
    Username?: string, 
    LastName?: string, 
    Dept?: string, 
    Designation?: string, 
    Email?: string, 
    OfficeNo?: string,
  };
  constructor(public storage: Storage, public loadingController: LoadingController, public navCtrl: NavController, public navParams: NavParams, protected userProvider: UserProvider) {
    this.user = {
      Username: null, 
      Email: null,
      OfficeNo: null,
      Dept: null,
      LastName: null
    };
  }

  ionViewDidLoad() {
    //console.log('ionViewDidLoad ProfilePage');
    // const loading = this.loadingController.create({
    //   spinner: 'circles'
    // });
    //loading.present();
    this.storage.get("USER").then(data => {
      this.user = JSON.parse(data)
    })
  }

}
