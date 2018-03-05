import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {QuestionPage} from "../question/question";
import {QuizPage} from "../quiz/quiz";
import {HomePage} from "../home/home";

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }
  goToHomePage() {
    this.navCtrl.push(
        HomePage)
  }
  goToQuiz(){
    this.navCtrl.push(
        QuizPage);
  }

}
