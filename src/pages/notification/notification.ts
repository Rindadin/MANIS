import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  items = [
    'Please perform your asset inspection',
    'Your profile had been updated ',
    'Your asset inspection is due in 2 days',
    'The asset is still pending'


  ];

  itemSelected(item: string) {
    console.log("Selected Item",item);

  }

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  }

}
