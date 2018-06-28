import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { Toast } from '@ionic-native/toast';
import { FormPage } from '../form/form';
import { MyApp } from '../../app/app.component';
import { LoginPage } from '../login/login';
import { FacebookPage } from '../facebook/facebook';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { StarterPage } from '../starter/starter';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  public infoID;
  isLoggedIn: boolean = false;
  users: any;
  userQuizzes = { "user_id": "", "number_of_records": "", "last_update_date":""};

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public platform: Platform,
    private fb: Facebook,
    private toast: Toast,
    public helpers: HelpersProvider,
    private sqlite: SQLite,
    public databaseProvider : DatabaseProvider
  ) {

    typeof this.navParams.get('infoID') == 'undefined' ? this.infoID = 'root' : this.infoID = this.navParams.get('infoID');


  }

  /*Function connect to facebook users*/

  fbForm() {

    this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if (res.status === "connected") {
          this.isLoggedIn = true;
          this.toast.show('គណនីហ្វេសប៊ុកពិតជាត្រូវត្រឹម សូមធ្វើការចុះឈ្មោះបន្តទៀត', '5000', 'center').subscribe(toast => { });
          // API #1.1.1 for checking fb user existence. //
          this.getUserDetail(res.authResponse.userID);
        } else {
          this.isLoggedIn = false;
          console.log("Fail!");

        }

      })
      .catch(e => console.log('Error logging into Facebook', e));


  }


  /**Get data from facebook and push data to form page
   * 
  */
  getUserDetail(fbID) {
    const me = this;
    this.fb.api("/" + fbID + "/?fields=id,email,name,picture", ["public_profile"])

      .then(res => {
        console.log(res);
        var dataTobePosted = {"fb_id" : fbID};
        // Send request to Server for API #1.1.1
        this.helpers.postData(dataTobePosted,"check_fb_id").then((resultFbId) => {
          console.log('resultFbId ='+JSON.stringify(resultFbId));
          var codeReturn = JSON.parse(resultFbId["code"]);
          switch(codeReturn){
            case 200:
              //User exists (in Table Users)
              localStorage.setItem('userData',JSON.stringify(resultFbId["user"]));
              console.log('user id in welcome = '+resultFbId["user"].id);
              this.userQuizzes.user_id=resultFbId["user"].id;
              this.noOfRecordsInUserQuizzes(resultFbId["user"].id);
            /// Access to API #3 ///
            this.helpers.postData(this.userQuizzes, "request_data_from_user_quiz_app").then((resultUserQuizz) => {
              // self.responseData = result;
              console.log("Data Inserted Successfully in resultUserQuizz = "+JSON.stringify(resultUserQuizz));
              // {"code":"200","equal":"2","data":[{"id":1,"user_id":1,"question_id":1,"user_ans_id":3,"ans_correct":1,"score":1,"created_at":"2018-06-22 03:37:57"}]}
              var codeReturn = JSON.parse(resultUserQuizz["code"]);
              console.log("codeReturn = "+codeReturn);
              if(codeReturn==200) 
              {
                // If data is synch successfully, update isSent=1 //
                //console.log("Data Inserted Successfully = "+JSON.parse(JSON.parse(result["equal"])));

                var equalReturn = JSON.parse(resultUserQuizz["equal"]);
                console.log("equalReturn = "+equalReturn);
                switch(equalReturn)
                {
                  case 1: // num_q in Server is equal, do nothing
                    console.log("Equal");
                    this.navCtrl.push(StarterPage);
                    break;
                  case 0: // num_q in Server is less than, send the rest of records and last_date to Server
                    var objOrderQuestion = resultUserQuizz["data"];
                    this.helpers.synchUserQuizeToServer(["user_quizzes"],"insert_user_quiz_app",6,StarterPage);
                    console.log("Updated isSent=1 in user_quizzes table.");
                    break;
                  case 2: // num_q in Server is greater than, update user_quizzes by adding the returned records
                    var objOrderQuestion = resultUserQuizz["data"];
                    this.helpers.replaceIntoUserQuizzes(objOrderQuestion,StarterPage);
                    console.log("Updated in replaceIntoUserQuizzes!");
                    break;
                }
              
              }
              else
                console.log("Synch Data Error");
            }, (err) => {
              // Connection fail
              console.log(JSON.stringify("err in link_user_quizzes = " + err));
            });
            console.log("Login Successfully");

            
             
            break;
    
            case 300:
            // User doesn't exist (in Table Users)
              this.navCtrl.push(FormPage, { data: res });
            break;
    
            case 400:
            // If fb_id is blank
            break;
    
            case 500:
            // Input data is not in JSON format
            break;
          }
        }, (err) => {
          console.log(JSON.stringify("err in function requestToGetExistingFbId= " + err));
        }).catch((e) => {
          console.log('Catch in function requestToGetExistingFbId: ' + e);
        });
      })
      .catch(e => {
        console.log(e);
      });
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

  public info(id) {
    this.navCtrl.push(
      WelcomePage, {
        infoID: id
      });
  }

  public createForm() {
    this.navCtrl.push(FormPage);
  }

  public login() {
    this.navCtrl.push(LoginPage);
  }

  public backButtonClick() {
    this.navCtrl.pop();
  }

  private exitButtonClick() {
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

  public noOfRecordsInUserQuizzes(userId: number)
    {
      let sql = `SELECT COUNT(*) as total, MAX(created_at) as maxDate FROM user_quizzes where user_id=${userId}`;

      this.databaseProvider.executeSQL(sql)
      .then( resNoOfUserQuiz => {
        let num_user_quizzes = resNoOfUserQuiz.rows.item(0).total;
        let max_date_user_quizzes = resNoOfUserQuiz.rows.item(0).maxDate;
        this.userQuizzes['last_update_date']=max_date_user_quizzes;
        this.userQuizzes['number_of_records']=num_user_quizzes;
      })
      .catch((e) => {
        console.log('Catch in num_user_quizzes in welcomes:' + JSON.stringify(e));
      });
    }
}
