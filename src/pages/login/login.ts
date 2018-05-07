import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { StarterPage } from '../starter/starter';
import { FormPage } from '../form/form';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string ="dfgdf";
  password: string ="fgdg";

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, public platform: Platform) {
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
      this.navCtrl.push(StarterPage, {
        username: this.username,
        password: this.password
      });
    } else {
      this.showAlert('Error', 'Invalid Username');

    }  
  }

  private backButtonClick(){
    let confirm = this.alertCtrl.create({
      title: 'ចាកចេញ​ពីទំព័រនេះ?​',
      subTitle: '',
      buttons: [
        {
          text: 'បោះបង់',
          role: 'calcel'
        }, {
          text: 'ចាកចេញ',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();

  }

  private exitButtonClick() {
    let alert = this.alertCtrl.create({
      title: 'ចាកចេញ',
      message: 'តើ​អ្នក​ពិត​ជា​ចង់​ចាក​ចេញ​ពី​កម្មវិធី​នេះ?​',
      buttons: [
        {
          text: "ទេ",
          role: 'cancel'
        },
        {
          text: "បាទ​ / ចាស",
          handler: () => {
            this.platform.exitApp();
          }
        },
      ]
    });
    alert.present();
  }
} 




