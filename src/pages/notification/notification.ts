import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ApiProvider } from '../../providers/api/api';
import { ListPage } from '../list/list';

@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {
  notifications: Array<any>;

 

  itemSelected(item: string) {
    console.log("Selected Item",item);

  }

  constructor( public loadingCtrl: LoadingController, public api:ApiProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  goToList(){
    this.navCtrl.setRoot(ListPage, {}, {animate: true})
  }

  ionViewDidLoad() {
    let loading = this.loadingCtrl.create({
      spinner: 'circles',
      content: 'Please Wait..'
    });
    loading.present();
    this.api.getNotification().then(res => {
      loading.dismiss();
      let result: any = res;
      console.log(result);
      this.notifications = result.notifications;
    }).catch (err => {
      console.log(err)
      loading.dismiss();
    });
    
  }

  getDateTime(time){

    let dateTime = new Date(time*1000);
    return dateTime.toLocaleString();

  }

}
