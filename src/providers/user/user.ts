import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/share';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';
import { Events, AlertController } from 'ionic-angular';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage';


/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class UserProvider {
  _user: any;
  _type: string;
  token: string = null;
  baseURL: string = 'http://demo.amisapi.com.ngrok.io/api/v1';
  constructor(public api: ApiProvider, protected events: Events, public alertCtrl: AlertController, public http: HttpClient, public storage: Storage) { 
    this._type = 'normal';
    
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    this.api.doLogin(accountInfo).then(data => {
      let res: any = data
      console.log(res);
      if(res.access_token){ // if login success
        this.storage.set('TOKEN', res.access_token);
        this.events.publish('user:login');
      } else {
        const alert = this.alertCtrl.create({
          title: 'Invalid username or password!',
          buttons: ['OK']
        });
        alert.present();
      }
    }, err => {
      alert(JSON.stringify(err));
    })
    
    // this.events.publish('user:login');

    //let seq = this.api.post('login', accountInfo).share();
    // let seq = this.api.post('login', accountInfo);
    // seq.subscribe((res: any) => {
    //   // If the API returned a successful response, mark the user as logged in
    //   if (res.status == 'success') {
    //     this._loggedIn(res);
    //   } else {
    //   }
    // }, err => {
    //   console.error('ERROR', err);
    // });

    // return seq;
  }

  hasLoggedIn(){
    
    // return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
    //   return value === true;
    // });
      
  }

  getProfile(id: any) {
    let url = this.baseURL + '/user/13';
    return new Promise((resolve, reject) => {
      this.storage.get('TOKEN').then(data => {

        this.token = data;
        console.log('token ', this.token)
        let _headers = new HttpHeaders({
          'Authorization': this.token
        })

        this.http.get(url, { headers: _headers })
        .subscribe(response => {
          resolve(response);
        }, err => {
          reject(err);
        })

      })
    })
  }


  userType(){
    return this._type;
  }

  setUserType(type){
    this._type = type;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    // // let seq = this.api.post('signup', accountInfo).share();
    // let seq = this.api.post('signup', accountInfo);
    // seq.subscribe((res: any) => {
    //   // If the API returned a successful response, mark the user as logged in
    //   if (res.status == 'success') {
    //     this._loggedIn(res);
    //   }
    // }, err => {
    //   console.error('ERROR', err);
    // });

    // return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    // this._user = null;
    // this.api.doLogout().then(res => {

    // }, err => {

    // })
    this.events.publish('user:logout');
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }



  
}
