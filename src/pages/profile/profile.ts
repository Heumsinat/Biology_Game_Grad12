import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { DatabaseProvider } from '../../providers/database/database';
import { Network } from '@ionic-native/network';
import { FormPage } from '../form/form';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePicker } from '@ionic-native/date-picker';
import moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { LocalNotifications } from '@ionic-native/local-notifications';

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
  pic_path: string;
  published : any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private alertCtrl: AlertController,
      private platform: Platform,
      public dbProvider:DatabaseProvider,
      public network: Network,
      public helpers: HelpersProvider,
      private sanitizer: DomSanitizer,
      private _DATE 	: DatePicker,
      public localNotifications: LocalNotifications,
      private translate: TranslateService
  ) {
    // To display score =0 instead of null, otherwise display real number
    var score = localStorage.getItem('Score');
    if(score == "null") this.total_score = 0;
    else this.total_score = localStorage.getItem('Score');
    this.user_data = JSON.parse(localStorage.getItem('userData'));
    console.log("user_data = "+JSON.stringify(this.user_data));
    // To display ស្រី or ប្រុស instead of 1 or 2 as Gender
    if(this.user_data.gender == "2"){
      this.gender = "ស្រី";
    } else this.gender ="ប្រុស";
    this.getSchoolName(this.user_data.school_id);
    // TO display picture from facebook or fix picture profile
    
    var fb_id = JSON.parse(localStorage.getItem("userData")).fb_id;
    if(fb_id != null)
    {
      // this.pic_path = "file:///data/user/0/kh.org.open.biology12/files/"+fb_id+".jpg";
      this.pic_path = JSON.parse(localStorage.getItem("userData")).photo;
    }
    else{
      this.pic_path = "";
    }


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
    console.log('user ='+this.user_data);
  }
  // To go back to quiz page
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

  /**Get school name  by given school id
   * 
   */
  getSchoolName(school_id){
    this.dbProvider.executeSQL(`SELECT school_name FROM school_lists WHERE school_id=${school_id}`)
        .then(res => {
          for (var i = 0; i<res.rows.length; i++){
            this.school_name = res.rows.item(i).school_name;
          }    
        }).catch(e => console.log(e));
  }

  // To redirect to Form Register to update user profile
  public editProfile() {
    if(this.network.type != 'none')
    {
      // {data: 2} => means updating user register
      this.navCtrl.push(FormPage, {data:2});
    }
    else
    {
      this.helpers.presentToast("មិនមានសេវាអ៊ិនធឺណិតទេ");
    }
  }

  
  /**
 * Select a date/time
 *
 * @public
 * @method selectDateForScheduling
 * @return {None}
 */
  public editNotification() : void
  {
    this._DATE.show(
    {

        date 			       : new Date(),
        mode 			       : 'time',
        androidTheme 	       : this._DATE.ANDROID_THEMES.THEME_DEVICE_DEFAULT_LIGHT,
        allowOldDates        : false,
        allowFutureDates     : true,
        is24Hour: false
    })
    .then((date_time : any) =>
    {
        let hhMM = moment(date_time).format('HH:mm');
        localStorage.setItem('timeNotify',hhMM);
        let hhMMs = hhMM.split(':');
        this.translate.get('notifyString').subscribe(val => {
          this.helpers.setNotificationSchedule(val,Number(hhMMs[0]),Number(hhMMs[1]),this.localNotifications);
        });
    })
    .catch((err) =>
    {
        console.log('Error', err);
    });
    }
}
