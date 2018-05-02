// import { Component } from '@angular/core';
// import {AlertController, App, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
// import { DatabaseProvider } from "../../providers/database/database";
// import {SectionPage} from "../section/section";
// import { NativeAudio } from '@ionic-native/native-audio';
//
// /**
//  * Generated class for the QuizPage page.
//  *
//  * See https://ionicframework.com/docs/components/#navigation for more info on
//  * Ionic pages and navigation.
//  */
//
// @IonicPage()
// @Component({
//   selector: 'page-quiz',
//   templateUrl: 'quiz.html',
// })
// export class QuizPage {
//   current: any = {};
//   questions: any = {};
//   answers: any = [];
//   lessonID: number;
//   sectionID: number;
//   nextQuestion: number;
//   userQuestion: number;
//
//   constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,private platform: Platform, public db: DatabaseProvider, private nativeAudio: NativeAudio, private app: App) {
//     this.lessonID = navParams.get('lessonID');
//     this.nextQuestion = this.navParams.get('nextQuestion');
//
//     console.log("Next Question ID ", this.nextQuestion);
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
//       platform.ready().then(() => {
//           //Registration of push in Android and Windows Phone
//           platform.registerBackButtonAction(() => {
//               let nav = this.app.getActiveNav();
//               console.log('Back is click')
//               if (nav.canGoBack()){ //Can we go back?
//                   nav.popToRoot();
//               }else{
//                   this.platform.exitApp(); //Exit from app
//               }
//           });
//       });
//
//   }
//     ionViewDidEnter(){
//       //Previous Question
//
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
//     }
//     ionViewWillLeave() {
//         console.log("ionViewWillLeave(): View is about to leave, Stopping current playback sound.")
//         this.nativeAudio.stop(this.current.id).then(() => {
//             this.nativeAudio.unload(this.current.id);
//         },()=>{
//
//         });
//     }
//
//   getSectionID (){
//         return this.db.executeSQL(`SELECT * FROM questions WHERE id = ${this.nextQuestion}`)
//             .then(res => {
//                 this.sectionID = res.rows.item(0).section_id;
//                 console.log(this.sectionID);
//             }).catch(e => console.log((e)))
//   }
//   getNextQuestions(section_id: number){
//         return this.db.executeSQL(`SELECT * FROM questions WHERE section_id = ${section_id} ORDER BY id DESC LIMIT 1`)
//             .then(res => {
//                 //this.questions = {};
//                 for (var i = 0; i < res.rows.length; i++){
//                     this.questions = {
//                         id:res.rows.item(i).id,
//                         question_number:res.rows.item(i).question_number,
//                         question_text:res.rows.item(i).question_text,
//                         image1:res.rows.item(i).image1,
//                         image2:res.rows.item(i).image2,
//                         image3:res.rows.item(i).image3,
//                         question_sound:res.rows.item(i).question_sound,
//                         num_of_answer:res.rows.item(i).num_of_answer,
//                         correct_answer_number:res.rows.item(i).correct_answer_number,
//                         score:res.rows.item(i).score,
//                         section_id:res.rows.item(i).section_id,
//                         correct_answer_sound:res.rows.item(i).correct_answer_sound,
//                         incorrect_answer_sound:res.rows.item(i).incorrect_answer_sound,
//                         next_question_id:res.rows.item(i).next_question_id,
//                         created_date:res.rows.item(i).created_date,
//                         modified_date:res.rows.item(i).modified_date
//                     }
//                     //break;
//                 }
//                 console.log("Last Question", this.questions);
//             }).catch(e => console.log((e)));
//   };
//
//   // getQuestions(lesson_id: number){
//   //     return this.db.executeSQL(`SELECT * FROM questions WHERE lesson_id = ${lesson_id}`)
//   //         .then(res => {
//   //             this.questions = {};
//   //             var first = res.rows.item(0).id;
//   //             for (var i = 0; i < res.rows.length; i++){
//   //                 this.questions[res.rows.item(i).id] = {
//   //                     id:res.rows.item(i).id,
//   //                     question_number:res.rows.item(i).question_number,
//   //                     question_text:res.rows.item(i).question_text,
//   //                     image1:res.rows.item(i).image1,
//   //                     image2:res.rows.item(i).image2,
//   //                     image3:res.rows.item(i).image3,
//   //                     question_sound:res.rows.item(i).question_sound,
//   //                     num_of_answer:res.rows.item(i).num_of_answer,
//   //                     correct_answer_number:res.rows.item(i).correct_answer_number,
//   //                     score:res.rows.item(i).score,
//   //                     section_id:res.rows.item(i).section_id,
//   //                     correct_answer_sound:res.rows.item(i).correct_answer_sound,
//   //                     incorrect_answer_sound:res.rows.item(i).incorrect_answer_sound,
//   //                     next_question_id:res.rows.item(i).next_question_id,
//   //                     created_date:res.rows.item(i).created_date,
//   //                     modified_date:res.rows.item(i).modified_date
//   //                 }
//   //                 //break;
//   //             }
//   //             console.log("questions", this.questions);
//   //         }).catch(e => console.log((e)))
//   // };
//
//   getUserQuestion(user_id: number){
//         return this.db.executeSQL(`SELECT * FROM user_questions WHERE user_id = ${user_id}`)
//             .then(res => {
//                 // console.log("lesson", res);
//                 this.userQuestion = res.rows.item(0).next_question_id;
//             }).catch(e => {
//                 console.log((e));
//                 this.userQuestion =1;
//             });
//   }
//
//   // getLessonID(question_id: number){
//   //     return this.db.executeSQL(`SELECT * FROM questions WHERE question_number = ${question_id}`)
//   //         .then(res => {
//   //             console.log("lesson", res);
//   //                 this.lessonID = res.rows.item(0).lesson_id;
//   //         }).catch(e => console.log((e)))
//   // }
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
//         }).catch(e => console.log((e)));
//   }
//
//   content(id) {
//     console.log(id);
//     console.log("Hello : ", id);
//
//     if (this.nextQuestion){
//         //let temp = this.questions[this.nextQuestion];
//         let temp;
//         // if (typeof temp !== 'undefined') {
//         //     //Get Next Question
//         //     this.current = temp;
//         // }
//         console.group('Current');
//         console.log('Get Next Question: ', this.current);
//         console.groupEnd();
//
//         if (typeof temp == 'undefined'){
//             this.getSectionID().then(()=>{
//                 console.log("SECTION_ID : " + this.sectionID);
//                 this.getNextQuestions(this.sectionID).then(()=>{
//                     console.log("QUESTION", this.questions);
//                     this.current = this.questions;
//                     console.log('TEST CUR:', this.current);
//                     console.log(this.current.id);
//                     console.log(this.current.question_sound);
//                     this.getAnswers(this.current.id);
//                     this.nativeAudio.preloadComplex(this.current.id, 'assets/sounds/'+this.current.question_sound,1,1,0).then(()=>{
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
//         console.log(this.current);
//         this.getAnswers(this.current.id);
//         this.nativeAudio.preloadComplex(this.current.id, 'assets/sounds/'+this.current.question_sound,1,1,0).then(()=>{
//             this.nativeAudio.play(this.current.id, ()=>{
//                 this.nativeAudio.unload(this.current.id);
//             });
//         });console.log(this.current.question_sound);
//     }
//   }
//   public answer (correct_ans: number, question_id: number){
//       if (correct_ans == 1){
//           return this.nativeAudio.preloadComplex('correct', 'assets/sounds/correct.mp3',1,1,0).then(()=>{
//               return this.nativeAudio.play('correct', ()=>{
//                   this.nativeAudio.unload('correct');
//                   this.db.executeSQL(`select * from questions where id = '${question_id}'`)
//                       .then(res => {
//                           let section_id = res.rows.item(0).section_id;
//                           let next_question_id = res.rows.item(0).next_question_id;
//                           console.log('section_id', section_id);
//                           //Save User_Question
//                           this.db.executeSQL(`INSERT INTO user_question ( is_correct, question_id, user_id)
//                                             VALUES (1,` + next_question_id + `, ` + section_id + `)`).then(res=>{
//                               console.log(res);
//                           });
//                           //End Save
//                           // console.log(this.current.question_sound);
//                           this.navCtrl.push(SectionPage, {
//                               answerCorrect: correct_ans,
//                               sectionID: section_id,
//                               nextQuestionID: next_question_id
//                           });
//                       });
//               });
//           });
//       }else {
//           return this.nativeAudio.preloadComplex('wrong', 'assets/sounds/wrong.mp3',1,1,0).then(()=>{
//               return this.nativeAudio.play('wrong', ()=>{
//                   this.nativeAudio.unload('wrong');
//                   this.db.executeSQL(`select * from questions where id = '${question_id}'`)
//                       .then(res => {
//                           let section_id = res.rows.item(0).section_id;
//                           let next_question_id = res.rows.item(0).next_question_id;
//                           console.log('section_id', section_id);
//                           //Save User_Question
//                           this.db.executeSQL(`INSERT INTO user_question ( is_correct, question_id, user_id)
//                                             VALUES (1,` + next_question_id + `, ` + section_id + `)`).then(res=>{
//                               console.log(res);
//                           });
//                           //End Save
//                           // console.log(this.current.question_sound);
//                           this.navCtrl.push(SectionPage, {
//                               answerCorrect: correct_ans,
//                               sectionID: section_id,
//                               nextQuestionID: next_question_id
//                           });
//                       });
//               });
//           });
//       }
//   }
//
//   backButtonClick(){
//       this.navCtrl.pop();
//   }
//
//   exitButtonClick() {
//       let alert = this.alertCtrl.create({
//           title: 'ចាកចេញ',
//           message: 'តើ​អ្នក​ពិត​ជា​ចង់​ចាក​ចេញ​ពី​កម្មវិធី​នេះ?​',
//           buttons: [
//               {
//                   text: "ទេ",
//                   role: 'cancel'
//               },
//               {
//                   text: "បាទ​ / ចាស",
//                   handler: () => {
//                       this.platform.exitApp();
//                   }
//               },
//           ]
//       });
//       alert.present();
//   }
//
//     replayButtonClick() {
//         // this.nativeAudio.preloadSimple(this.current.id, 'assets/sounds/'+this.current.question_sound).then(()=>{
//         //     this.nativeAudio.play(this.current.id, ()=>{
//         //         this.nativeAudio.unload(this.current.id);
//         //     });
//         // });
//         // console.log(this.current.question_sound);
//         this.nativeAudio.stop(this.current.id).then(() => {
//             this.nativeAudio.play(this.current.id, ()=>{
//                 this.nativeAudio.unload(this.current.id);
//             });console.log(this.current.question_sound);
//         },()=>{
//
//         });
//     }
// }
import { Component } from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { DatabaseProvider } from "../../providers/database/database";
import {SectionPage} from "../section/section";
import { NativeAudio } from '@ionic-native/native-audio';

/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-quiz',
    templateUrl: 'quiz.html',
})
export class QuizPage {
    current: any = {};
    questions: any = {};
    answers: any = [];
    lessonID: number;
    sectionID: number;
    nextQuestionID: any;
    currentQuestionID: any;
    userQuestion: number;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        private platform: Platform,
        public db: DatabaseProvider,
        private nativeAudio: NativeAudio,
        private app: App
    ) {
        this.lessonID = navParams.get('lessonID');
        this.currentQuestionID = this.navParams.get('questionID');
        //console.log('current question id in constructor = ', this.currentQuestionID);
        platform.ready().then(() => {
            //Registration of push in Android and Windows Phone
            platform.registerBackButtonAction(() => {
                let nav = this.app.getActiveNav();
                console.log('Back is click')
                if (nav.canGoBack()){ //Can we go back?
                    nav.popToRoot();
                }else{
                    this.platform.exitApp(); //Exit from app
                }
            });
        });
    }

    ionViewDidEnter(){
        //Previous Question
        this.getUserQuestion().then(()=>{
            // this.db.executeSQL(`SELECT * FROM questions WHERE id = ${this.userQuestion}`)
            console.log("userQuestion = "+this.userQuestion);
            this.db.executeSQL(`SELECT * FROM questions WHERE id = ${this.userQuestion}`)
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
                            correct_answer_sound:res.rows.item(i).correct_answer_sound,
                            incorrect_answer_sound:res.rows.item(i).incorrect_answer_sound,
                            next_question_id:res.rows.item(i).next_question_id,
                            created_date:res.rows.item(i).created_date,
                            modified_date:res.rows.item(i).modified_date
                        }
                        //break;
                    }
                    console.log("Question Object"+JSON.stringify(this.questions));
                    this.content(first);
                }).catch(e => console.log((e)))
        });
    }

    /*
     ionViewWillLeave(): View is about to leave, Stopping current playback sound.
     */
    ionViewWillLeave() {
        console.log("ionViewWillLeave(): View is about to leave, Stopping current playback sound.")
        this.nativeAudio.stop(this.current.id).then(() => {
            this.nativeAudio.unload(this.current.id);
        },()=>{

        });
    }

    getNextQuestions(){
        // console.log("this.currentQuestionID = "+this.currentQuestionID);
        return this.db.executeSQL(`SELECT * FROM order_question WHERE question_id = ${this.currentQuestionID}`)
            .then(res => {
                //this.questions = {};
                this.nextQuestionID = res.rows.item(0).next_question_id;
                console.log("NEXT QUESTION ID", this.nextQuestionID);
            }).catch(e => console.log((e)));
    };
    /*
    Get User Question by nextQuestionID
     */
    getUserQuestion(){
        this.nextQuestionID = localStorage.getItem("NextQID");
        console.log("local storage NEXTQID = "+this.nextQuestionID);
        return this.db.executeSQL(`SELECT * FROM questions WHERE id = ${this.nextQuestionID}`)
            .then(res => {
                console.log("res in getUserQuestion = "+JSON.stringify(res));
                this.userQuestion = res.rows.item(0).id;

            }).catch(err => {
                console.log("Error while query question from questions = "+err);
                this.userQuestion = 1;
            });
    }
    /*
    Function Get Answers query by question_id
     */
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
                        modified_date:res.rows.item(i).modified_date,
                    });
                }
            }).catch(e => console.log((e)));
    }
    /*
    Function to display content of question and answer with sound
     */
    content(id) {
        /*
        if (this.nextQuestionID){
        //if(this.getNextQuestions()){
            console.log("getNextQuestion = "+this.nextQuestionID);
            //let temp = this.questions[this.nextQuestion];
            let temp;
            // if (typeof temp !== 'undefined') {
            //     //Get Next Question
            //     this.current = temp;
            // }
            console.group('Current');
            console.log('Get Next Question: ', this.current);
            console.groupEnd();

            //if (typeof temp == 'undefined'){
                    this.getNextQuestions().then(()=>{
                        this.current = this.questions;
                        console.log(this.current.id);
                        console.log(this.current.question_sound);
                        this.getAnswers(this.current.id);
                        this.nativeAudio.preloadComplex(this.current.id, 'assets/sounds/'+this.current.question_sound,1,1,0).then(()=>{
                            this.nativeAudio.play(this.current.id, ()=>{
                                this.nativeAudio.unload(this.current.id);
                            });
                        });
                        console.log(this.current.question_sound);
                    });
            // } else {
            //     this.getAnswers(this.current.id);
            // }
        }
        else{
*/
            this.getNextQuestions().then(()=>{
                this.current = this.questions[id];
                console.log('TEST CUR:', this.current);
                console.log("nextQuestionID in content = "+this.nextQuestionID);
                this.getAnswers(this.current.id);
                this.nativeAudio.preloadComplex(this.current.id, 'assets/sounds/'+this.current.question_sound,1,1,0).then(()=>{
                    this.nativeAudio.play(this.current.id, ()=>{
                        this.nativeAudio.unload(this.current.id);
                    });
                });
                console.log(this.current.question_sound);
            });

            /*
            this.current = this.questions[id];
            console.log("1st current question id = "+this.current);
            this.getAnswers(this.current.id);
            this.nativeAudio.preloadComplex(this.current.id, 'assets/sounds/'+this.current.question_sound,1,1,0).then(()=>{
                this.nativeAudio.play(this.current.id, ()=>{
                    this.nativeAudio.unload(this.current.id);
                });
            });console.log(this.current.question_sound);
            this.nextQuestionID = this.getNextQuestionIDSamak();
            console.log("this.nextQuestionID After answer 1st Question = "+this.nextQuestionID);
            */
      //  }
    }
    /*
     this function when click on answer and push to SectionReviewPage with
     (answerCorrect, sectionID, questionID) and save data to Table user_quiz
     */
    public answer (correct_ans: number, question_id: number, answer_order:number ){
        console.log('USER ANSWER ID', answer_order);
        // if correct_ans , play audio correct then push to SectionReviewPage
        if (correct_ans == 1){
            return this.nativeAudio.preloadComplex('correct', 'assets/sounds/correct.mp3',1,1,0).then(()=>{
                return this.nativeAudio.play('correct', ()=>{
                    this.nativeAudio.unload('correct');
                    this.db.executeSQL(`select * from questions where id = '${question_id}'`)
                        .then(res => {
                            let question_id = res.rows.item(0).id;
                            let section_id = res.rows.item(0).section_id;
                            // let next_question_id = res.rows.item(0).next_question_id;
                            console.log('section_id', section_id);
                            /*
                             //Save data to table User_Quiz
                             Samak API 2
                            */
                            this.db.executeSQL(`INSERT INTO user_quiz ( user_id, question_id, user_ans_id, ans_correct, score, created_date) 
                                            VALUES (1,` + question_id + `,` + answer_order + `,` + correct_ans + `,1, date('now'))`).then(res=>{
                                console.log('Current number of question that has insert', res);

                            });
                            //End Save
                            // console.log(this.current.question_sound);
                            localStorage.setItem("currentQID",question_id);
                            this.navCtrl.push(SectionPage, {
                                answerCorrect: correct_ans,
                                sectionID: section_id,
                                questionID: question_id
                            });

                            // Get nextQID by SELECT * FROM order_question WHERE question_id = ${localStorage.getItem("currentQID")
                            console.log("SELECT * FROM order_question WHERE question_id ="+localStorage.getItem("currentQID"));
                            this.db.executeSQL(`SELECT * FROM order_question WHERE question_id = ${localStorage.getItem("currentQID")}`)
                                .then(res => {
                                    //this.questions = {};
                                    var nextQID:any;
                                    console.log("res result in getNextQuestionIDSamak = "+JSON.stringify(res));
                                    nextQID = res.rows.item(0).next_question_id;
                                    // set local storage for NextQID
                                    localStorage.setItem("NextQID",nextQID);
                                }).catch(e => console.log((e)));
                        });
                });
            });
        }else {
            return this.nativeAudio.preloadComplex('wrong', 'assets/sounds/wrong.mp3',1,1,0).then(()=>{
                return this.nativeAudio.play('wrong', ()=>{
                    this.nativeAudio.unload('wrong');
                    this.db.executeSQL(`select * from questions where id = '${question_id}'`)
                        .then(res => {
                            let question_id = res.rows.item(0).id;
                            let section_id = res.rows.item(0).section_id;
                            let next_question_id = res.rows.item(0).next_question_id;
                            console.log('section_id', section_id);
                            //Save User_Question

                            this.db.executeSQL(`INSERT INTO user_quiz ( user_id, question_id, user_ans_id , ans_correct, score, created_date) 
                                            VALUES (1,` + question_id + `,` + answer_order + `,` + correct_ans + `,0, date('now'))`).then(res=>{
                                console.log('Current number of question that has insert', res);
                            });
                            //End Save
                            // console.log(this.current.question_sound);
                            localStorage.setItem("currentQID",question_id);
                            this.navCtrl.push(SectionPage, {
                                answerCorrect: correct_ans,
                                sectionID: section_id,
                                questionID: question_id
                            });
                            // Get nextQID by SELECT * FROM order_question WHERE question_id = ${localStorage.getItem("currentQID")
                            this.db.executeSQL(`SELECT * FROM order_question WHERE question_id = ${localStorage.getItem("currentQID")}`)
                                .then(res => {
                                    //this.questions = {};
                                    var nextQID:any;
                                    console.log("res result in getNextQuestionIDSamak = "+JSON.stringify(res));
                                    nextQID = res.rows.item(0).next_question_id;
                                    // set local storage for NextQID
                                    localStorage.setItem("NextQID",nextQID);
                                }).catch(e => console.log((e)));
                        });
                });
            });
        }
    }
    /*
     Function back page when clicked on button
     */
    backButtonClick(){
        this.navCtrl.pop();
    }
    /*
     Function to exit app when clicked on button
     */
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
    /*
     Function to replay audio sound file when clicked on button
     */
    replayButtonClick() {
        this.nativeAudio.stop(this.current.id).then(() => {
            this.nativeAudio.play(this.current.id, ()=>{
                this.nativeAudio.unload(this.current.id);
            });console.log(this.current.question_sound);
        },()=>{

        });
    }
}
