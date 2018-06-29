import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DatabaseProvider } from "../../providers/database/database";
import {HomePage} from "../home/home";
import { HelpersProvider } from '../../providers/helpers/helpers';

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


  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public db: DatabaseProvider,
    public helpers: HelpersProvider) {

    this.getUser();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LeaderboardPage');
  }
  goToLeaderBoard(){

  }
  // goToHomePage() {
  //   this.navCtrl.push(
  //       HomePage);
  // }
  getUser(){
    console.log(this.db)

    let userDataLS = localStorage.getItem('userData');
    console.log('User ID***** = ',userDataLS);
    let usr_id = JSON.parse(userDataLS).id;
    console.log('ID=',usr_id);

    this.db
        .executeSQL(`SELECT * FROM user_quizzes WHERE user_id=`+ usr_id)  
        .then(res => {
          console.log('Data',res);
          this.user_quizzes = [];
        
          for (var i = 0; i<res.rows.length; i++){
            this.user_quizzes.push({
              
              user_id:res.rows.item(i).user_id,
              score:res.rows.item(i).score
      
            })
          }
        }).catch(e => console.log(e));
  }

  getScoreForLeaderboard()
  {
    this.helpers.postData
  }

}
