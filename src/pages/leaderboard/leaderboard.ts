import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from "../../providers/database/database";
import {HomePage} from "../home/home";
import { HelpersProvider } from '../../providers/helpers/helpers';
import { BROWSER_ANIMATIONS_PROVIDERS } from '@angular/platform-browser/animations/src/providers';

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

  leaderboard: string = "School";
  user_quizzes: any = [];
  userId : number;
  user_scores =[];
  total_scores_national =[];
  total_scores_province =[];
  total_scores_district =[];
  total_scores_school =[];
  total_scores_fb =[];


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public db: DatabaseProvider,
    public helpers: HelpersProvider) {

    this.userId = JSON.parse(localStorage.getItem("userData")).id;
    console.log('ID = ',this.userId);
    
    // this.getScoreLevel(2);
    //this.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaderboardPage');
    this.getScoreForLeaderboard();
  }
  goToLeaderBoard(){

  }
  // goToHomePage() {
  //   this.navCtrl.push(
  //       HomePage);
  // }
  getUser(){
    console.log(this.db)
    // console.log(this.userId);
    let userDataLS = localStorage.getItem('userData');
    console.log('User ID***** = ',userDataLS);
    let usr_id = JSON.parse(userDataLS).id;
    console.log('ID=',usr_id);

    this.db
        .executeSQL(`SELECT * FROM user_quizzes WHERE user_id=${usr_id}`)  
        .then(res => {
          // console.log('Data',res.rows.item(0));
          this.user_quizzes = [];
        
          for (var i = 0; i<res.rows.length; i++){
            this.user_quizzes.push({
              
              user_id: res.rows.item(i).user_id,
              score: res.rows.item(i).score
      
            })
          }
        }).catch(e => console.log(e));
  }

  public getScoreForLeaderboard()
  {
    var dataPosted={"user_id":this.userId};
    this.helpers.postData(dataPosted,"leader_board_app")
    //var dataPosted = {"fb_id" : "104874973720343"};
    //this.helpers.postData(dataPosted,"check_fb_id")
    .then((resultTotalScores) => {
      console.log('result = '+JSON.stringify(resultTotalScores));
      console.log('parse JSON of code = '+JSON.parse(resultTotalScores["code"]));
      if(JSON.parse(resultTotalScores["code"])==200)
      {
        /* var res_user_scores = JSON.parse(result[leaderboard_type]);
        for(let i=0; i<res_user_scores.length(); i++){
          this.user_scores_fb.push(res_user_scores[i]);
        } */
        console.log('parse JSON of school = '+resultTotalScores["school"]);
        
        this.total_scores_school = resultTotalScores["school"];
        this.total_scores_national = resultTotalScores["national"];
        this.total_scores_province = resultTotalScores["province"];
        this.total_scores_district = resultTotalScores["district"];
        this.total_scores_fb = resultTotalScores["fb"];
        this.user_scores = this.total_scores_school;
        console.log("this.user_scores ="+this.user_scores);
        
      } 
      
    })
    .catch((e) => {
      console.log('Catch in getScoreForLeaderboard:' + JSON.stringify(e));
    });
  }

  public getScoreLevel(scoreLevel: number)
  {
    console.log("scoreLevel = "+scoreLevel);
    
    switch(scoreLevel)
    {
      case 1:
        this.user_scores = this.total_scores_fb;
      break;

      case 2:
        this.user_scores = this.total_scores_school;
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
    console.log("user_score = "+this.user_scores);
  }

}
