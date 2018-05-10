import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { FormPage } from '../form/form';
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

    //           fb.getLoginStatus()
    // .then(res => {
    //   console.log(res.status);
    //   if(res.status === "connect") {
    //     this.isLoggedIn = true;
    //   } else {
    //     this.isLoggedIn = false;
    //   }
    // })
    // .catch(e => console.log(e));


  }


  // getFbData(){
  //   this.fb.login(['public_profile', 'user_friends', 'email'])
  //   .then(res => {
  //     if(res.status === "connected") {
  //       this.isLoggedIn = true;
  //       this.getUserDetail(res.authResponse.userID);
  //     } else {
  //       this.isLoggedIn = false;
  //     }
  //   })
  //   .catch(e => console.log('Error logging into Facebook', e));
  // }

  getUserDetail(userid) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture",["public_profile"])
    
      .then(res => {
        
        console.log(res);
        this.users = res;
      })
      .catch(e => {
        console.log(e);
      });
    } 

  fbForm(){

    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then(res => {
      if(res.status === "connected") {
        this.isLoggedIn = true;
        this.toast.show('Successful!','5000', 'center').subscribe(toast => {
          this.navCtrl.push(FormPage);
  
       });
        //this.getUserDetail(res.authResponse.userID);
      } else {
        this.isLoggedIn = false;
        console.log("Fail!");
      }
      // .then(res => {
      
     })
    .catch(e => console.log('Error logging into Facebook', e));
    
      // this.fb.login(['public_profile', 'user_friends', 'email'])
      //     .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
      //     .catch(e => console.log('Error logging into Facebook', e));


      // this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);

     
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
