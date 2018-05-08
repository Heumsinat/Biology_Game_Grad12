import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import {HomePage} from "../home/home";
import {QuizPage} from "../quiz/quiz";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { HelpersProvider } from '../../providers/helpers/helpers';
import async from 'async';
import {DatabaseProvider} from "../../providers/database/database";

/**
 * Generated class for the StarterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-starter',
  templateUrl: 'starter.html',
})
export class StarterPage {
  no_of_quiz: any;
  day_of_quiz : any;
  responseData : any;
  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    private alertCtrl: AlertController,
    private platform: Platform, 
    private sqlite: SQLite,
    private helpers: HelpersProvider,
    public db: DatabaseProvider,
  ) {
    // TO-DO by Samak using API #4//
    // Send request from App to get the latest settings
    //var new_no_of_quiz = this.helpers.getData("get_setting_app");
    // this.helpers.getData("get_setting_app").then((result) =>
    // {
    //   console.log("settings = "+localStorage.getItem('settings'));
    //   this.no_of_quiz = result;
    //   // If new settings != old setting, then Update new settings into localStorage settings in App
    //   if(localStorage.getItem('settings') != this.no_of_quiz)
    //     localStorage.setItem('settings',this.no_of_quiz);
    // }, (err) => {
    //   // Connection fail
    //   console.log(JSON.stringify("err = "+err));
    // }).catch((e) => {
    //   console.log('Error in listOfFacilities:' + e);
    // });
    // //this.updateNumberOfQuizColumn(new_no_of_quiz[""]);
    // // ======END OF API #4 ======== //
    //
    // /*
    //  ****** SINAT ******
    //  condition to check number of question that user played and compared with setting before allow user to play game
    //  */
    // this.db.executeSQL(`SELECT count(*) as total FROM user_quizzes WHERE user_id = 1 and created_date = date('now')`)
    //     .then(res => {
    //       let num_q = res.rows.item(0).total; // num_q is a number that user have play for today
    //       localStorage.setItem('num_q',num_q);
    //       console.log('get count number of question', num_q);
    //       // localStorage.setItem('num_q',num_q);
    //       let num_quiz = Number(localStorage.getItem('settings'));
    //       console.log('get number of settings =', num_quiz);
    //     }).catch(e => console.log((e)));

    console.log('get number of settings =', Number(localStorage.getItem('settings')));
    console.log('get count number of question =', Number(localStorage.getItem('num_q')));
    this.day_of_quiz = Number(localStorage.getItem('settings')) - Number(localStorage.getItem('num_q'));

  }

  ionViewDidEnter(){

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad StarterPage');
    this.helpers.getData("get_setting_app").then((result) =>
    {
      console.log("settings = "+localStorage.getItem('settings'));
      this.no_of_quiz = result;
      // If new settings != old setting, then Update new settings into localStorage settings in App
      if(localStorage.getItem('settings') != this.no_of_quiz || localStorage.getItem('settings')==null)
      {
        localStorage.setItem('settings',this.no_of_quiz);
        console.log("settings 2 = "+localStorage.getItem('settings'));
      }
        
      // else
      // localStorage.setItem('settings',this.no_of_quiz);
    }, (err) => {
      // Connection fail
      console.log(JSON.stringify("err = "+err));
    }).catch((e) => {
      console.log('Error in listOfFacilities:' + e);
    });
    //this.updateNumberOfQuizColumn(new_no_of_quiz[""]);
    // ======END OF API #4 ======== //

    // TO-DO by Samak using API #6//
    // Send request from App with params: 1. total no. of records, 2. last downloaded date to get order quiz data from server
    // if total no. of records in order_questions == that of server,
    //  Server returns only the updated records recognized by in App modified_date, in Server updated_date
    // else => the total no. of records is different, then
    //  replace all records in App.

    var self = this;
    this.totalNoOfOrderQuestions()
      .then(function(value) {
        self.helpers.postData(value,"request_data_order_question_app").then((result) => {
          self.responseData = result;
          console.log("Data Inserted Successfully = "+JSON.stringify(self.responseData));
          var codeReturn = JSON.parse(result["code"]);
            console.log("codeReturn = "+codeReturn);
          if(codeReturn==200) 
          {
            // If data is synch successfully, update isSent=1 //
            //console.log("Data Inserted Successfully = "+JSON.parse(JSON.parse(result["equal"])));

            var equalReturn = JSON.parse(result["equal"]);
            console.log("equalReturn = "+equalReturn);
            switch(equalReturn)
            {
              case 1: // num_q is not equal, replace a whole order_questions table
                var objOrderQuestion = result["data"];
                console.log("data = "+objOrderQuestion);
                objOrderQuestion.forEach(item =>{
                  self.updateOrderQuestion(item["id"],item["question_id"],item["next_question_id"], item["updated_at"]);
                  
                });
                console.log("Replace Inserted!");
                
                break;
              case 0: // num_q is equal, update order_questions by id
              var objOrderQuestion = result["data"];
                objOrderQuestion.forEach(item =>{
                  console.log("Item updated_at = "+item["updated_at"]);
                  
                  self.replaceIntoOrderQuestion(item["id"], item["question_id"],item["next_question_id"],item["created_date"], item["updated_at"]);
                });
                console.log("Updated!");
                break;
            }
            
          }
          else
            console.log("Synch Data Error");
          console.log("response = "+JSON.stringify(self.responseData));
        }).catch((e) => {
          console.log('catch in totalNoOfOrderQuestions:' + e);
        });
      })
      .catch((e) => {
        console.log('catch in totalNoOfOrderQuestions:' + e);
      }); 
    // ======END OF API #6 ======== //
    this.navCtrl.push(
        QuizPage);

    /*
     ****** SINAT ******
     condition to check number of question that user played and compared with setting before allow user to play game
     */
    this.db.executeSQL(`SELECT count(*) as total FROM user_quizzes WHERE user_id = 1 and created_date = date('now')`)
        .then(res => {
          let num_q = res.rows.item(0).total; // num_q is a number that user have play for today
          localStorage.setItem('num_q',num_q);
          console.log('get count number of question', num_q);
          // localStorage.setItem('num_q',num_q);
          let num_quiz = Number(localStorage.getItem('settings'));
          console.log('get number of settings =', num_quiz);
        }).catch(e => console.log((e)));


  }

  goToQuiz() {
    // compare number of question that user play today with number that set from settings
    let num_quiz = Number(localStorage.getItem('settings'));
    console.log('get number of settings =', num_quiz);
    let num_q = Number(localStorage.getItem('num_q'));
    console.log('get count number of question =', num_q);
    if (num_q < num_quiz) {
      console.log(num_q);
      console.log(num_quiz);
      this.navCtrl.push(
          QuizPage);
    } else {
      let alert = this.alertCtrl.create({
        title: 'Welcome to Evolution!',
        message: 'You have no more question for today!',
        buttons: ['Ok']
      });
      alert.present();
    }
      // TO-DO by Samak using API #6//
      // Send request from App with params: 1. total no. of records, 2. last downloaded date to get order quiz data from server
      // if total no. of records in order_questions == that of server,
      //  Server returns only the updated records recognized by in App modified_date, in Server updated_date
      // else => the total no. of records is different, then
      //  replace all records in App.
      // ======END OF API #6 ======== //
  }

  goToHomePage() {
    this.navCtrl.push(
        HomePage);
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

  totalNoOfOrderQuestions(){
      //var data_return = [];
      var _data = {
        "number_of_records":"",
        "last_download_date":""
      };
      var self = this;
      var asyncTasks = [];
      var number_of_records ="number_of_records";
  
      var pro = new Promise(function(resolve, reject) {
          var subTasks = [];
          
          // Task to count total number of records in order_questions table
          subTasks.push(async function(callback) {
            var colNames = [];
    
            try {
              var db = await self.sqlite.create({
                name: 'biology.db',
                location: 'default'
              });
              
              var resColNames = await db.executeSql("SELECT COUNT(*) as total FROM order_questions",{});
               
              let num_q = resColNames.rows.item(0).total;
              _data['number_of_records']=num_q;
              callback(null, num_q);
            } catch (err) {
              console.log(err);
            }
          });
    
          // Task to max date from order_questions table
          subTasks.push(async function(callback) {
            //console.log('num_q: ' + num_q);
            try {
              var db = await self.sqlite.create({
                name: 'biology.db',
                location: 'default'
              });
              var resMaxDate = await db.executeSql('SELECT MAX(modified_date) as max_date FROM order_questions',{})
              console.log('resMaxDate: ' + resMaxDate);
              let maxDate = resMaxDate.rows.item(0).max_date;
              console.log('maxDate: ' + maxDate);
              _data['last_download_date']=maxDate;
              callback(null, _data);
            } catch (err) {
              console.error(err);
            }
          });
          /*
          asyncTasks.push(function(callback) {
            async.waterfall(subTasks, (err, data) => {
              if (err) {
                console.error(err);
              } else {
                //data_return.push(data);
                callback(null);
              }
            });
          });
        */
    
        async.series(subTasks, function(err, data) {
          try {
            if (err) {
              console.error(err);
            } else {
              resolve(_data);
              console.log(JSON.stringify(_data));
            }
          } catch (err) {
            console.log(err);
          }
        });
      });
  
      return pro;
    }

    updateOrderQuestion(id: number,question_id:number,next_question_id:number,modified_date:any){
      this.sqlite.create({
        name: 'biology.db',
        location: 'default'
      }).then((db: SQLiteObject)  => {
        db.executeSql('UPDATE order_questions SET question_id=?, next_question_id=?, modified_date=? WHERE id=?', [question_id,next_question_id,modified_date,id])
        .then( res => {
          console.log('Data Updated!');
        })
        .catch((e) => {
          console.log('Catch in Update order_questions:' + e);
        });
      })
      .catch((e) => {
        console.log('Catch in updateOrderQuestion:' + e);
      });
    }

    replaceIntoOrderQuestion(id: number,question_id:number,next_question_id:number,created_date:any,modified_date:any){
      this.sqlite.create({
        name: 'biology.db',
        location: 'default'
      }).then((db: SQLiteObject)  => {
        db.executeSql('REPLACE INTO order_questions(id, question_id,next_question_id,created_date,modified_date) VALUES (?,?,?,?,?)',[id, question_id,next_question_id,created_date,modified_date])
        .then( res => {
          console.log('Data Updated!');
        })
        .catch((e) => {
          console.log('Catch in replaceIntoOrderQuestion:' + e);
        });
      })
    }
}
