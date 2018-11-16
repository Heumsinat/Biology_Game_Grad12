import { Component,  ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import { DomSanitizer } from '@angular/platform-browser';

/**
 * Generated class for the LevelBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-level-board',
  templateUrl: 'level-board.html',
})
export class LevelBoardPage {
   @ViewChild('content') content:any;

  levels: any = [
    {'bg' : 'rgba(0, 128, 0, 0.966)'},
    {'bg' : 'skyblue'},
    {'bg' : 'blue'},
    {'bg' : 'lightseagreen'},
    {'bg' : 'lightgreen'},
    {'bg' : 'lightcyan'},
    {'bg' : 'blue'},
    {'bg' : 'rgb(21, 248, 21)'},
  ];
  position: any = [
    {'left' : '50px'},
    {'left' : '500px'},
    {'left' : '300px'},
    {'left' : '100px'},
    {'left' : '200px'},
    {'left' : '400px'},
    {'left' : '5px'},
    {'left' : '150px'},
  ]
  // index: number = this.index + 8;

   sections: any =[];
   sectionId: any;
   questions: any =[];
   userId: number;
   user_gender: any;
   pic_path: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseProvider,
    private sanitizer: DomSanitizer) {
    // this.index = this.index + 1;
    // console.log('==========> index: ',this.index);
    this.getSections();
    // this.getQuestions();
    var userDetail = JSON.parse(localStorage.getItem('userData'));
    this.userId = userDetail.id;
    this.user_gender = userDetail.gender;
    this.pic_path = userDetail.photo;
    console.log('========user id: ',userDetail);
    console.log('========user gender: ',userDetail.gender);


    this.db.executeSQL(`select * from user_quizzes where user_id = '${this.userId}' order by id desc limit 1`)
    .then(res => {
      let questionId = res.rows.item(0).question_id;
      console.log('============>My q_id : ',questionId);

          this.db.executeSQL(`select * from questions where id = '${questionId}'`)
          .then(res => {
            let sectionId = res.rows.item(0).section_id;
            this.sectionId = sectionId;
            console.log('============>My s_id : ',sectionId);

          }).catch(e => console.log((e)))

    }).catch(e => console.log((e)))

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LevelBoardPage');
  }
  ionViewDidEnter(){
    this.content.scrollToBottom();
  }

  getSections(){
    this.db.executeSQL(`SELECT * FROM sections`)
      .then(res => {
        this.sections = [];
        let bgIndex = 0;
        let postionIndex =0;
        for (var i = res.rows.length-1; i>=0; i--){
          this.sections.push({
            id: res.rows.item(i).id,
            bg: this.levels[bgIndex].bg,
            left: this.position[postionIndex].left,


          });
          bgIndex++;
          postionIndex++;
          if(bgIndex == 8)
            bgIndex = 0;
          if(postionIndex == 8)
          postionIndex = 0
        }
      }).catch(e => console.log((e)))
}

// getQuestions(){
//   this.db.executeSQL(`select * from user_quizzes where user_id = 140 order by id desc limit 1 AND`)
//     .then(res => {
//       let question_id= res.rows.item(0).question_id;
//       // this.questions = [];
//       // // var first = res.rows.item(0).id;
//       //       for (var i = 0; i < res.rows.length; i++){
//       //           this.questions[res.rows.item(i)] = {

//       //           }
//       //           //break;

//       //       }
//       console.log('============>My q_id : ',question_id);
//     }).catch(e => console.log((e)))

// }



}
