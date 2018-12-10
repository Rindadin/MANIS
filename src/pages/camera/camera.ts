import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-camera',
  templateUrl: 'camera.html',
})
export class CameraPage {
  myphoto: any;
  imageData: any
  public date: string = new Date().toISOString();
  constructor(public camera: Camera, public viewController: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    let data = this.navParams.get('params');
    this.imageData = {id: null, photo: null, title: null, description: null, dateCaptured: this.date, dateUploaded: this.date}
    if(data.type == 'new'){
      let id = data.id;
      this.imageData.id = id;
    }
  }

  closeModal() {
    if(this.imageData.photo && this,this.imageData.title){
      this.viewController.dismiss(this.imageData)
    } else {
      alert('Please upload an image and enter a title');
    }
  }

  dismiss() {
    this.viewController.dismiss(null)
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 50,
      targetHeight: 600,
      targetWidth: 800,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }

    this.camera.getPicture(options).then((imageData) => {
      // imageData is either a base64 encoded string or a file URI
      // If it's base64 (DATA_URL):
       this.myphoto = 'data:image/jpeg;base64,' + imageData;
      //this.myphoto = imageData;
      this.imageData.photo = imageData;
    }, (err) => {
      // Handle error
    });
  }

  ionViewDidLoad() {
   // console.log('ionViewDidLoad CameraPage');
  }

}
