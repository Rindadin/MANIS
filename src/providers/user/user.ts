import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/share';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';
import { Events, AlertController, LoadingController } from 'ionic-angular';
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
    constructor(public loadingController: LoadingController, public api: ApiProvider, protected events: Events, public alertCtrl: AlertController, public http: HttpClient, public storage: Storage) {
    this._type = 'normal';

  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    const loading = this.loadingController.create({
      spinner: 'circles'
    });
    loading.present();
    this.api.doLogin(accountInfo).then(data => {
      let res: any = data
      console.log(res);
      if (res.api_token) { // if login success
        console.log(res.access_token)
        this.storage.set('TOKEN', res.api_token).then(() =>{
          this.getProfile(res.ID).then(res => {
            let response: any = res;
            let user = response.feedData[0];
            console.log('user: ',user);
            this.storage.set('USER', JSON.stringify(user));
            this.api.getDashboard().then(res2 => {
              loading.dismiss();
              let response: any = res2;
              this.storage.set('DASHBOARD', JSON.stringify(response)).then(()=>{
                this.events.publish('user:login');
              })
              
            }), err => {
              console.log(JSON.stringify(err))
            }
  
          }, err => {
            console.log(JSON.stringify(err))
            loading.dismiss();
          })
        });
       
      } else {
        loading.dismiss();
        const alert = this.alertCtrl.create({
          title: 'Token not found!',
          buttons: ['OK']
        });
        alert.present();
      }
    }, err => {
      loading.dismiss();
      const alert = this.alertCtrl.create({
        title: 'Invalid username or password!',
        buttons: ['OK']
      });
      alert.present();
      //alert(JSON.stringify(err));
    })

  }

  hasLoggedIn() {

    // return this.storage.get(this.HAS_LOGGED_IN).then((value) => {
    //   return value === true;
    // });

  }

  getProfile(id: any) {
    let url = this.baseURL + '/user/' + id;
    console.log(url);
    return new Promise((resolve, reject) => {
      this.storage.get('TOKEN').then(data => {

        this.token = data;
        console.log('token ', this.token)
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
            console.log(response)
            resolve(response);
          }, err => {
            reject(err);
          })

      })
    })
  }

  logout() {
    let url = this.baseURL + '/logout';
    let body = {};
    return new Promise((resolve, reject) => {
      this.storage.get('TOKEN').then(token => {
        let _headers = new HttpHeaders({
          'Authorization': token
        })
        this.http.post(url, JSON.stringify(body), { headers: _headers })
          .subscribe(response => {
            resolve(response)
          }, err => {
            reject(err);
          })

      })
    })
  }


  userType() {
    return this._type;
  }

  setUserType(type) {
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
  logout_old() {
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
