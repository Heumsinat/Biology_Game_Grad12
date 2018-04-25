import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { FormPage } from '../form/form';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
/*@Component({
  template:`
    <ion-item>
      <ion-label>Athelas</ion-label>
      <ion-radio value="Athelas"></ion-radio>
    </ion-item>
    <ion-item>
      <ion-label>Charter</ion-label>
      <ion-radio value="Charter"></ion-radio>
    </ion-item>
  `
})*/

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string ="";
  password: string ="";

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  showAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  public signin(){
    if(/^[a-zA-Z0-9]+$/.test(this.username+this.password)){
      this.navCtrl.push(HomePage, {
        username: this.username,
        password: this.password
      });
    } else {
      this.showAlert('Error', 'Invalid Username');

    }  
  }
} 




