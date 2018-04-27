// import { Component } from '@angular/core';
// import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
// import { DatabaseProvider } from "../../providers/database/database";
// import {SectionPage} from "../section/section";
// import { NativeAudio } from '@ionic-native/native-audio';
//
//
// /**
//  * Generated class for the QuestionPage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */
//
// @IonicPage()
// @Component({
//   selector: 'page-question',
//   templateUrl: 'question.html',
// })
// export class QuestionPage {
//   current: any = {};
//   questions: any = {};
//   answers: any = [];
//   lessonID: number;
//   nextQuestion: number;
//   //totalQuestion: number;
//     userQuestion: number;
//    //nativeAudio: NativeAudio = new NativeAudio();
//   constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,private platform: Platform, public db: DatabaseProvider, private nativeAudio: NativeAudio) {
//     // this.nat
//     this.lessonID = navParams.get('lessonID');
//     this.nextQuestion = this.navParams.get('nextQuestion');
//     // this.getUserQuestion(1).then(()=>{
//     //     this.db.executeSQL(`SELECT * FROM questions WHERE id = ${this.userQuestion}`)
//     //         .then(res => {
//     //             this.questions = {};
//     //             var first = res.rows.item(0).id;
//     //             for (var i = 0; i < res.rows.length; i++){
//     //                 this.questions[res.rows.item(i).id] = {
//     //                     id:res.rows.item(i).id,
//     //                     question_number:res.rows.item(i).question_number,
//     //                     question_text:res.rows.item(i).question_text,
//     //                     image1:res.rows.item(i).image1,
//     //                     image2:res.rows.item(i).image2,
//     //                     image3:res.rows.item(i).image3,
//     //                     question_sound:res.rows.item(i).question_sound,
//     //                     num_of_answer:res.rows.item(i).num_of_answer,
//     //                     correct_answer_number:res.rows.item(i).correct_answer_number,
//     //                     score:res.rows.item(i).score,
//     //                     section_id:res.rows.item(i).section_id,
//     //                     correct_answer_sound:res.rows.item(i).correct_answer_sound,
//     //                     incorrect_answer_sound:res.rows.item(i).incorrect_answer_sound,
//     //                     next_question_id:res.rows.item(i).next_question_id,
//     //                     created_date:res.rows.item(i).created_date,
//     //                     modified_date:res.rows.item(i).modified_date
//     //                 }
//     //                 //break;
//     //             }
//     //             console.log(this.questions);
//     //             this.content(first);
//     //
//     //         }).catch(e => console.log((e)))
//     // });
//
//   }
//     ionViewDidEnter(){
//         this.getUserQuestion(1).then(()=>{
//             // this.db.executeSQL(`SELECT * FROM questions WHERE id = ${this.userQuestion}`)
//             this.db.executeSQL(`SELECT * FROM questions WHERE id = ${this.userQuestion}`)
//                 .then(res => {
//                     this.questions = {};
//                     var first = res.rows.item(0).id;
//                     for (var i = 0; i < res.rows.length; i++){
//                         this.questions[res.rows.item(i).id] = {
//                             id:res.rows.item(i).id,
//                             question_number:res.rows.item(i).question_number,
//                             question_text:res.rows.item(i).question_text,
//                             image1:res.rows.item(i).image1,
//                             image2:res.rows.item(i).image2,
//                             image3:res.rows.item(i).image3,
//                             question_sound:res.rows.item(i).question_sound,
//                             num_of_answer:res.rows.item(i).num_of_answer,
//                             correct_answer_number:res.rows.item(i).correct_answer_number,
//                             score:res.rows.item(i).score,
//                             section_id:res.rows.item(i).section_id,
//                             correct_answer_sound:res.rows.item(i).correct_answer_sound,
//                             incorrect_answer_sound:res.rows.item(i).incorrect_answer_sound,
//                             next_question_id:res.rows.item(i).next_question_id,
//                             created_date:res.rows.item(i).created_date,
//                             modified_date:res.rows.item(i).modified_date
//                         }
//                         //break;
//                     }
//                     console.log(this.questions);
//                     this.content(first);
//
//                 }).catch(e => console.log((e)))
//         });
//
//     }
//
//
//     ionViewWillLeave() {
//         console.log("ionViewWillLeave(): View is about to leave, Stopping current playback sound.")
//         this.nativeAudio.stop(this.current.id).then(() => {
//             this.nativeAudio.unload(this.current.id);
//         },()=>{
//
//         });
//     }
//
//
//   getQuestions(lesson_id: number){
//       return this.db.executeSQL(`SELECT * FROM questions WHERE lesson_id = ${lesson_id}`)
//           .then(res => {
//               this.questions = {};
//               var first = res.rows.item(0).id;
//               for (var i = 0; i < res.rows.length; i++){
//                   this.questions[res.rows.item(i).id] = {
//                       id:res.rows.item(i).id,
//                       question_number:res.rows.item(i).question_number,
//                       question_text:res.rows.item(i).question_text,
//                       image1:res.rows.item(i).image1,
//                       image2:res.rows.item(i).image2,
//                       image3:res.rows.item(i).image3,
//                       question_sound:res.rows.item(i).question_sound,
//                       num_of_answer:res.rows.item(i).num_of_answer,
//                       correct_answer_number:res.rows.item(i).correct_answer_number,
//                       score:res.rows.item(i).score,
//                       section_id:res.rows.item(i).section_id,
//                       correct_answer_sound:res.rows.item(i).correct_answer_sound,
//                       incorrect_answer_sound:res.rows.item(i).incorrect_answer_sound,
//                       next_question_id:res.rows.item(i).next_question_id,
//                       created_date:res.rows.item(i).created_date,
//                       modified_date:res.rows.item(i).modified_date
//                   }
//                   //break;
//               }
//               console.log("questions", this.questions);
//           }).catch(e => console.log((e)))
//   };
//
//   getUserQuestion(user_id: number){
//         return this.db.executeSQL(`SELECT * FROM user_questions WHERE user_id = ${user_id}`)
//             .then(res => {
//                 console.log("lesson", res);
//                 this.userQuestion = res.rows.item(0).next_question_id;
//             }).catch(e => {
//                 console.log((e));
//                 this.userQuestion =1;
//             })
//   }
//
//   getLessonID(question_id: number){
//       return this.db.executeSQL(`SELECT * FROM questions WHERE question_number = ${question_id}`)
//           .then(res => {
//               console.log("lesson", res);
//                   this.lessonID = res.rows.item(0).lesson_id;
//           }).catch(e => console.log((e)))
//   }
//
//   getAnswers(questions_id: number) {
//     this.db.executeSQL(`SELECT * FROM answers WHERE question_id = ${questions_id}`)
//         .then(res => {
//           this.answers = [];
//           console.log(res);
//           for (var i = 0; i<res.rows.length; i++){
//             this.answers.push({
//               id:res.rows.item(i).id,
//               answer_text:res.rows.item(i).answer_text,
//               answer_order:res.rows.item(i).answer_order,
//               answer_image:res.rows.item(i).answer_image,
//               answer_sound:res.rows.item(i).answer_sound,
//               question_id:res.rows.item(i).question_id,
//               is_correct_answer:res.rows.item(i).is_correct_answer,
//               created_date:res.rows.item(i).created_date,
//               modified_date:res.rows.item(i).modified_date
//             })
//           }
//         }).catch(e => console.log((e)))
//   }
//
//   content(id) {
//     console.log(id);
//     //console.log(this.current);
//
//     if (this.nextQuestion){
//         let temp = this.questions[this.nextQuestion];
//         if (typeof temp !== 'undefined') {
//             //Get Next Question
//             this.current = temp;
//         }
//         console.group('Current');
//         console.log('Get Next Question: ', this.current);
//         console.groupEnd();
//
//         if (typeof temp == 'undefined'){
//             this.getLessonID(this.nextQuestion).then(()=>{
//                 console.log("LESSON_DATA:" + this.lessonID);
//                 this.getQuestions(this.lessonID).then(()=>{
//                     console.log("QUS", this.questions);
//                     this.current = this.questions[this.nextQuestion];
//                     this.getAnswers(this.current.id);
//                     this.nativeAudio.preloadSimple(this.current.id, 'assets/sounds/'+this.current.question_sound).then(()=>{
//                         this.nativeAudio.play(this.current.id, ()=>{
//                             this.nativeAudio.unload(this.current.id);
//                         });
//                     });
//                     console.log(this.current.question_sound);
//                 });
//             });
//         } else {
//             this.getAnswers(this.current.id);
//         }
//     }
//     else{
//         this.current = this.questions[id];
//         // console.log(this.current);
//         this.getAnswers(this.current.id);
//         this.nativeAudio.preloadSimple(this.current.id, 'assets/sounds/'+this.current.question_sound).then(()=>{
//             this.nativeAudio.play(this.current.id, ()=>{
//                 this.nativeAudio.unload(this.current.id);
//             });
//         });console.log(this.current.question_sound);
//     }
//
//
//   }
//   public answer (correct_ans: number, question_id: number){
//       this.db.executeSQL(`select * from questions where id = '${question_id}'`)
//           .then(res => {
//               let section_id = res.rows.item(0).section_id;
//               let next_question_id = res.rows.item(0).next_question_id;
//               console.log('section_id', section_id);
//               //Save User_Question
//               this.db.executeSQL(`INSERT INTO user_question ( num_of_ans, next_question_id) VALUES ("' + correct_ans + '","' + next_question_id + '")`).then(res=>{
//                   console.log(res);
//               });
//               //End Save
//               console.log(this.current.question_sound);
//               this.navCtrl.push(SectionPage, {
//                   answerCorrect: correct_ans,
//                   sectionID: section_id,
//                   nextQuestionID: next_question_id
//               });
//           });
//   }
//     exitButtonClick() {
//         let alert = this.alertCtrl.create({
//             title: 'ចាកចេញ',
//             message: 'តើ​អ្នក​ពិត​ជា​ចង់​ចាក​ចេញ​ពី​កម្មវិធី​នេះ?​',
//             buttons: [
//                 {
//                     text: "ទេ",
//                     role: 'cancel'
//                 },
//                 {
//                     text: "បាទ​ / ចាស",
//                     handler: () => {
//                         this.platform.exitApp();
//                     }
//                 },
//             ]
//         });
//         alert.present();
//     }
//
//     private replayButtonClick() {
//         this.nativeAudio.preloadSimple(this.current.id, 'assets/sounds/'+this.current.question_sound).then(()=>{
//             this.nativeAudio.play(this.current.id, ()=>{
//                 this.nativeAudio.unload(this.current.id);
//             });
//         });console.log(this.current.question_sound);
//     }
// }
import {Component, ViewChild} from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { DatabaseProvider } from "../../providers/database/database";
import {SectionPage} from "../section/section";
import { NativeAudio } from '@ionic-native/native-audio';
import {SectionReviewPage} from "../section-review/section-review";

/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-question',
    templateUrl: 'question.html',
})
export class QuestionPage {
    current: any = {};
    questions: any = {};
    answers: any = [];
    lessonID: number;
    sectionID: number;
    chapterID: number;
    // nextQuestion: number;
    currentQuestionID:number;
    //totalQuestion: number;
    constructor(public navCtrl: NavController, public navParams: NavParams, public db: DatabaseProvider, private nativeAudio: NativeAudio,private alertCtrl: AlertController,private platform: Platform, public app: App) {
        this.lessonID = navParams.get('lessonID');
        // this.nextQuestion = this.navParams.get('nextQuestion');
        this.currentQuestionID  = this.navParams.get('currentQuestionID');
        this.chapterID = this.navParams.get('chapterID');
        // this.db.executeSQL(`SELECT * FROM questions WHERE lesson_id = ${this.lessonID}`)
        //     .then(res => {
        //         this.questions = {};
        //         var first = res.rows.item(0).id;
        //         for (var i = 0; i < res.rows.length; i++){
        //             this.questions[res.rows.item(i).id] = {
        //                 id:res.rows.item(i).id,
        //                 question_number:res.rows.item(i).question_number,
        //                 question_text:res.rows.item(i).question_text,
        //                 image1:res.rows.item(i).image1,
        //                 image2:res.rows.item(i).image2,
        //                 image3:res.rows.item(i).image3,
        //                 question_sound:res.rows.item(i).question_sound,
        //                 num_of_answer:res.rows.item(i).num_of_answer,
        //                 correct_answer_number:res.rows.item(i).correct_answer_number,
        //                 score:res.rows.item(i).score,
        //                 section_id:res.rows.item(i).section_id,
        //                 correct_answer_sound:res.rows.item(i).correct_answer_sound,
        //                 incorrect_answer_sound:res.rows.item(i).incorrect_answer_sound,
        //                 next_question_id:res.rows.item(i).next_question_id,
        //                 created_date:res.rows.item(i).created_date,
        //                 modified_date:res.rows.item(i).modified_date
        //             }
        //             //break;
        //         }
        //         console.log(this.questions);
        //         this.content(first);
        //
        //     }).catch(e => console.log((e)))
            platform.ready().then(() => {
                //Registration of push in Android and Windows Phone
                platform.registerBackButtonAction(() => {
                    let nav = this.app.getActiveNav();
                    console.log('Back is click');
                    if (nav.canGoBack()){ //Can we go back?
                        nav.popToRoot();
                    }else{
                        this.platform.exitApp(); //Exit from app
                    }
                });
            });
    }
    ionViewDidEnter(){
        this.db.executeSQL(`SELECT * FROM questions WHERE lesson_id = ${this.lessonID}`)
            .then(res => {
                this.questions = {};
                var first = res.rows.item(0).id;
                for (var i = 0; i < res.rows.length; i++){
                    this.questions[res.rows.item(i).id] = {
                        id:res.rows.item(i).id,
                        question_number:res.rows.item(i).question_number,
                        question_text:res.rows.item(i).question_text,
                        image1:res.rows.item(i).image1,
                        image2:res.rows.item(i).image2,
                        image3:res.rows.item(i).image3,
                        question_sound:res.rows.item(i).question_sound,
                        num_of_answer:res.rows.item(i).num_of_answer,
                        correct_answer_number:res.rows.item(i).correct_answer_number,
                        score:res.rows.item(i).score,
                        section_id:res.rows.item(i).section_id,
                        lesson_id:res.rows.item(i).lesson_id,
                        correct_answer_sound:res.rows.item(i).correct_answer_sound,
                        incorrect_answer_sound:res.rows.item(i).incorrect_answer_sound,
                        next_question_id:res.rows.item(i).next_question_id,
                        created_date:res.rows.item(i).created_date,
                        modified_date:res.rows.item(i).modified_date
                    }
                    //break;
                }
                console.log(this.questions);
                this.content(first);

            }).catch(e => console.log((e)))
    }

    ionViewWillLeave() {
        console.log("ionViewWillLeave(): View is about to leave, Stopping current playback sound.")
        this.nativeAudio.stop(this.current.id).then(() => {
            this.nativeAudio.unload(this.current.id);
        },()=>{

        });
    }

    getSectionID (){
        return this.db.executeSQL(`SELECT * FROM questions WHERE id = ${this.currentQuestionID}`)
            .then(res => {
                this.sectionID = (res.rows.item(0).section_id)+1;
                console.log(this.sectionID);
            }).catch(e => console.log((e)))
    }

    getNextQuestions(section_id: number){
        return this.db.executeSQL(`SELECT * FROM questions WHERE section_id = ${section_id} ORDER BY id ASC LIMIT 1`)
            .then(res => {
                //this.questions = {};
                for (var i = 0; i < res.rows.length; i++){
                    this.questions = {
                        id:res.rows.item(i).id,
                        question_number:res.rows.item(i).question_number,
                        question_text:res.rows.item(i).question_text,
                        image1:res.rows.item(i).image1,
                        image2:res.rows.item(i).image2,
                        image3:res.rows.item(i).image3,
                        question_sound:res.rows.item(i).question_sound,
                        num_of_answer:res.rows.item(i).num_of_answer,
                        correct_answer_number:res.rows.item(i).correct_answer_number,
                        score:res.rows.item(i).score,
                        section_id:res.rows.item(i).section_id,
                        correct_answer_sound:res.rows.item(i).correct_answer_sound,
                        incorrect_answer_sound:res.rows.item(i).incorrect_answer_sound,
                        next_question_id:res.rows.item(i).next_question_id,
                        created_date:res.rows.item(i).created_date,
                        modified_date:res.rows.item(i).modified_date
                    }
                    //break;
                }
                console.log("Last Question", this.questions);
            }).catch(e => console.log((e)))
    };

    // getQuestions(lesson_id: number){
    //     return this.db.executeSQL(`SELECT * FROM questions WHERE lesson_id = ${lesson_id}`)
    //         .then(res => {
    //             this.questions = {};
    //             var first = res.rows.item(0).id;
    //             for (var i = 0; i < res.rows.length; i++){
    //                 this.questions[res.rows.item(i).id] = {
    //                     id:res.rows.item(i).id,
    //                     question_number:res.rows.item(i).question_number,
    //                     question_text:res.rows.item(i).question_text,
    //                     image1:res.rows.item(i).image1,
    //                     image2:res.rows.item(i).image2,
    //                     image3:res.rows.item(i).image3,
    //                     question_sound:res.rows.item(i).question_sound,
    //                     num_of_answer:res.rows.item(i).num_of_answer,
    //                     correct_answer_number:res.rows.item(i).correct_answer_number,
    //                     score:res.rows.item(i).score,
    //                     section_id:res.rows.item(i).section_id,
    //                     correct_answer_sound:res.rows.item(i).correct_answer_sound,
    //                     incorrect_answer_sound:res.rows.item(i).incorrect_answer_sound,
    //                     next_question_id:res.rows.item(i).next_question_id,
    //                     created_date:res.rows.item(i).created_date,
    //                     modified_date:res.rows.item(i).modified_date
    //                 }
    //                 //break;
    //             }
    //             console.log("questions", this.questions);
    //         }).catch(e => console.log((e)))
    // }

    // getLessonID(question_id: number){
    //     return this.db.executeSQL(`SELECT * FROM questions WHERE question_number = ${question_id}`)
    //         .then(res => {
    //             console.log("lesson", res);
    //             this.lessonID = res.rows.item(0).lesson_id;
    //         }).catch(e => console.log((e)))
    // }

    getAnswers(questions_id: number) {
        this.db.executeSQL(`SELECT * FROM answers WHERE question_id = ${questions_id}`)
            .then(res => {
                this.answers = [];
                console.log(res);
                for (var i = 0; i<res.rows.length; i++){
                    this.answers.push({
                        id:res.rows.item(i).id,
                        answer_text:res.rows.item(i).answer_text,
                        answer_order:res.rows.item(i).answer_order,
                        answer_image:res.rows.item(i).answer_image,
                        answer_sound:res.rows.item(i).answer_sound,
                        question_id:res.rows.item(i).question_id,
                        is_correct_answer:res.rows.item(i).is_correct_answer,
                        created_date:res.rows.item(i).created_date,
                        modified_date:res.rows.item(i).modified_date
                    })
                }
            }).catch(e => console.log((e)))
    }
    content(id) {
        console.log(id);
        console.log("Hello : ", id);

        if (this.currentQuestionID){
            //let temp = this.questions[this.nextQuestion];
            let temp;
            // if (typeof temp !== 'undefined') {
            //     //Get Next Question
            //     this.current = temp;
            // }
            console.group('Current');
            console.log('Get Next Question: ', this.current);
            console.groupEnd();

            if (typeof temp == 'undefined'){
                this.getSectionID().then(()=>{
                    console.log("SECTION_ID : " + this.sectionID);
                    this.getNextQuestions(this.sectionID).then(()=>{
                        console.log("QUESTION", this.questions);
                        this.current = this.questions;
                        console.log('TEST CUR:', this.current);
                        console.log(this.current.id);
                        console.log(this.current.question_sound);
                        this.getAnswers(this.current.id);
                        this.nativeAudio.preloadComplex(this.current.id, 'assets/sounds/'+this.current.question_sound, 1,1,0).then(()=>{
                            this.nativeAudio.play(this.current.id, ()=>{
                                this.nativeAudio.unload(this.current.id);
                            });
                        });
                        console.log(this.current.question_sound);
                    });
                });
            } else {
                this.getAnswers(this.current.id);
            }
        }
        else{
            this.current = this.questions[id];
            console.log(this.current);
            this.getAnswers(this.current.id);
            this.nativeAudio.preloadSimple(this.current.id, 'assets/sounds/'+this.current.question_sound).then(()=>{
                this.nativeAudio.play(this.current.id, ()=>{
                    this.nativeAudio.unload(this.current.id);
                });
            });console.log(this.current.question_sound);
        }
    }

  //   content(id) {
  //   console.log(id);
  //   // console.log(this.current);
  //
  //   if (this.nextQuestion){
  //       let temp = this.questions[this.nextQuestion];
  //       if (typeof temp !== 'undefined') {
  //           //Get Next Question
  //           this.current = temp;
  //       }
  //       // console.group('Current');
  //       // console.log('Get Next Question: ', this.current);
  //       // console.groupEnd();
  //
  //       if (typeof temp == 'undefined'){
  //           this.getLessonID(this.nextQuestion).then(()=>{
  //               console.log("LESSON_DATA:" + this.lessonID);
  //               this.getQuestions(this.lessonID).then(()=>{
  //                   console.log("QUS", this.questions);
  //                   this.current = this.questions[this.nextQuestion];
  //                   this.getAnswers(this.current.id);
  //                   this.nativeAudio.preloadSimple(this.current.id, 'assets/sounds/'+this.current.question_sound).then(()=>{
  //                       this.nativeAudio.play(this.current.id, ()=>{
  //                           this.nativeAudio.unload(this.current.id);
  //                       });
  //                   });
  //                   console.log('play',this.current.question_sound);
  //               });
  //           });
  //       } else {
  //           this.getAnswers(this.current.id);
  //           this.nativeAudio.preloadSimple(this.current.id, 'assets/sounds/'+this.current.question_sound).then(()=>{
  //               this.nativeAudio.play(this.current.id, ()=>{
  //                   this.nativeAudio.unload(this.current.id);
  //               });
  //           });
  //       }
  //   }
  //   else{
  //       this.current = this.questions[id];
  //       // console.log(this.current);
  //       this.getAnswers(this.current.id);
  //       this.nativeAudio.preloadSimple(this.current.id, 'assets/sounds/'+this.current.question_sound).then(()=>{
  //           this.nativeAudio.play(this.current.id, ()=>{
  //               this.nativeAudio.unload(this.current.id);
  //           });
  //       });console.log('playsound',this.current.question_sound);
  //   }
  //
  // }

    public answer (correct_ans: number, question_id: number){

        if (correct_ans == 1){
            return this.nativeAudio.preloadComplex('correct', 'assets/sounds/correct.mp3',1,1,0).then(()=>{
                return this.nativeAudio.play('correct', ()=>{
                    this.nativeAudio.unload('correct');
                    this.db.executeSQL(`select * from questions where id = '${question_id}'`)
                        .then(res => {
                            let section_id = res.rows.item(0).section_id;
                            // let next_question_id = res.rows.item(0).next_question_id;
                            let current_question_id = res.rows.item(0).id;
                            console.log('section_id', section_id);
                            this.navCtrl.push(SectionReviewPage, {
                                answerCorrect: correct_ans,
                                sectionID: section_id,
                                // nextQuestionID: next_question_id,
                                questionID: current_question_id,
                                lessonId: this.lessonID,
                                chapterID: this.chapterID
                            });
                        });
                });
            });
        } else{
            return this.nativeAudio.preloadComplex('wrong', 'assets/sounds/wrong.mp3',1,1,0).then(()=>{
                return this.nativeAudio.play('wrong', ()=>{

                    this.nativeAudio.unload('wrong');
                    this.db.executeSQL(`select * from questions where id = '${question_id}'`)
                        .then(res => {
                            let section_id = res.rows.item(0).section_id;
                            // let next_question_id = res.rows.item(0).next_question_id;
                            let current_question_id = res.rows.item(0).id;

                            console.log('section_id', section_id)

                            this.navCtrl.push(SectionReviewPage, {
                                answerCorrect: correct_ans,
                                sectionID: section_id,
                                // nextQuestionID: next_question_id
                                questionID: current_question_id,
                                lessonId: this.lessonID,
                                chapterID: this.chapterID
                            });
                        });
                });
            });
        }
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
        this.nativeAudio.stop(this.current.id).then(() => {
            this.nativeAudio.play(this.current.id, ()=>{
                this.nativeAudio.unload(this.current.id);
            });console.log(this.current.question_sound);
        },()=>{

        });
    }
    backButtonClick() {
        this.navCtrl.pop();
    }
}
