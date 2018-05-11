import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, Events } from 'ionic-angular';
import { DatabaseProvider } from "../../providers/database/database";
// import { Http } from '@angular/http';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { WelcomePage } from '../welcome/welcome';
import { HomePage } from '../home/home';
import { StarterPage } from '../starter/starter';
import { NumberFormatStyle } from '@angular/common';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';

/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-form',
  templateUrl: 'form.html',
})
export class FormPage {

  public data = { fullName:"", userName:"", password:"",phone:"", gender:"", school:"", district:"", province:"" };

  
  provinces: any [];
  districts: any [];
  school_lists: any [];


  step: any;
  stepCondition: any;
  stepDefaultCondition: any;
  currentStep: any;

  isLoggedIn:boolean = false;
  private userFb: any;

  constructor(public navCtrl: NavController, 
              public alertCtrl: AlertController, 
              public platform: Platform,
              public navParams: NavParams,
              public evts: Events,
              //public http: Http,
              private sqlite: SQLite,
              private toast: Toast,
              public db: DatabaseProvider,
              public fb: Facebook) { 
                
                this.getFbData();
                
                //  this.data.fullName = this.userFb.name;
                //  console.log(this.data.fullName);
                  this.getProvinces();
                  // console.log('getprovince',this.provinces);
                  this.getDistricts();
                  this.getSchools();
                  this.navParams.get('userParams');

                 

  
                  console.log('Hello SqlStorage Provider');

                  this.step = 1;
                  this.stepCondition = true;
                  this.stepDefaultCondition = this.stepCondition;
                  this.evts.subscribe('step:changed', step => {
                    this.currentStep = step;
                    this.stepCondition = this.stepDefaultCondition;
                  });
                  this.evts.subscribe('step:next', () => {
                    console.log('Next pressed: ', this.currentStep);
                  });
                  this.evts.subscribe('step:back', () => {
                    console.log('Back pressed: ', this.currentStep);
                  });

  }

  getFbData(){
      this.fb.login(['public_profile', 'user_friends', 'email'])
      .then(res => {
        if(res.status === "connected") {
          this.isLoggedIn = true;
          return this.getUserDetail(res.authResponse.userID);
        } else {
          this.isLoggedIn = false;
        }
      })
      
      .catch(e => console.log('Error logging into Facebook', e));

      
    }

  getUserDetail(userid) {
    this.fb.api("/"+userid+"/?fields=id,email,name,picture",["public_profile"])
    .then(res => {
      
      this.userFb = res;
      console.log('my data');
      
      console.log(this.userFb);
      this.data.fullName = res.name;
      console.log(this.data.fullName);
    })
    .catch(e => {
      console.log(e);
    });
  } 


  // getdistricts() {
  //   this.sqlite.create({
  //     name: 'biology',
  //     location: 'default'
  //       }).then((db: SQLiteObject)  => {
  //         db.executeSql('SELECT * FROM districts',{})
  //           .then(res => {
  //             this.districts = [];
  //             console.log(res);
  //             for (var i = 0; i<res.rows.length; i++){
  //               this.districts.push({
  //                 pcode:res.rows.item(i).pcode,
  //                 pname_en:res.rows.item(i).pname_en
  //               })
  //             }

  //           })
  //           .catch(e => console.log((e)))
  //         })

  // }

  getProvinces(){
    this.db
        .table("provinces")
        .then(res => {
          this.provinces = [];
        
          for (var i = 0; i<res.rows.length; i++){
            this.provinces.push({
              pcode:res.rows.item(i).pcode,
              prefix:res.rows.item(i).prefix,
              pname_kh:res.rows.item(i).pname_kh,
              pname_en:res.rows.item(i).pname_en
              
            })
          }
        }).catch(e => console.log(e));
  }

  getDistricts(){
    this.db
        // .executeSQL(`SELECT * FROM districts WHERE pcode=${}`)  
        .table("districts")
        .then(res => {
          this.districts = [];
        
          for (var i = 0; i<res.rows.length; i++){
            this.districts.push({
              dcode:res.rows.item(i).dcode,
              prefix:res.rows.item(i).prefix,
              dname_kh:res.rows.item(i).dname_kh,
              dname_en:res.rows.item(i).dname_en
             
            })
          }
        }).catch(e => console.log(e));

        
  }
  
  // pcode=this.data.province;
  // province() {
  //   this.db.executeSQL(`SELECT * FROM districts WHERE pcode=${this.data.province}`)
  //       .then(res => {
  //        // console.log(pcode);
  //         //this.state = 'districts';
  //         this.districts = [];
  //         for (var i = 0; i<res.rows.length; i++){
  //           this.districts.push({
  //             dcode:res.rows.item(i).dcode,
  //             prefix:res.rows.item(i).prefix,
  //             dname_kh:res.rows.item(i).dname_kh
  //           })
  //         }
  //       })
  // }


  getSchools(){
    this.db
        .table("school_lists")
        .then(res => {
          this.school_lists = [];
        
          for (var i = 0; i<res.rows.length; i++){
            this.school_lists.push({
              school_id:res.rows.item(i).school_id,
              school_name:res.rows.item(i).school_name
              // dname_kh:res.rows.item(i).dname_kh
             
            })
          }
        }).catch(e => console.log(e));
  }

  school(dcode: number) {
    this.db.executeSQL(`SELECT * FROM districts WHERE dcode=${dcode}`)
        .then(res => {
          // this.state = 'districts';
          this.school_lists = [];
          for (var i = 0; i<res.rows.length; i++){
            this.school_lists.push({
              school_id:res.rows.item(i).school_id,
              school_name:res.rows.item(i).school_name
              // dcode:res.rows.item(i).dcode,
              // prefix:res.rows.item(i).prefix,
              // dname_kh:res.rows.item(i).dname_kh
            })
          }
        })
  }

  // getDistricts(){
  //   this.sqlite.create({
  //         name: 'biology',
  //         location: 'default'
  //           }).then((db: SQLiteObject)  => {
  //             db.executeSql('SELECT * FROM districts WHERE d',{})
  //               .then(res => {
  //                 this.districts = [];
  //                 console.log(res);
  //                 for (var i = 0; i<res.rows.length; i++){
  //                   this.districts.push({
  //                     dcode:res.rows.item(i).dcode,
  //                     dname_kh:res.rows.item(i).dname_kh
  //                   })
  //                 }
    
  //               })
  //               .catch(e => console.log((e)))
  //             })
    

  // }

  createTableUsers(){
    this.sqlite.create({
      name: 'biology',
      location: 'default'
    }).then((db: SQLiteObject)  => {
      db.executeSql('create users(fullName VARCHAR(32), userName VARCHAR(32), password VARCHAR(20), phone VARCHAR(10), gender VARCHAR(6), province VARCHAR(50), district VARCHAR(50), school VARCHAR(50))',{})
      .then( res => console.log('execuated SQL!'))
      .catch(e => console.log(e));
    })
  }

  onFinish() {
    this.sqlite.create({
      name: 'biology',
      location: 'default'
    }).then((db: SQLiteObject) => {
      db.executeSql('INSERT INTO users VALUES(?,?,?,?,?,?,?,?)',[this.data.fullName,this.data.userName,this.data.password,this.data.phone,this.data.gender,this.data.province,this.data.district,this.data.school])
        .then(res => {
          console.log(JSON.stringify(res));
          console.log("fullName = "+this.data.fullName + "; "+"userName = "+this.data.userName +";"+"password ="+this.data.password +";"+"phone = "+this.data.phone+"; "+"gender = "+this.data.gender+";"+"province="+this.data.province);
          // this.toast.show('Data saved', '5000', 'center').subscribe(
          //   toast => {
              //this.navCtrl.popToRoot();
             
          //   }
          // );
        })
        this.navCtrl.push(StarterPage);
        // .catch(e => {
        //   console.log(e);
        //   this.toast.show(e, '5000', 'center').subscribe(
        //     toast => {
        //       console.log(toast);
        //     }
        //   );
        // });
    })
    // .catch(e => {
    //   console.log(e);
    //   this.toast.show(e, '5000', 'center').subscribe(
    //     toast => {
    //       console.log(toast);
    //     }
    //   );
    // });
   console.log('Error');


    //console.log(this.data)
    
    // this.alertCtrl.create({
    //   message: 'Saved',
    //   //title: 'Work here',
    //   buttons: [{
    //     text: 'Ok'
    //   }]
    // }).present();
  }

 



  ionViewDidLoad() {
    console.log('ionViewDidLoad FormPage');
    this.createTableUsers();
   
  }

  // public form(id) {
  //   this.navCtrl.push(
  //     FormPage, {
  //       formID: id
  //   });
  // }

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
