import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'; 
import async from 'async';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ToastController, LoadingController, App} from 'ionic-angular';
import { Page } from 'ionic-angular/navigation/nav-util';
import { StarterPage } from '../../pages/starter/starter';
import { DatabaseProvider } from '../database/database';
import { Base64 } from '@ionic-native/base64';

let apiUrl = "http://biology.open.org.kh/api/";

/*
  Generated class for the HelpersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelpersProvider {
  userQuizzes = { "user_id": "" , "number_of_records": "", "last_update_date":""};
  constructor(public http: Http,
    private sqlite: SQLite,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public appCtrl : App,
    public dbProvider: DatabaseProvider,
    public base64: Base64) {
    console.log('Hello HelpersProvider Provider');
  }

  postData(credentials, type){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      //this.http.post(apiUrl+type, JSON.stringify(credentials),{headers: headers})
      console.log("credentials data = "+JSON.stringify(credentials));
      console.log("apiUrl+type = "+apiUrl+type);
      //this.http.post(apiUrl+type, credentials)
      this.http.post(apiUrl+type, credentials,{headers: headers})
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
      
    });
  }

  getData(type){
    return new Promise((resolve, reject) => {
      let headers = new Headers();
      // this.http.get(apiUrl+type, {headers: headers})
      this.http.get(apiUrl+type, {headers: headers})
      .subscribe(res => {
        resolve(res.json());
      }, (err) => {
        reject(err);
      });
      
    });
  }

  // *** Creator: Samak *** //
    // * Function to select DB schema (column names), then construct JSON data to be sent to server* //
    // * Param1: listOfTable: a list of tables whose column name will be retrieved //
    // * Param2: noOfCols: no. of columns to be retrieved //
    // * Return: Promise of JSON DATA to be sent to Server.

    retrieveDBSchemaHelper(listOfTable:string[], noOfCols: number, isUpdate: boolean){
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
                  // colNames: ["full_name","user_name","password","phone_number","gender","province_pcode","district_dcode","school_id"]
                  var index_colName =0;
                  for (let index = 1; index <= noOfCols; index++) {
                      colNames[index_colName]=resColNames.rows.item(index).name;
                      index_colName++;
                  }
                  if(tableName === 'users')
                  {
                    colNames.push("update");
                    colNames.push("photo");
                  }
                    
      
                  callback(null, colNames);
                  } catch (err) {
                  console.log(err);
                  }
              });
          
              subTasks.push(async function(colNames, callback) {
                  console.log('colNames: ' + JSON.stringify(colNames));
                  console.log('tableName: ' + JSON.stringify(tableName));

                  var sql ='SELECT * FROM '+ tableName + ' where isSent=?';
                  var valCondition = 0;
                  var user_info = JSON.parse(localStorage.getItem('userData'));

                  if (isUpdate) {
                    sql ='SELECT * FROM '+ tableName + ' where user_id=?';
                    valCondition = user_info.id;
                  }
                  
                  try {
                      var db = await self.sqlite.create({
                          name: 'biology.db',
                          location: 'default'
                      });
                      
                      console.log('sql select data = '+sql + ' valCon = '+ valCondition + ' ; ls = '+localStorage.getItem('userData'));

                      var resOfflineRecords = await db.executeSql(sql,[valCondition]);

                      console.log('resOfflineRecords: ' + JSON.stringify(resOfflineRecords));
                      if(resOfflineRecords.length==0)
                      {
                        console.log('Not found this user in DB');
                        
                      }

                      for (let i = 0; i < resOfflineRecords.rows.length; i++) {
                          var valFromTable = [];
                          var eachData = resOfflineRecords.rows.item(i)

                          console.log("test eachData in helpers: ");
                          console.log(eachData);
                          console.log(eachData.fb_id);
                          
                          if(tableName==="users") {
                            valFromTable = [eachData.full_name,
                            eachData.user_name,
                            eachData.password,
                            eachData.phone_number,
                            eachData.gender,
                            eachData.school_id,
                            eachData.fb_id];
                            
                          } else if (tableName==="user_quizzes") {
                          // Retrieve All Columns Name From table user_quizzes //
                            valFromTable = [eachData.user_id,
                            eachData.question_id,
                            eachData.user_ans_id,
                            eachData.ans_correct,
                            eachData.score,
                            eachData.created_at];
                          }

                          var col = null;
                          var obj = {};

                          for (let j = 0; j < colNames.length; j++) {
                            // Construct JSON string with key (column name)/value (offline data) pair //
                            col = colNames[j];
                            obj[col] = valFromTable[j];

                            if (tableName==="users" && colNames[j] === "update") {
                              obj[col] = (isUpdate) ? "1" : "";
                            } else if (tableName==="users" && colNames[j] === "photo") {
                              console.log("isUpdate ="+isUpdate);

                              if (isUpdate) {
                                obj[col] = ""; // => no need to update picture profile, so set it to be blank.
                              } else { // => if insert new, and facebook id is exist, get picture profile for sending to server.
                                obj[col]="";
                                if (eachData.fb_id != null)  {
                                  let filePath: string = 'file:///data/user/0/kh.org.open.biology12/files/'+ eachData.fb_id +'.jpg';
                                  let base64File: string = await self.base64.encodeFile(filePath);
                                  obj[col] = base64File;
                                }   
                                
                              }
                            }
                          }
                          
                          _data[tableName].push(obj);
                          console.log("DATA");
                          console.log(obj);
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

    
      // *** Creator: Samak @11-05-2018 *** //
    // * Function to synchronize data into server, then update isSent = 1 * //
    // * Param1: listOfTable => array of table names whose data to be sent to Server * //
    // * Param2: apiAddress => URL Address of Server's API* //
    // * Param3: noOfColsInSynch => No. of columns to be retrieved from table* //
    // * Param4: goToPage => Page to be pushed to after all processes done * //
    
    synchUserQuizeToServer(listOfTable: string[],apiAddress: string,noOfColsInSynch: number, redirect: boolean, goToPage: Page, isUpdate:boolean) {
      
      var self = this;
      //this.retrieveDBSchema(listOfTable)
      self.retrieveDBSchemaHelper(listOfTable,noOfColsInSynch,isUpdate)
        .then(function(value) {
          // self.postData(value,"insert_user_quiz_app").then((result) => {
          self.postData(value,apiAddress).then((result) => {
            //self.responseData = result;
            if(JSON.parse(result["code"])==200) {
              if(apiAddress==="user_register_or_update_app")
              {
                console.log("API ="+apiAddress);
                localStorage.setItem('userData',JSON.stringify(result["user"]));
              }
              
              // If data is synch successfully, update isSent=1 //
              self.updateIsSentColumn(listOfTable);
              console.log("Data Inserted Successfully for "+listOfTable);
            } else {
              console.log("Synch Data Error");
            }

            console.log("response in synchUserQuizeToServer= "+JSON.stringify(result));
            //if(goToPage!=StarterPage)
            if(redirect)
              self.appCtrl.getActiveNav().push(goToPage);
          }, (err) => {
          // Connection fail
          console.log(JSON.stringify("err while postData= "+err));
          })
          .catch((e) => {
              console.log('bleh:' + e);
            });
        })
        .catch((e) => {
          console.log('bleh:' + e);
        });
    }

     // *** Creator: Samak @11-05-2018 *** //
    // * Function to synchronize data into server, then update isSent = 1 * //
    // * Param1: listOfTable => array of table names whose data to be sent to Server * //
    // * Param2: apiAddress => URL Address of Server's API* //
    // * Param3: noOfColsInSynch => No. of columns to be retrieved from table* //
    
    synchUserRegistrationToServer(listOfTable: string[],apiAddress: string,noOfColsInSynch: number, pushTo: Page, isUpdate: boolean) {
      
      var self = this;
      //this.retrieveDBSchema(listOfTable)
      self.retrieveDBSchemaHelper(listOfTable,noOfColsInSynch,isUpdate)
        .then(function(value) {
          console.log('value to be sent:');
          console.log(value);
          self.postData(value,apiAddress).then((result) => {
            //self.responseData = result;
            if(JSON.parse(result["code"])==200) 
            {
              console.log("API ="+apiAddress +' and isUpdate = '+isUpdate);
              
              
              // If data is synch successfully, update isSent=1 //
              //self.updateIsSentColumn(listOfTable);
              console.log(result["inserted_user"]);
              localStorage.setItem('userData',JSON.stringify(result["inserted_user"]));
              if (isUpdate == false) {
                self.updateUserIdOffline(result["inserted_user"].id);
                  
              }
              // else self.updateIsSentColumn(listOfTable);
              console.log("Data Inserted Successfully for "+listOfTable);
              self.appCtrl.getActiveNav().push(pushTo);
            }
            else if(JSON.parse(result["code"])==500)
            {
              self.updateIsSentColumn(listOfTable);
              self.presentToast("ឈ្មោះសម្គាល់នេះត្រូវបានគេប្រើរួចហើយ!")
            }
            else
              console.log("Synch Data Error");
            console.log("response in synchUserQuizeToServer= "+JSON.stringify(result));
          }, (err) => {
          // Connection fail
          console.log(JSON.stringify("err while postData= "+err));
          })
          .catch((e) => {
              console.log('bleh:' + e);
            });
        })
        .catch((e) => {
          console.log('bleh:' + e);
        });
    }

    // *** Creator: Samak @11-05-2018 *** //
    // * Function to update isSent after data has been synchronized into server * //
    // * Param1: listOfTable => array of table names whose isSent column to be updated from 0 to 1 * //
  
    updateIsSentColumn(listOfTable:string[]){
      this.sqlite.create({
        name: 'biology.db',
        location: 'default'
      }).then((db: SQLiteObject)  => {
        for (var tableName of listOfTable) {
          db.executeSql('UPDATE '+ tableName +' SET isSent=? WHERE isSent=0', [1])
          .then( res => {
            console.log('Data Updated in updateIsSentColumn');
          })
          .catch(e => console.log(e));
        }
      })
    }

    // *** Creator: Samak @11-05-2018 *** //
    // * Function to update user_id after data has been synchronized into server * //
    // * Param1: userID => User_Id that gets from Server * //
  
    updateUserIdOffline(userID: string){
      this.sqlite.create({
        name: 'biology.db',
        location: 'default'
      }).then((db: SQLiteObject)  => {
          db.executeSql('UPDATE users SET user_id=?,isSent=? WHERE isSent=0', [userID,1])
          .then( res => {
            console.log('Data Updated in updateUserIdOffline to '+userID);
          })
          .catch(e => console.log(e));
      })
    }

     // *** Creator: Samak @21-06-2018 *** //
     // * Function to show loading dialog * //
     // * Param1: duriationTime => how long to show the msg (milli-sec)* //
     // * Param2: str => text msg to be shown * //
    presentLoadingCustom(duriationTime: number, str: string) {
      let loading = this.loadingCtrl.create({
        content: `
          <div class="custom-spinner-container">
            <div class="custom-spinner-box"> `+ str +` </div>
          </div>`,
        duration: duriationTime
      });
    
      loading.onDidDismiss(() => {
        console.log('Dismissed loading');
      });
    
      loading.present();
    }

     // *** Creator: Samak @25-06-2018 *** //
     // * Function to show simple dialog * //
     // * Param1: msg => the msg to be shown * //
    presentToast(msg: string) {
      let toastObj = this.toastCtrl.create({
        message: msg,
        position: "bottom",
        duration: 4000
      });
      toastObj.present();
    }

    // Creator: SAMAK //
    // Function to replace the whole order questions table//
    public replaceIntoUserQuizzes(data: any, goToPage: Page){
      var self = this;
      console.log('inside replaceIntoUserQuizzes!');
      self.sqlite.create({
        name: 'biology.db',
        location: 'default'
      }).then((db: SQLiteObject)  => {
        //for(var iData=0; iData<)
        //var parseData = 
        data.forEach((item, index) =>{
          db.executeSql('REPLACE INTO user_quizzes(id, user_id,question_id,user_ans_id, ans_correct, score, created_at, isSent) VALUES (?,?,?,?,?,?,?,?)',[item["id"],item["user_id"], item["question_id"], item["user_ans_id"], item["ans_correct"], item["score"],item["created_at"],1])
        .then( res => {
          console.log('Data Updated in replaceIntoUserQuizzes!');
          console.log('data.length='+data.length + '& index='+index);
          
          if(data.length == (index+1))
          {
            this.appCtrl.getActiveNav().push(goToPage);
          }

        })
        .catch((e) => {
          console.log('Catch in replaceIntoUserQuizzes:' + JSON.stringify(e));
        });
        });
        
      })
    }

    // Creator: SAMAK @ 26-06-2018//
    //  //
     // *** Creator: Samak @26-06-2018 *** //
    // * Function to get total no. of user quiz and max date of user quiz * //
    // * Param1: userId => whose user quizzes to be count for. * //
    public noOfRecordsInUserQuizzes(userId: number)
    {
      var self = this;
      return new Promise(function(resolve, reject){
        self.dbProvider.executeSQL(`SELECT COUNT(*) as total, MAX(created_at) as maxDate FROM user_quizzes where user_id=${userId}`)
          .then( resNoOfUserQuiz => {
            //console.log("userId in helpers = "+userId);
            //console.log("resNoOfUserQuiz= "+JSON.stringify(resNoOfUserQuiz));
  
            
            //this.userQuizzes['user_id']=String(userId);
            self.userQuizzes.last_update_date=resNoOfUserQuiz.rows.item(0).maxDate;
            self.userQuizzes.number_of_records=resNoOfUserQuiz.rows.item(0).total;
            resolve('done');
          })
          .catch((e) => {
            console.log('Catch in num_user_quizzes in helpers:' + JSON.stringify(e));
          });
        })
      
    }

    // Creator: SAMAK @ 03-07-2018//
    //  //
     // *** Creator: Samak @03-07-2018 *** //
    // * Function to get current question id of user quiz * //
    // * Param1: userId => whose question id to be retrieved . * //
    public getCurrentQID(userId: number)
    {
        var cQID = 0;
        this.dbProvider.executeSQL(`SELECT MAX(created_at) as maxDate, question_id as currentQID FROM user_quizzes where user_id=${userId}`)
          .then( resNoOfUserQuiz => {
            cQID = resNoOfUserQuiz.rows.item(0).currentQID;
            localStorage.setItem('currentQID',cQID.toString());
            console.log('GetCurrent QID = '+cQID);
          })
          .catch((e) => {
            console.log('Catch in getCurrentQID in helpers:' + JSON.stringify(e));
          });
    }
}
