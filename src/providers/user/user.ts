import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/share';
import { Injectable } from '@angular/core';
import { ApiProvider } from '../api/api';
import { Events } from 'ionic-angular';


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

  constructor(public api: ApiProvider, protected events: Events) { 
    this._type = 'normal';
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    this.events.publish('user:login');
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
    this._user = null;
    this.events.publish('user:logout');
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }



  
}
