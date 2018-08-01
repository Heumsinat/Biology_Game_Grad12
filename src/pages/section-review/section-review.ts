import { Component, ChangeDetectorRef } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import {QuestionPage} from "../question/question";
import { NativeAudio } from '@ionic-native/native-audio';
import {QuizPageModule} from "../quiz/quiz.module";
import {QuizPage} from "../quiz/quiz";
import {LessonPage} from "../lesson/lesson";

/**
 * Generated class for the SectionReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-section-review',
  templateUrl: 'section-review.html',
})
export class SectionReviewPage {
  current: any = {};
  currentIndex: number = -1;
  sections: any = {};
  sectionsID: any = [];
  answerCorrect: number;
  sectionID: number;
  public questionID: number;
  public nextQuestionID;
  lessonId: number;
  public num_section: number;
  chapterID: number;
  public playCompleted: boolean;

  constructor(
      public navCtrl: NavController,
      public navParams: NavParams,
      private alertCtrl: AlertController,
      private platform: Platform,
      public db: DatabaseProvider,
      private nativeAudio: NativeAudio,
      private changeRef: ChangeDetectorRef
  ) {
    this.answerCorrect = this.navParams.get('answerCorrect');
    this.sectionID = this.navParams.get('sectionID');
    this.nextQuestionID = this.navParams.get('nextQuestionID');
    this.questionID = this.navParams.get('questionID');
    this.lessonId = this.navParams.get('lessonId');
    this.chapterID = this.navParams.get('chapterID');
    this.playCompleted = false;
    console.log('lesson id ', this.lessonId);
    console.log('chapter id', this.chapterID);
    this.getNumSection();
  }

  ionViewDidEnter(){

    console.log("CURRENT Q: ", this.navParams.get('questionID'));
    console.log("CURRENT S: ", this.navParams.get('sectionID'));

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
              this.playCompleted = true;
              this.changeRef.detectChanges();
            });
          });
          // console.log(this.sections.sound);
        }).catch(e => console.log((e)));
  }


  ionViewWillLeave() {
    this.nativeAudio.stop(this.sections.id).then(() => {
      this.nativeAudio.unload(this.sections.id);
    },()=>{

    });
  }
  getNumSection(){
    let number_section: number = 0;
    console.log("LESSSON ID", this.lessonId);
    this.db.executeSQL(`SELECT COUNT(*) as num_section FROM sections WHERE lesson = ${this.lessonId}`)
        .then(data =>{
          number_section = data.rows.item(0).num_section;
          this.num_section = number_section;
        }).catch(e => console.log((e)));
  }

  navigate() {
    
    console.log('SEC_ID:', this.sectionID);

    if (this.sectionID == this.num_section){
      this.navCtrl.push(
          LessonPage, {
            chapterID: this.chapterID,
            // lessonID: this.sections.lesson,
          }
      )
    }else (
        this.navCtrl.push(
            QuestionPage, {
              nextQuestion: this.nextQuestionID,
              lessonID: this.sections.lesson,
              currentQuestionID: this.questionID,
              chapterID: this.chapterID
            }
        )
    )
  }

  toggleTest() {
    this.playCompleted = !this.playCompleted;
    this.changeRef.detectChanges();
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
}
