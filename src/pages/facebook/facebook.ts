import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { WelcomePage } from "../welcome/welcome";

/**
 * Generated class for the FacebookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-facebook',
  templateUrl: 'facebook.html',
})
export class FacebookPage {

  isLoggedIn:boolean = false;
  users: any;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public fb: Facebook) { this.getFbData();
  }



  getFbData(){
    this.fb.login(['public_profile', 'user_friends', 'email'])
    .then(res => {
      if(res.status === "connected") {
        this.isLoggedIn = true;
        this.getUserDetail(res.authResponse.userID);
      } else {
        this.isLoggedIn = false;
      }
    })
    .catch(e => console.log('Error logging into Facebook', e));
  }

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
  

  logout(){
    this.fb.logout()
    .then( res => this.isLoggedIn = false)
    .catch(e => console.log('Error logout from Facebook', e));
    this.navCtrl.push(WelcomePage);

  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad FacebookPage');
  }

}
