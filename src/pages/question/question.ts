import {Component, ViewChild, ChangeDetectorRef} from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { DatabaseProvider } from "../../providers/database/database";
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
    currentQuestionID:number;
    public playCompleted: boolean;
    isPlaying: boolean= false ;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public db: DatabaseProvider,
        private nativeAudio: NativeAudio,
        private alertCtrl: AlertController,
        private platform: Platform,
        public app: App,
        private changeRef: ChangeDetectorRef,
    ) {
        this.lessonID = navParams.get('lessonID');
        this.currentQuestionID  = this.navParams.get('currentQuestionID');
        this.chapterID = this.navParams.get('chapterID');
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
            this.playCompleted = false;
    }
    /*
     ionViewDidEnter runs when the page has fully entered and is now the active page.
     Display Question query by lesson_id
     */
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

    /*
     ionViewWillLeave(): when View is about to leave, Stopping current playback sound.
     */
    ionViewWillLeave() {
        console.log("ionViewWillLeave(): View is about to leave, Stopping current playback sound.")
        this.nativeAudio.stop(this.current.id).then(() => {
            this.nativeAudio.unload(this.current.id);
        },()=>{

        });
    }
    /*
    Function to get Next sectionID that query by CurrentQuestionID
     this.sectionID = (res.rows.item(0).section_id)+1;
     */
    getSectionID (){
        return this.db.executeSQL(`SELECT * FROM questions WHERE id = ${this.currentQuestionID}`)
            .then(res => {
                this.sectionID = (res.rows.item(0).section_id)+1;
                console.log(this.sectionID);
            }).catch(e => console.log((e)))
    }
    /*
    Function to get Next Question query by section_id ORDER BY id ASC LIMIT 1.
     */
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
            }).catch(e => console.log((e)));
    };

    /*
    Get list of answer query by question_id
     */
    getAnswers(questions_id: number) {
        this.db.executeSQL(`SELECT * FROM answers WHERE question_id = ${questions_id}`)
            .then(res => {
                this.answers = [];
                console.log('My answer: ',res);
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

    /*
        this Function to display content on screen
     */
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
                        console.log('hi');
                        this.getAnswers(this.current.id);
                        this.nativeAudio.preloadComplex(this.current.id, 'assets/sounds/'+this.current.question_sound, 1,1,0).then(()=>{
                            this.nativeAudio.play(this.current.id, ()=>{
                                this.isPlaying = true;
                                this.nativeAudio.unload(this.current.id);
                                this.isPlaying = false;
                                this.playCompleted = true;
                                this.changeRef.detectChanges();
                                
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
                    this.isPlaying = true;
                    this.nativeAudio.unload(this.current.id);
                    this.isPlaying = false;
                    this.playCompleted = true;
                    this.changeRef.detectChanges();
                    
                });
            });console.log(this.current.question_sound);
        }
    }
    /*
    this function when click on answer and push to SectionReviewPage with
    (answerCorrect, sectionID, questionID, lessonId, chapterID)
     */
    public answer (correct_ans: number, question_id: number){
        // if correct_ans , play audio correct then push to SectionReviewPage
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
            /// if incorrect play wrong audio and push to SectionReviewPage
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
    // replayButtonClick() {
    //     this.nativeAudio.stop(this.current.id).then(() => {
    //         this.nativeAudio.play(this.current.id, ()=>{
    //             this.nativeAudio.unload(this.current.id);
    //         });console.log(this.current.question_sound);
    //     },()=>{

    //     });
    // }

    replayButtonClick() {
        if (this.isPlaying){
            this.nativeAudio.stop(this.current.id).then(() => {
                this.nativeAudio.unload(this.current.id).then(()=>{
                    this.content(this.current.id);    
                    console.log("Replay sound:",this.current.id);
                });
            });
        } else{
            this.content(this.current.id);    
        }
       
    }
    /*
    Function back page when clicked on button
     */
    backButtonClick() {
        this.navCtrl.pop();
    }
}
