import { Component , ChangeDetectorRef} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import { NativeAudio } from '@ionic-native/native-audio';
import {QuizPage} from "../quiz/quiz";
import {StarterPage} from "../starter/starter";

/**
 * Generated class for the SectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-section',
  templateUrl: 'section.html',
})
export class SectionPage {

  current: any = {};
  currentIndex: number = -1;
  sections: any = {};
  sectionsID: any = [];
  answerCorrect: number;
  sectionID: number;
  questionID;
  public playCompleted: boolean;
  no_question: boolean;
  next_question: boolean;
  userId: number;
  appCtrl: any;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private alertCtrl: AlertController,
      private platform: Platform,
      public db: DatabaseProvider,
      private nativeAudio: NativeAudio,
      private changeRef: ChangeDetectorRef
  ) {
    platform.ready().then(()=>{
        platform.registerBackButtonAction(() =>{
          this.appCtrl.getRootNav().push();
        });
  
      });

    this.userId = JSON.parse(localStorage.getItem("userData")).id;
    this.answerCorrect = this.navParams.get('answerCorrect');
    this.sectionID = this.navParams.get('sectionID');
    this.questionID = this.navParams.get('questionID');
    this.playCompleted = false;
    this.next_question = false;
    this.no_question = false;
    // console.log(this.answerCorrect);
    // console.log(this.sectionID);
    // console.log(this.sectionID);

      this.db.executeSQL(`SELECT count(*) as total FROM user_quizzes WHERE user_id = `+ this.userId +` and created_at = datetime('now')`)
          .then(res => {
              let num_q = res.rows.item(0).total; // num_q is a number that user have play for today
              localStorage.setItem('num_q',num_q);
              console.log('get count number of question', num_q);
          }).catch(e => console.log((e)));
  }

    /*
     ionViewDidEnter runs when the page has fully entered and is now the active page.
     Display SectionPage query by SELECT * FROM sections WHERE id = ${this.sectionID}
     */
  ionViewDidEnter(){
      this.db.executeSQL(`SELECT * FROM sections WHERE id = ${this.sectionID}`)
          .then(res => {
              this.sections = {};
              // var first = res.rows.item(0).id;
              this.currentIndex = 0;
              for (var i = 0; i<res.rows.length; i++){
                  // this.sectionsID.push(res.rows.item(i).id);
                  this.sections={
                      id:res.rows.item(i).id,
                      order:res.rows.item(i).order,
                      lesson:res.rows.item(i).lesson,
                      title:res.rows.item(i).title,
                      content:res.rows.item(i).content,
                      image1:res.rows.item(i).image1,
                      image2:res.rows.item(i).image2,
                      image3:res.rows.item(i).image3,
                      image4:res.rows.item(i).image4,
                      sound:res.rows.item(i).sound,
                      created_date:res.rows.item(i).created_date,
                      modified_date:res.rows.item(i).modified_date
                  }
                    //break;
              }
              this.nativeAudio.preloadComplex(this.sections.id, 'assets/sounds/'+this.sections.sound,1,1,0).then(()=>{
                  this.nativeAudio.play(this.sections.id, ()=>{
                      this.nativeAudio.unload(this.sections.id);
                      let num_quiz = Number(localStorage.getItem('settings'));
                      console.log('Settings =', num_quiz);
                      let num_of_q = Number(localStorage.getItem('num_q'));
                      console.log('get count number of question in starter page =', num_of_q);

                      if (num_of_q < num_quiz){
                          this.next_question = true;
                      }else {
                          this.no_question = true;
                      }
                      this.playCompleted = true;
                      this.changeRef.detectChanges();
                  });
              });
              // console.log(this.sections.sound);
          }).catch(e => console.log((e)));
  }
  /*
     ionViewWillLeave(): when View is about to leave, Stopping current playback sound.
   */
  ionViewWillLeave() {
      this.nativeAudio.stop(this.sections.id).then(() => {
          this.nativeAudio.unload(this.sections.id);
      }, () => {

      });
  }
  /*
  function used when clicked on NextButton
   // num_q is a number that user have play for today
   // num_quiz is number of settings
   //if num_q < num_quiz then push to QuizPage
   // else pop to root page
   */
  navigate() {
      //select count * as column total FROM user_quizzes WHERE user_id = 1 and created_date = date('now')
      this.db.executeSQL(`SELECT count(*) as total FROM user_quizzes WHERE user_id = `+ this.userId+" and created_at between strftime('%Y-%m-%d 00:00:00', date('now')) and strftime('%Y-%m-%d 23:59:59', date('now'))")
          .then(res => {
              let num_q = res.rows.item(0).total; // num_q is a number that user have play for today
              console.log('get count number of question', num_q);
              let num_quiz = Number(localStorage.getItem('settings')); // num_quiz get from localStorage and set as a Number
              console.log('get number of settings =', num_quiz);
              // compare number of question that user play today with number that set from settings
              if (num_q < num_quiz){
                  console.log(num_q);
                  console.log(num_quiz);
                  this.navCtrl.push(
                      QuizPage, {
                          // questionID: this.getNextQuestionID(),
                          lessonID: this.sections.lesson
                      }
                  );
              }else {
                  this.navCtrl.push(StarterPage);
              }
              // }).catch(e => console.log((e)));
          }).catch(e => console.log((e)));
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
  replayButtonClick() {
      this.nativeAudio.stop(this.sections.id).then(() => {
          this.nativeAudio.play(this.sections.id, ()=>{
              this.nativeAudio.unload(this.sections.id);
          });console.log(this.sections.id);
      },()=>{

      });
  }

//   replayButtonClick() {
//     if (this.isPlaying){
//         this.nativeAudio.stop(this.current.id).then(() => {
//             this.nativeAudio.unload(this.current.id).then(()=>{
//                 this.content(this.current.id);    
//                 console.log("Replay sound:",this.current.id);
//             });
//         });
//     } else{
//         this.content(this.current.id);    
//     }
   
// }
 
}
