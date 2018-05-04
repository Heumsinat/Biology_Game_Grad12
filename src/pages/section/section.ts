import { Component , ChangeDetectorRef} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import {QuestionPage} from "../question/question";
import { NativeAudio } from '@ionic-native/native-audio';
import {QuizPageModule} from "../quiz/quiz.module";
import {QuizPage} from "../quiz/quiz";

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
    this.questionID = this.navParams.get('questionID');
    this.playCompleted = false;


    // console.log(this.answerCorrect);
    // console.log(this.sectionID);
    // console.log(this.sectionID);

   
  }

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

    navigate() {
        // this.num_q_today = this.getNumberQuestion();
        //select count * as column total FROM user_quizzes WHERE user_id = 1 and created_date = date('now')
        this.db.executeSQL(`SELECT count(*) as total FROM user_quizzes WHERE user_id = 1 and created_date = date('now')`)
            .then(res => {
                let num_q = res.rows.item(0).total; // num_q is a number that user have play for today
                console.log('get count number of question', num_q);
                // localStorage.setItem('num_q',num_q);
                // this.db.executeSQL(`SELECT * FROM settings `)
                //     .then(res =>{
                //         //let num_quiz = res.rows.item(0).number_of_quiz ; // num_quiz is a number that set in table settings
                //         console.log('get number of settings', num_quiz);

                let num_quiz = Number(localStorage.getItem('settings'));
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
                    this.navCtrl.popToRoot();
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

    private replayButtonClick() {
    
        this.nativeAudio.stop(this.sections.id).then(() => {
            this.nativeAudio.play(this.sections.id, ()=>{
                this.nativeAudio.unload(this.sections.id);
            });console.log(this.sections.id);
        },()=>{

        });
    }
}
