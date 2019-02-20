import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
// import {GoogleMaps} from '@ionic-native/google-maps';
import { MyApp } from './app.component';
import { DashboardPage } from '../pages/dashboard/dashboard';
import { RegisterPage } from '../pages/register/register';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserProvider } from '../providers/user/user';
import { ApiProvider } from '../providers/api/api';
import { LoginPageModule } from '../pages/login/login.module';
import { HttpClientModule } from '@angular/common/http';
import { ProfilePageModule } from '../pages/profile/profile.module';
import { ChartsModule } from 'ng2-charts';
import { IonicStorageModule } from '@ionic/storage';
import { AssetPageModule } from '../pages/asset/asset.module';
import { PendingPageModule } from '../pages/pending/pending.module';
import { HomePageModule } from '../pages/home/home.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { Camera } from '@ionic-native/camera';
import { InspectionPageModule } from '../pages/inspection/inspection.module';
import { OneSignal } from '@ionic-native/onesignal';
import { ListPageModule } from '../pages/list/list.module';
import { Geolocation } from '@ionic-native/geolocation';
import { NotificationPageModule } from '../pages/notification/notification.module';
import { InspectlistPageModule } from '../pages/inspectlist/inspectlist.module';
import { NgxQRCodeModule } from 'ngx-qrcode2';
import { BarcodeScanner } from '@ionic-native/barcode-scanner';




@NgModule({
  declarations: [
    MyApp,
    DashboardPage,
    RegisterPage,
    
   
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    ProfilePageModule,
    InspectionPageModule,
    ListPageModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    ChartsModule,
    IonicStorageModule.forRoot(),
    AssetPageModule,
    PendingPageModule,
    HomePageModule,
    NgxDatatableModule,
    NotificationPageModule,
    InspectlistPageModule
    

  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DashboardPage,
    RegisterPage,
    
  ],
  providers: [
    StatusBar,
    SplashScreen, 
    Camera,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserProvider,
    ApiProvider,
    OneSignal,
    Geolocation,
    // GoogleMaps
    BarcodeScanner,
    NgxQRCodeModule
  
  ]
})
export class AppModule {}
