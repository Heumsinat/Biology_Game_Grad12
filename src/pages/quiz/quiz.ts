
import { Component , ChangeDetectorRef} from '@angular/core';
import {AlertController, App, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { DatabaseProvider } from "../../providers/database/database";
import {SectionPage} from "../section/section";
import { NativeAudio } from '@ionic-native/native-audio';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import async from 'async';
import { Network } from '@ionic-native/network';


/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

  // *** Creator: SINAT *** //

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
    responseData : any;
    public playCompleted: boolean;
    userId: number;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        private alertCtrl: AlertController,
        private platform: Platform,
        public db: DatabaseProvider,
        private nativeAudio: NativeAudio,
        private app: App,
        private helpers: HelpersProvider,
        private sqlite: SQLite,
        private changeRef: ChangeDetectorRef,
        private network: Network
    ) {
        this.userId = JSON.parse(localStorage.getItem("userData")).id;
        this.lessonID = navParams.get('lessonID'); //Get param lessonID from SectionPage
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
        this.playCompleted = false;
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
                            created_at:res.rows.item(i).created_at,
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
     ionViewWillLeave(): View is about to leave, Stopping playback sound current.id.
     */
    ionViewWillLeave() {
        console.log("ionViewWillLeave(): View is about to leave, Stopping current playback sound.")
        this.nativeAudio.stop(this.current.id).then(() => {
            this.nativeAudio.unload(this.current.id);
        },()=>{

        });
    }

    /*
     this function use to get nextQuestionID by 
     SELECT * FROM order_questions WHERE question_id = ${this.currentQuestionID}.
     */
    getNextQuestions(){
        // console.log("this.currentQuestionID = "+this.currentQuestionID);
        return this.db.executeSQL(`SELECT * FROM order_questions WHERE question_id = ${this.currentQuestionID}`)
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
        return this.db.executeSQL(`SELECT * FROM questions WHERE id = ${this.nextQuestionID}`) // =?> Error 
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
                        created_at:res.rows.item(i).created_at,
                        modified_date:res.rows.item(i).modified_date,
                    });
                }
            }).catch(e => console.log((e)));
    }
    /*
    Function to display content on screen of question and answer with sound
     */
    content(id) {
       
            this.getNextQuestions().then(()=>{
                this.current = this.questions[id];
                console.log('TEST CUR:', this.current);
                console.log("nextQuestionID in content = "+this.nextQuestionID);
                this.getAnswers(this.current.id);
                this.nativeAudio.preloadComplex(this.current.id, 'assets/sounds/'+this.current.question_sound,1,1,0).then(()=>{
                    this.nativeAudio.play(this.current.id, ()=>{
                        this.nativeAudio.unload(this.current.id);
                        this.playCompleted = true;
                        this.changeRef.detectChanges();
                    });
                });
                console.log(this.current.question_sound);
            });
    }
    /*
     this function when click on answer and push to SectionReviewPage with
     (answerCorrect, sectionID, questionID) and save data to Table user_quizzes
     */
    public answer (correct_ans: number, question_id: number, answer_order:number ){
        console.log('USER ANSWER ID', answer_order);
        //console.log('date now = '+ date('now'));
        // if correct_ans , play audio correct then push to SectionReviewPage
        var listOfTable = ["user_quizzes"];
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
                             //Save data to table user_quizzes
                             Samak API #2
                            */

                            //Save User_Question
                            this.db.executeSQL(`INSERT INTO user_quizzes ( user_id, question_id,user_ans_id, ans_correct, score, created_at, isSent) 
                                            VALUES (` + this.userId + `,` + question_id + `,` + answer_order + `,` + correct_ans + `,1, datetime('now'), 0)`).then(res=>{

                                console.log('Current number of question that has insert', res);

                            });
                            // If There is Interent Connection,
                            // Synch offline data into server
                            if(this.network.type != "none")
                            {
                                
                                this.helpers.synchUserQuizeToServer(listOfTable,"insert_user_quiz_app",6,QuizPage);
                            }
                            //End Save
                            // console.log(this.current.question_sound);
                            localStorage.setItem("currentQID",question_id);
                            this.navCtrl.push(SectionPage, {
                                answerCorrect: correct_ans,
                                sectionID: section_id,
                                questionID: question_id
                            });

                            // Get nextQID by SELECT * FROM order_questions WHERE question_id = ${localStorage.getItem("currentQID")
                            console.log("SELECT * FROM order_questions WHERE question_id ="+localStorage.getItem("currentQID"));
                            this.db.executeSQL(`SELECT * FROM order_questions WHERE question_id = ${localStorage.getItem("currentQID")}`)
                                .then(res => {
                                    //this.questions = {};
                                    var nextQID:any;
                                    console.log("res result in getNextQuestionID = "+JSON.stringify(res));
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
                            this.db.executeSQL(`INSERT INTO user_quizzes ( user_id, question_id,user_ans_id, ans_correct, score, created_at, isSent) 
                                            VALUES (` + this.userId + `,` + question_id + `,` + answer_order + `,` + correct_ans + `,1, datetime('now'), 0)`).then(res=>{
                                console.log('Current number of question that has insert', res);

                            });
                            // If There is Interent Connection,
                            // Synch offline data into server
                            if(this.network.type != "none")
                            {
                                this.helpers.synchUserQuizeToServer(listOfTable,"insert_user_quiz_app",6,QuizPage);
                            }
                            
                            //End Save
                            // console.log(this.current.question_sound);
                            localStorage.setItem("currentQID",question_id);
                            this.navCtrl.push(SectionPage, {
                                answerCorrect: correct_ans,
                                sectionID: section_id,
                                questionID: question_id
                            });
                            // Get nextQID by SELECT * FROM order_questions WHERE question_id = ${localStorage.getItem("currentQID")
                            this.db.executeSQL(`SELECT * FROM order_questions WHERE question_id = ${localStorage.getItem("currentQID")}`)
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
     Function to replay audio sound file of current.id of question when clicked on button
     */
    replayButtonClick() {
        this.nativeAudio.stop(this.current.id).then(() => {
            this.nativeAudio.play(this.current.id, ()=>{
                this.nativeAudio.unload(this.current.id);
            });console.log(this.current.question_sound);
        },()=>{

        });
    }

    // *** END Creator: SINAT *** //

    
    
    // *** Creator: Samak *** //
    // * Function to select DB schema (column names), then construct JSON data to be sent to server* //
    // * Params: listOfTable: a list of tables whose column name will be retrieved //
    // * Return: Promise of JSON DATA to be sent to Server.

    retrieveDBSchema(listOfTable:string[]){
    var data_return = [];
    var _data = {};
    var self = this;
    var asyncTasks = [];

    var pro = new Promise(function(resolve, reject) {
        for (var tableName of listOfTable) {
            console.log('tableName = '+tableName);
        var subTasks = [];
        _data[tableName] = [];
        
        subTasks.push(async function(callback) {

            try {
            var db = await self.sqlite.create({
                name: 'biology.db',
                location: 'default'
            });
    
            var resColNames = await db.executeSql("PRAGMA table_info('"+ tableName +"')",{});
            var colNames = [];
            var index_colName =0;
            for (var index = 1; index < 6; index++) {
                colNames[index_colName]=resColNames.rows.item(index).name;
                index_colName++;
            }

            callback(null, colNames);
            } catch (err) {
            console.log(err);
            }
        });
    
        subTasks.push(async function(colNames, callback) {
            console.log('colNames: ' + JSON.stringify(colNames));
            try {
            var db = await self.sqlite.create({
                name: 'biology.db',
                location: 'default'
            });
            var resOfflineRecords = await db.executeSql('SELECT * FROM user_quizzes where isSent=?',[0])
            //var resOfflineRecords = await db.executeSql('SELECT * FROM user_quizzes',[])
            console.log('resOfflineRecords: ' + JSON.stringify(resOfflineRecords));
            //console.log('object of resOfflineRecords: '+JSON.parse(resOfflineRecords));
            for (var i = 0; i < resOfflineRecords.rows.length; i++) {
                
                var eachData = resOfflineRecords.rows.item(i);
                console.log("test eachData: "+eachData);
                // Retrieve All Columns Name From table user_quizzes //
                var valFromTable = [eachData.user_id,
                eachData.question_id,
                eachData.user_ans_id,
                eachData.ans_correct,
                eachData.score];
                var col = null;
                var obj = {};
                for (var j = 0; j < colNames.length; j++) {
                // Construct JSON string with key (column name)/value (offline data) pair //
                col = colNames[j];
                obj[col] = valFromTable[j];
                }
                
                _data[tableName].push(obj);
                console.log('_data = ' + JSON.stringify(_data));
            }
            callback(null, _data);
            } catch (err) {
            console.error(err);
            }
        });
    
        asyncTasks.push(function(callback) {
            async.waterfall(subTasks, (err, data) => {
            if (err) {
                console.error(err);
            } else {
                data_return.push(data);
                callback(null);
            }
            });
        });
        }
    
        async.series(asyncTasks, function(err, data) {
        if (err) {
            console.error(err);
        } else {
            resolve(data_return);
            console.log(JSON.stringify(data_return));
        }
        });
    });

    return pro;
    }

    
}
