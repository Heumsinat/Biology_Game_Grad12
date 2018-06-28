import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'; 
import async from 'async';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { ToastController, LoadingController, App} from 'ionic-angular';
import { Page } from 'ionic-angular/navigation/nav-util';
import { StarterPage } from '../../pages/starter/starter';

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
    public appCtrl : App) {
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

    retrieveDBSchemaHelper(listOfTable:string[], noOfCols: number){
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
                 colNames.push("update");
  
              callback(null, colNames);
              } catch (err) {
              console.log(err);
              }
          });
      
          subTasks.push(async function(colNames, callback) {
              console.log('colNames: ' + JSON.stringify(colNames));
              console.log('tableName: ' + JSON.stringify(tableName));
              try {
              var db = await self.sqlite.create({
                  name: 'biology.db',
                  location: 'default'
              });
              var resOfflineRecords = await db.executeSql('SELECT * FROM '+ tableName + ' where isSent=?',[0])
              console.log('resOfflineRecords: ' + JSON.stringify(resOfflineRecords));
              for (let i = 0; i < resOfflineRecords.rows.length; i++) {
                var valFromTable = [];
                  var eachData = resOfflineRecords.rows.item(i);
                  console.log("test eachData in helpers: "+eachData);
                  if(tableName==="users")
                  {
                    valFromTable = [eachData.full_name,
                    eachData.user_name,
                    eachData.password,
                    eachData.phone_number,
                    eachData.gender,
                    eachData.school_id,
                    eachData.fb_id];
                  }
                  else if(tableName==="user_quizzes")
                  {
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
                    if(tableName==="users" && colNames[j] === "update" )
                      obj[col] = "";
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

    
      // *** Creator: Samak @11-05-2018 *** //
    // * Function to synchronize data into server, then update isSent = 1 * //
    // * Param1: listOfTable => array of table names whose data to be sent to Server * //
    // * Param2: apiAddress => URL Address of Server's API* //
    // * Param3: noOfColsInSynch => No. of columns to be retrieved from table* //
    // * Param4: goToPage => Page to be pushed to after all processes done * //
    
    synchUserQuizeToServer(listOfTable: string[],apiAddress: string,noOfColsInSynch: number, goToPage: Page) {
      
      var self = this;
      //this.retrieveDBSchema(listOfTable)
      self.retrieveDBSchemaHelper(listOfTable,noOfColsInSynch)
        .then(function(value) {
          // self.postData(value,"insert_user_quiz_app").then((result) => {
          self.postData(value,apiAddress).then((result) => {
            //self.responseData = result;
            if(JSON.parse(result["code"])==200) 
            {
              if(apiAddress==="user_register_or_update_app")
              {
                console.log("API ="+apiAddress);
                localStorage.setItem('userData',JSON.stringify(result["user"]));
              }
                
              
              // If data is synch successfully, update isSent=1 //
              self.updateIsSentColumn(listOfTable);
              console.log("Data Inserted Successfully for "+listOfTable);
            }
            else
              console.log("Synch Data Error");
            console.log("response in synchUserQuizeToServer= "+JSON.stringify(result));
            if(goToPage!=StarterPage)
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
    
    synchUserRegistrationToServer(listOfTable: string[],apiAddress: string,noOfColsInSynch: number, pushTo: Page) {
      
      var self = this;
      //this.retrieveDBSchema(listOfTable)
      self.retrieveDBSchemaHelper(listOfTable,noOfColsInSynch)
        .then(function(value) {
          // self.postData(value,"insert_user_quiz_app").then((result) => {
          self.postData(value,apiAddress).then((result) => {
            //self.responseData = result;
            if(JSON.parse(result["code"])==200) 
            {
              console.log("API ="+apiAddress);
              localStorage.setItem('userData',JSON.stringify(result["inserted_user"]));
              
              // If data is synch successfully, update isSent=1 //
              self.updateIsSentColumn(listOfTable);
              console.log("Data Inserted Successfully for "+listOfTable);
              self.appCtrl.getActiveNav().push(pushTo);
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
    /* // Creator: SAMAK //
    // Function to replace the whole order questions table//
    public replaceIntoUserQuizzes(id: number,user_id:number,question_id:number,user_ans_id: number, ans_correct: number, score: number, created_at:any, isSent: number){
      console.log('inside replaceIntoUserQuizzes!');
      this.sqlite.create({
        name: 'biology.db',
        location: 'default'
      }).then((db: SQLiteObject)  => {
        db.executeSql('REPLACE INTO user_quizzes(id, user_id,question_id,user_ans_id, ans_correct, score, created_at, isSent) VALUES (?,?,?,?,?,?,?,?)',[id, user_id,question_id,user_ans_id, ans_correct, score, created_at,isSent])
        .then( res => {
          console.log('Data Updated in replaceIntoUserQuizzes!');
        })
        .catch((e) => {
          console.log('Catch in replaceIntoUserQuizzes:' + JSON.stringify(e));
        });
      })
    } */



    // Creator: SAMAK @ 26-06-2018//
    //  //
     // *** Creator: Samak @26-06-2018 *** //
    // * Function to get total no. of user quiz and max date of user quiz * //
    // * Param1: userId => whose user quizzes to be count for. * //
    public noOfRecordsInUserQuizzes(userId: number)
    {
      return new Promise((resolve, reject) => {
        this.sqlite.create({
          name: 'biology.db',
          location: 'default'
        }).then((db: SQLiteObject)  => {
          db.executeSql('SELECT COUNT(*) as total, MAX(created_at) as maxDate FROM user_quizzes where user_id=? ',[userId])
          .then( resNoOfUserQuiz => {
            console.log("userId in helpers = "+userId);
            console.log("resNoOfUserQuiz= "+JSON.stringify(resNoOfUserQuiz));
  
            let num_user_quizzes = resNoOfUserQuiz.rows.item(0).total;
            let max_date_user_quizzes = resNoOfUserQuiz.rows.item(0).maxDate;
            this.userQuizzes['user_id']=String(userId);
            this.userQuizzes['last_update_date']=max_date_user_quizzes;
            this.userQuizzes['number_of_records']=num_user_quizzes;
          })
          .catch((e) => {
            console.log('Catch in num_user_quizzes in helpers:' + JSON.stringify(e));
          });
        })
      })
    }
}
