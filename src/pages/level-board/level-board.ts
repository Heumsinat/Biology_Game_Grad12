import { Component,  ViewChild, ViewChildren } from '@angular/core';
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
   @ViewChildren('content') Childcontent:any;

  levels: any = [
    {'bg' : 'red'},
    {'bg' : 'skyblue'},
    {'bg' : 'blue'},
    {'bg' : 'lightseagreen'},
    {'bg' : 'lightgreen'},
    {'bg' : 'lightcyan'},
    {'bg' : 'blue'},
    {'bg' : 'rgb(21, 248, 21)'}
  ];
  position: any = [
    {'left' : '420px'},
    {'left' : '550px'},
    {'left' : '300px'},
    {'left' : '80px'},
    {'left' : '250px'},
    {'left' : '400px'},
    {'left' : '20px'},
    {'left' : '250px'}
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
            // this.sectionId = sectionId;
            this.sectionId = 28;
            this.scrollToSectionId(this.sectionId);

          }).catch(e => console.log((e)))

    }).catch(e => console.log((e)))

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LevelBoardPage');
  }
  ionViewDidEnter(){
    console.log(this.content);
    console.log(this.Childcontent);
  }

  scrollToSectionId(id: any){
    let height = this.content['scrollHeight'];
    let buttonHeightWithMargin = 53;
    let scrollPaddingTop = 200;
    let currentSection = id;
    let currehtSectionPosition = this.sections.length - currentSection;
    let scrollPositionY = (currehtSectionPosition * buttonHeightWithMargin) - scrollPaddingTop;
    let scrollPositionX = 0;
    
    console.log(this.content['scrollWidth']);

    this.content.scrollTo(scrollPositionX,scrollPositionY,500);
  }

  getSections(){
    this.db.executeSQL(`SELECT * FROM sections`)
      .then(res => {
        this.sections = [];
        let styleIndex = 0;
        for (var i = res.rows.length-1; i>=0; i--){
          this.sections.push({
            id: res.rows.item(i).id,
            bg: this.levels[styleIndex].bg,
            left: this.position[styleIndex].left,
          });

          styleIndex++;

          if(styleIndex == 8)
          styleIndex = 0;
        }
      }).catch(e => console.log((e)));
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
