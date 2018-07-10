import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Network } from '@ionic-native/network';
import { FormPage } from '../form/form';
import { HelpersProvider } from '../../providers/helpers/helpers';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  total_score: any;
  user_data: any;
  gender: string;
  school_name: string;
  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private alertCtrl: AlertController,
      private platform: Platform,
      public dbProvider:DatabaseProvider,
      public network: Network,
      public helpers: HelpersProvider
  ) {
    this.total_score = localStorage.getItem('Score');
    this.user_data = JSON.parse(localStorage.getItem('userData'));
    console.log("user_data = "+JSON.stringify(this.user_data));
    if(this.user_data.gender == "2"){
      this.gender = "ស្រី";
    } else this.gender ="ប្រុស";
    this.getSchoolName(this.user_data.school_id);


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    console.log('user ='+this.user_data);
  }
  backButtonClick() {
    this.navCtrl.pop();
  }
  exitButtonClick() {
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

  getUserProfile(){
    this.user_data = JSON.stringify(localStorage.getItem('userData'));
  }
  /**Get all schools of district
   * 
   */
  getSchoolName(school_id){
    this.dbProvider.executeSQL(`SELECT school_name FROM school_lists WHERE school_id=${school_id}`)
        .then(res => {
          for (var i = 0; i<res.rows.length; i++){
            this.school_name = res.rows.item(i).school_name
          }    
        }).catch(e => console.log(e));
  }

  public editProfile() {
    if(this.network.type != 'none')
    {
      this.navCtrl.push(FormPage);
    }
    else
    {
      this.helpers.presentToast("មិនមានសេវាអ៊ិនធឺណិតទេ");
    }
  }
}
