import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { StarterPage } from '../starter/starter';
import { FormPage } from '../form/form';
import { Network } from '@ionic-native/network';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatabaseProvider } from '../../providers/database/database';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  link_login = "user_login_app";
  link_user_quizzes = "request_data_from_user_quiz_app";
  userData = { "name_id": "", "pwd": "" };

  loginValidate: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, 
    public platform: Platform,
    public network: Network,
    public helpers: HelpersProvider,
    public formBuilder: FormBuilder,
    private sqlite: SQLite,
    public databaseProvider : DatabaseProvider) {
      this.loginValidate = formBuilder.group({
        usr: ['',Validators.compose([Validators.required])],
        pwd: ['',Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  showAlert(title: string, message: string) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: message,
      buttons: ['OK']
    });
    alert.present();
  }

  signin() {
    
    if (this.network.type != "none") {
      if(this.loginValidate.valid)
      {
        this.helpers.postData(this.userData, this.link_login).then((result) => {
          
          console.log("result = " + JSON.stringify(result));
          if (result["message"] == "Ok") {
            let tranLoading = '';
            this.helpers.presentLoadingCustom(1000, "កំពុងផ្ទុក...");
            //console.log("user = " + JSON.stringify(result["user"]));
            localStorage.setItem('userData', JSON.stringify(result["user"]));
            // result["user"] = {id":1,"full_name":"u1","fb_id":"","phone_number":"012000000","gender":1,"school_id":"1020101005"}
            //var user = JSON.parse(result["user"]);

            console.log('user= '+result["user"]);
            this.helpers.userQuizzes.user_id=result["user"].id;
            this.helpers.noOfRecordsInUserQuizzes(result["user"].id).then(res=> {
              //alert("Other task");
              /// Access to API #3 ///
              this.helpers.postData(this.helpers.userQuizzes, this.link_user_quizzes).then((resultUserQuizz) => {
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
                      
                      this.navCtrl.push(StarterPage);
                      console.log("Equal");
                      break;
                    case 0: // num_q in Server is less than, send the rest of records and last_date to Server
                      var objOrderQuestion = resultUserQuizz["data"];
                      this.helpers.synchUserQuizeToServer(["user_quizzes"],"insert_user_quiz_app",6,true,StarterPage,false);
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

              }).catch(e => console.log(JSON.stringify(e)));
            
            
           
          }
          // User does not exist //
          else if (result["message"] == "User doesn't exist") {
            let tranUsrNotExist = '';
            this.helpers.presentToast("មិនមានឈ្មោះអ្នកប្រើប្រាស់!");
          }
          // Wrong password //
          else if (result["message"] == "Incorrect password") {
            this.helpers.presentToast("លេខកូដសម្ងាត់មិនត្រឹមត្រូវទេ សូមព្យាយាមម្ដងទៀត");
          }
          else
            console.log("Error login");
        }, (err) => {
          // Connection fail
          console.log(JSON.stringify("err = " + err));
        });
      }
      else
      {
        this.helpers.presentToast("សូមបញ្ចូលឈ្មោះអ្នកប្រើនិងលេខសម្ងាត់");
      }
    }
    else
    {
      this.helpers.presentToast("មិនមានសេវាអ៊ិនធឺណិតទេ");
    }
  } 

  private backButtonClick(){
    let confirm = this.alertCtrl.create({
      title: 'ចាកចេញ​ពីទំព័រនេះ?​',
      subTitle: '',
      buttons: [
        {
          text: 'បោះបង់',
          role: 'calcel'
        }, {
          text: 'ចាកចេញ',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    confirm.present();

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
} 




