import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {HomePage} from "../home/home";
import {QuizPage} from "../quiz/quiz";

/**
 * Generated class for the StarterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-starter',
  templateUrl: 'starter.html',
})
export class StarterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,private platform: Platform) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad StarterPage');
  }
  goToHomePage() {
    this.navCtrl.push(
        HomePage);
  }
  goToQuiz(){
    // TO-DO by Samak using API #4//
    // Send request from App to get the latest settings
    // If new settings != old setting, then Update new settings into table settings in App
    // ======END OF API #4 ======== //

    // TO-DO by Samak using API #6//
    // Send request from App with params: 1. total no. of records, 2. last downloaded date to get order quiz data from server
    // if total no. of records in order_questions == that of server,
    //  Server returns only the updated records recognized by in App modified_date, in Server updated_date
    // else => the total no. of records is different, then
    //  replace all records in App.
    // ======END OF API #4 ======== //
    this.navCtrl.push(
        QuizPage);
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

}
