import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { FormPage } from '../form/form';
import { MyApp } from '../../app/app.component';
import { LoginPage } from '../login/login';
import { FacebookPage } from '../facebook/facebook';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  public infoID;
  isLoggedIn:boolean = false;
  users: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public alertCtrl: AlertController, 
              public platform: Platform, 
              private fb: Facebook,
              private toast: Toast) {  typeof this.navParams.get('infoID') == 'undefined' ? this.infoID = 'root' : this.infoID = this.navParams.get('infoID');


  }

  /*Funtion connect to facebook users*/

  fbForm(){

    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then(res => {
      if(res.status === "connected") {
        this.isLoggedIn = true;
        this.toast.show('Successful!','5000', 'center').subscribe(toast => {});
        this.getUserDetail(res.authResponse.userID);
      } else {
        this.isLoggedIn = false;
        console.log("Fail!");
       
      }
      
     })
    .catch(e => console.log('Error logging into Facebook', e));
    
     
  }


  /**Get data from facebook and push data to form page
   * 
  */
  getUserDetail(userid) {
    const me = this;
    this.fb.api("/"+userid+"/?fields=id,email,name,picture",["public_profile"])
    
      .then(res => {
        console.log(res);
        this.navCtrl.push(FormPage, {data:res});
        
      })
      .catch(e => {
        console.log(e);
      });
    } 
  

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  public info(id) {
    this.navCtrl.push(
      WelcomePage, {
        infoID: id
    });
  }

  public createForm(){
    this.navCtrl.push(FormPage);
  }

  public login(){
    this.navCtrl.push(LoginPage);
  }

  public backButtonClick() {
    this.navCtrl.pop();
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
