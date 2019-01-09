import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the ApiProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ApiProvider {
  baseURL: string = 'http://demo.amisapi.com.ngrok.io/api/v1';

  constructor(public http: HttpClient) {
    console.log('Hello ApiProvider Provider');
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

}
