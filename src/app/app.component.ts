import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { RegisterPage } from '../pages/register/register';
import { UserProvider } from '../providers/user/user';
import { PendingPage } from '../pages/pending/pending';
// import { AssetPage } from '../pages/asset/asset';
// import { InspectionPage } from '../pages/inspection/inspection';
import { OneSignal } from '@ionic-native/onesignal';
import { ListPage } from '../pages/list/list';
import { Storage } from '@ionic/storage';
import { NotificationPage } from '../pages/notification/notification';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = 'LoginPage';
  isLoggedIn: boolean = false;
  pages: Array<{ title: string, component: any, icon: string }>;

  constructor(private storage: Storage, private oneSignal: OneSignal, public user: UserProvider, public events: Events, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();
    //this.storage.clear();
    //used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage, icon: 'home' },
      { title: 'Dashboard', component: DashboardPage, icon: 'aperture' },
      { title: 'Profile', component: 'ProfilePage', icon: 'person' },
      // { title: 'Asset Status', component: AssetPage, icon: 'done-all'},
      { title: 'Asset List', component: ListPage, icon: 'list' },
      { title: 'Asset Registration', component: RegisterPage, icon: 'clipboard' },
      // { title: 'Asset Inspection', component: InspectionPage, icon: 'md-create' },
      { title: 'Pending Sync', component: PendingPage, icon: 'refresh' },
      { title: 'Notification', component: NotificationPage, icon: 'notifications' }


    ];
    this.listenToLoginEvents();
  }

  initializeApp() {

    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.oneSignal.startInit('14ab8625-efd9-4b39-b071-2e51809d5334', '1071403410139');

      this.oneSignal.getIds().then((data) => {
        //alert(JSON.stringify(data))
      }, err => {
        //alert(JSON.stringify(err))
      });
      this.oneSignal.endInit();

    });
  }

  logout() {
    console.log('logout now');
    this.user.logout();
  }

  shouldShow() {
    return this.isLoggedIn;
  }


  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  listenToLoginEvents() {

    this.events.subscribe('user:login', () => {
      localStorage.setItem('hasLoggedIn', JSON.stringify(true));
      //this.setProfile();
      //this.enableMenu(true);
      this.isLoggedIn = true;
      this.nav.setRoot(HomePage, {}, {animate: true});
    });

    this.events.subscribe('user:signup', () => {
      //this.enableMenu(true);
    });

    this.events.subscribe('user:logout', () => {
      // localStorage.setItem('hasLoggedIn', JSON.stringify(false));
      //this.enableMenu(false);
      console.log('logout');
      this.isLoggedIn = false;
      this.nav.setRoot('LoginPage', {}, { animate: true });
    });
  }
}
