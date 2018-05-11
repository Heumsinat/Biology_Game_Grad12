import { Http, Headers } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map'; 
import async from 'async';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

let apiUrl = "http://biology.open.org.kh/api/";

/*
  Generated class for the HelpersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HelpersProvider {

  constructor(public http: Http,
    private sqlite: SQLite) {
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
    // * Params: listOfTable: a list of tables whose column name will be retrieved //
    // * Return: Promise of JSON DATA to be sent to Server.

    retrieveDBSchemaHelper(listOfTable:string[]){
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

    
      // *** Creator: Samak *** //
    // * Function to synchronize data into server, then update isSent = 1 * //
    
    synchUserQuizeToServer() {
      var listOfTable = ["user_quizzes"];
      var self = this;
      //this.retrieveDBSchema(listOfTable)
      self.retrieveDBSchemaHelper(listOfTable)
        .then(function(value) {
          self.postData(value,"insert_user_quiz_app").then((result) => {
            //self.responseData = result;
            if(JSON.parse(result["code"])==200) 
            {
              // If data is synch successfully, update isSent=1 //
              self.updateIsSentColumn(listOfTable);
              console.log("Data Inserted Successfully for "+listOfTable);
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

    // *** Creator: Samak *** //
    // * Function to update isSent after data has been synchronized into server * //
  
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

}
