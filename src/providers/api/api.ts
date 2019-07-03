import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { FormArray } from '@angular/forms';


@Injectable()
export class ApiProvider {
  assetSync: { ID: number, assetID: string, RFID: string };
  assetinspectList:Array<any>;
  baseURL: string = 'http://demo.amisapi.com.ngrok.io/api/v1';
  // baseURL: string = 'http://wams.airb.ngrok.io/api/v1';

  token: string;

  constructor(public storage: Storage, public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
   
    // this.assetSync = {
    //   ID: 8,
    //   assetID: "WATR-0000200",
    //   RFID: "123456"
    // };

    // this.storage.get('ASSETINSPECT_LIST').then((val) =>{

    //   if (val) {
    //     this.assetinspectList = JSON.parse(val);
    //     console.log("value",val);
    //   } else {
    //     this.assetinspectList = [];
    //   }
    // })

  }

  getNotification() {
    let url = 'https://onesignal.com/api/v1/notifications?app_id=14ab8625-efd9-4b39-b071-2e51809d5334'
    let _headers = new HttpHeaders({
      'Authorization': 'Basic YTc0OTllNTgtYTEyNi00ODgyLWEyZjMtNDk3NmIzMTFjZDI5'
    })
    return new Promise((resolve, reject) => {
      this.http.get(url, { headers: _headers })
        .subscribe(response => {
          resolve(response)
        }, err => {
          reject(err);
        })
    })
  }

  getDashboard() {
    let url = this.baseURL + '/dashboard';
    return new Promise((resolve, reject) => {
      this.storage.get('TOKEN').then(data => {

        this.token = data;
        console.log('token', this.token)
        // let _headers = new HttpHeaders({
        //   'Authorization': this.token
        // })
        // let _headers = new HttpHeaders();
        // _headers.set('Accept', 'text/javascript');
        // _headers.set('Authorization', 'dzczSml3SmRnQ3JXWkZCV3Y1SEZmU0Y2a2E3RDdZU2Z6b29hZlJZTXVscUhYNEhkVjMyb1M2STFqM0NH5c34b890add40');
        const httpOptions = {
          headers: new HttpHeaders().append('Authorization', this.token)
        };
        this.http.get(url, httpOptions)
          // console.log(url)
          // this.http.get(url)
          .subscribe(response => {
            // console.log(response)
            resolve(response);
          }, err => {
            reject(err);
          })

      })
    })
  }

  getTechnicalSpect(assetID: any) {
    let url = this.baseURL + '/assetQRCODE/'+assetID;
    return new Promise((resolve, reject) => {
      this.storage.get('TOKEN').then(data => {

        this.token = data;
        console.log('token', this.token)
        // let _headers = new HttpHeaders({
        //   'Authorization': this.token
        // })
        // let _headers = new HttpHeaders();
        // _headers.set('Accept', 'text/javascript');
        // _headers.set('Authorization', 'dzczSml3SmRnQ3JXWkZCV3Y1SEZmU0Y2a2E3RDdZU2Z6b29hZlJZTXVscUhYNEhkVjMyb1M2STFqM0NH5c34b890add40');
        const httpOptions = {
          headers: new HttpHeaders().append('Authorization', this.token)
        };
        this.http.get(url, httpOptions)
          // console.log(url)
          // this.http.get(url)
          .subscribe(response => {
            // console.log(response)
            resolve(response);
          }, err => {
            reject(err);
          })

      })
    })

  }

  isEmpty(obj: any) {
    for (var key in obj) {
      if (obj.hasOwnProperty(key))
        return false;
    }
    return true;
  }

  getAssetAll() {
    let url = this.baseURL + '/assetAll';
    return new Promise((resolve, reject) => {
      this.storage.get('TOKEN').then(data => {

        this.token = data;
        console.log('token', this.token)
        // let _headers = new HttpHeaders({
        //   'Authorization': this.token
        // })
        // let _headers = new HttpHeaders();
        // _headers.set('Accept', 'text/javascript');
        // _headers.set('Authorization', 'dzczSml3SmRnQ3JXWkZCV3Y1SEZmU0Y2a2E3RDdZU2Z6b29hZlJZTXVscUhYNEhkVjMyb1M2STFqM0NH5c34b890add40');
        const httpOptions = {
          headers: new HttpHeaders().append('Authorization', this.token)
        };
        this.http.get(url, httpOptions)
          // console.log(url)
          // this.http.get(url)
          .subscribe(response => {
            console.log('asset',JSON.stringify(response))
            resolve(response);
          }, err => {
            console.log('err get asset',JSON.stringify(err))
            reject(err);
          })
          

      })
    })


  } 
  

  doLogin(accountInfo: any) {
    let url = this.baseURL + '/login';
    let body = new FormData();

    body.append('Username', accountInfo.username);
    body.append('Password', accountInfo.password);
  
    // let _headers = new HttpHeaders({
    //   'Authorization': 'Basic YTc0OTllNTgtYTEyNi00ODgyLWEyZjMtNDk3NmIzMTFjZDI5'
    // })
    
    return new Promise((resolve, reject) => {
      
      this.http.post(url, body)
        .subscribe(response => {
          resolve(response)
        }, err => {
          reject(err);
        })

    })
  }

  postData(assetInfo: any) {
    console.log(assetInfo);
    let url = this.baseURL + '/regRFID';
    let body = new FormData();

    let data = JSON.stringify(assetInfo);
    console.log(data);
    body.append('data', data);

    return new Promise((resolve, reject) =>{
      this.storage.get('TOKEN').then(data => {
        this.token = data;
        console.log('token', this.token);

        const httpOptions = {
          headers: new HttpHeaders().append('Authorization', this.token)
        };

        this.http.post(url, body, httpOptions)
        .subscribe(response =>{
          resolve(response)
        }, err =>{
          reject(err);
        })

      })
    })
  }

  postTheData(assetInfo:any){
    console.log(assetInfo);

    // this.postData(assetInfo).then(data =>{
    //   let res:any = data
    //   console.log(res);
    // })
  }

}
