import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, ActionSheetController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';


@IonicPage()
@Component({
  selector: 'page-camera2',
  templateUrl: 'camera2.html',
})
export class Camera2Page {
  myphoto: any;
  imageData: {id: any, photo: any, title: string, description: string, dateCaptured: string, dateUploaded: string}
  public date: string = new Date().toLocaleString();
  constructor(public camera: Camera, 
    public viewController: ViewController, 
    public navCtrl: NavController, 
    public navParams: NavParams,
    public actionSheetCtrl: ActionSheetController) {
    let data = this.navParams.get('params');
    this.imageData = {id: null, photo: null, title: null, description: null, dateCaptured: this.date, dateUploaded: this.date}
    if (data.type == 'new'){
      let id = data.id;
      this.imageData.id = id;
    }
  }

  saveModal() {
    if(this.imageData.photo && this,this.imageData.title){
      this.viewController.dismiss(this.imageData)
    } else {
      alert('please upload an image and enter a title');
    }
  }

  closeModal() {
    this.viewController.dismiss(null)
  }

  async selectPhoto(){
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Get image from..',
      buttons: [
        {
          text: 'Camera',
          handler: () => {
            this.takePhoto(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: 'Photo Album',
          handler: () => {
            this.takePhoto(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            return;
          }
        }
      ]
    });
    await actionSheet.present();
  }

  takePhoto(sourceType: any) {
    const options: CameraOptions = {
      quality: 50,
      targetHeight: 600,
      targetWidth: 800,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType
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
    console.log('ionViewDidLoad Camera2Page');
  }

}
