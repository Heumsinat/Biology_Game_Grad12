import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from "../../providers/database/database";
import {HomePage} from "../home/home";
import { HelpersProvider } from '../../providers/helpers/helpers';
import { BROWSER_ANIMATIONS_PROVIDERS } from '@angular/platform-browser/animations/src/providers';
import { Network } from '@ionic-native/network';
import { DomSanitizer } from '@angular/platform-browser';
import { Base64 } from '@ionic-native/base64';
import async from 'async';

/**
 * Generated class for the LeaderboardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-leaderboard',
  templateUrl: 'leaderboard.html',
})
export class LeaderboardPage {

  leaderboard: string = "តារាងពិន្ទុ";
  user_quizzes: any = [];
  userId : number;
  user_scores = [];
  total_scores_national = [];
  total_scores_province = [];
  total_scores_district = [];
  total_scores_school = [];
  total_scores_fb = [];
  pic_profile: string="";


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public db: DatabaseProvider,
    public helpers: HelpersProvider,
    public network: Network,
    private sanitizer: DomSanitizer,
    public base64: Base64) {

    this.userId = JSON.parse(localStorage.getItem("userData")).id;
    console.log('ID = ',this.userId);
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaderboardPage');
    if(this.network.type != 'none')
    {
      this.getScoreForLeaderboard();
    }
  }
  
  goToLeaderBoard(){

  }

  public getScoreForLeaderboard()
  {
    var dataPosted={"user_id":this.userId};
    this.pic_profile ="assets/img/profile.png";
    this.helpers.postData(dataPosted,"leader_board_app")
    //var dataPosted = {"fb_id" : "104874973720343"};
    //this.helpers.postData(dataPosted,"check_fb_id")
    .then((resultTotalScores) => {
      //console.log('result = '+JSON.stringify(resultTotalScores));
      //console.log('parse JSON of code = '+JSON.parse(resultTotalScores["code"]));
      if(JSON.parse(resultTotalScores["code"])==200)
      {
        //console.log('parse JSON of school = '+resultTotalScores["school"]);
        
        this.total_scores_school = resultTotalScores["school"];
        this.total_scores_national = resultTotalScores["national"];
        this.total_scores_province = resultTotalScores["province"];
        this.total_scores_district = resultTotalScores["district"];
        this.total_scores_fb = resultTotalScores["fb"];
        this.user_scores = this.total_scores_school;
   /*      if(resultTotalScores["school"].photo!="")
          this.pic_profile = "data:image/*;base64, "+ resultTotalScores["fb"].photo;
        console.log("this.user_scores photo =");
        console.log(resultTotalScores["fb"].photo);
    */     
      } 
      
    })
    .catch((e) => {
      console.log('Catch in getScoreForLeaderboard:' + JSON.stringify(e));
    });
  }

  public getScoreLevel(scoreLevel: number)
  {
    var self = this;
    console.log("scoreLevel = "+scoreLevel);
    if(this.network.type != 'none')
    {
      this.user_scores = null;
      switch(scoreLevel)
      {
        
        case 1:
          this.user_scores = this.total_scores_fb;
          console.log("FB" , JSON.stringify(this.user_scores));
        break;

        case 2:
          this.user_scores = this.total_scores_school;
          console.log("SCHOOL" , JSON.stringify(this.user_scores));
        break;

        case 3:
          this.user_scores = this.total_scores_national;
        break;

        case 4:
          this.user_scores = this.total_scores_province;
        break;

        case 5:
          this.user_scores = this.total_scores_district;
        break;
      }
    }
    else
    {
      this.helpers.presentToast("មិនមានសេវាអ៊ិនធឺណិតទេ");
    }
    
  }

}
