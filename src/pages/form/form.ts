import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform, AlertController, Events } from 'ionic-angular';
import { DatabaseProvider } from "../../providers/database/database";
// import { Http } from '@angular/http';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { WelcomePage } from '../welcome/welcome';
import { HomePage } from '../home/home';
import { StarterPage } from '../starter/starter';
import { FacebookPage } from '../facebook/facebook';
import { NumberFormatStyle } from '@angular/common';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { FormControl, FormControlName, FormBuilder, FormGroup, Validators } from '@angular/forms';
// Samak imported //
import { Network } from '@ionic-native/network';
import { HelpersProvider } from '../../providers/helpers/helpers';

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

  public data = { fullName:"", userName:"", password:"",phone:"", gender:"", province:"", district:"", school:"" };

  
  provinces: any [];
  districts: any [];
  school_lists: any [];


  step: any;
  stepCondition: any;
  stepDefaultCondition: any;
  currentStep: any;

  // isLoggedIn:boolean = false;
  // private userFb: any;
  valForm: FormGroup;
  picture: any;

  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    public platform: Platform,
    public navParams: NavParams,
    public evts: Events,
    //public http: Http,
    //private sqlite: SQLite,
    private toast: Toast,
    public db: DatabaseProvider,
    public fb: Facebook,
    public formBuilder: FormBuilder,
    public network: Network,
    public helpers: HelpersProvider
  ) {
   

    /**Get data of facebook user from welcomepage
     * 
     */
      const fbData = this.navParams.get('data');
                  if(fbData){
                    this.data.fullName = fbData.name;
                    this.navParams = fbData;
                    //this.picture = fbData.picture;
                  }
          
     
      // this.data.fullName= new FormCtrl('',);
      this.valForm = formBuilder.group({
        fullName: ['',Validators.compose([Validators.pattern('[a-zA-Z*]'),Validators.required])],
        userName: ['',Validators.compose([Validators.required])],
        password: ['',Validators.compose([Validators.required,Validators.minLength(4)])],
        phone: ['', Validators.compose([Validators.pattern('[0-9*]')])],
        gender:['']
    
  
      });

    //   this.valForm = new FormGroup({
    //     fullName: new FormControl('',Validators.compose([Validators.pattern('[a-zA-Z*]'),Validators.required])),
    //     userName: new FormControl('',Validators.compose([Validators.required])),
    //     password: new FormControl('',Validators.compose([Validators.required,Validators.minLength(4)])),
    //  });


      /**Pass data in form1 to form2 in a page
       * 
       */
      this.step = 1;
      this.stepCondition = true;
      this.stepDefaultCondition = this.stepCondition;
      this.evts.subscribe('step:changed', step => {
        this.currentStep = step;
        this.stepCondition = this.stepDefaultCondition;
        console.log(this.currentStep)
        if(this.currentStep == 2){}

      });
      this.evts.subscribe('step:next', () => {
        console.log('Next pressed: ', this.currentStep);
        if(this.currentStep == 2){
          this.getProvinces();
        }
      });
      this.evts.subscribe('step:back', () => {
        console.log('Back pressed: ', this.currentStep);
      });

  }

/**Function get all provinces from biology.db
 * 
 */
  getProvinces(){
    this.db
        .table("provinces")
        .then(res => {
          this.provinces = [];
        console.log(res);
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

 
   

  /**Get all districts of province
   * 
   */
  getDistricts(id){
    console.log(this.db)
    this.db
        .executeSQL(`SELECT * FROM districts WHERE pcode=${id}`)  
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

  
  /**Get all schools of district
   * 
   */
  getSchools(id){
    console.log(id);
    this.db.executeSQL(`SELECT * FROM school_lists WHERE district_id=${id}`)
        // .table("school_lists")
      
        .then(res => {
          this.school_lists = [];
        
          for (var i = 0; i<res.rows.length; i++){
            this.school_lists.push({
              school_id:res.rows.item(i).school_id,
              school_name:res.rows.item(i).school_name
                          
            })
          }
        }).catch(e => console.log(e));
  }

  

  createTableUsers(){
    this.db.getInstance().then((db: SQLiteObject)  => {
      db.executeSql(`create table if NOT exists users(
        "id " integer not null primary key autoincrement,
        fullName VARCHAR(32), userName VARCHAR(32), password VARCHAR(20), phone VARCHAR(10), gender VARCHAR(6), province VARCHAR(50), district VARCHAR(50), school VARCHAR(50), isSent INT)`,{})
      .then( res => console.log('execuated SQL!'))
      .catch(e => console.log(e));
    })
  }


  /**Save data after form completed
   * 
   */
  onFinish() {
    let data = [this.data.fullName,this.data.userName,this.data.password,this.data.phone,this.data.gender,this.data.province,this.data.district,this.data.school];
    this.db.getInstance().then((db: SQLiteObject) => {

      db.executeSql('INSERT INTO users(full_name, user_name, password, phone_number, gender, province_pcode, district_dcode, school_id) VALUES(?,?,?,?,?,?,?,?)', data)
      // db.executeSql('INSERT INTO users VALUES(?,?,?,?,?,?,?,?)',[this.data.fullName, this.data.userName, this.data.password, this.data.phone, this.data.gender, this.data.province, this.data.district, this.data.school])
        /* Soriya's Code before insert SynchData function */
        /* .then(res => {
            console.log('hello gay!',JSON.stringify(res));
            console.log("fullName = "+this.data.fullName + "; "+"userName = "+this.data.userName +";"+"password ="+this.data.password +";"+"phone = "+this.data.phone+"; "+"gender = "+this.data.gender+";"+"province="+this.data.province);
            this.toast.show('Data saved', '5000', 'center').subscribe(
              toast => {
                this.navCtrl.push(StarterPage);
              
              }
            );
        }) */

        .then(res => {
          if (this.network.type == "none") {
            console.log('Data Inserted into monitor_measurements!');
            this.helpers.presentLoadingCustom(2000, "កំពុងផ្ទុកទិន្នន័យ...");
          }
          else {
            this.helpers.synchUserQuizeToServer(["users"],"user_register_or_update_app", 7);
            this.helpers.presentLoadingCustom(2000, "កំពុងបញ្ជូនទិន្នន័យទៅកាន់ម៉ាស៊ីនមេ...");
            this.navCtrl.push(StarterPage);
          }
        })
        
        .catch(e => {
          console.log(e);
          console.log('Error to save data');
          this.toast.show(e, '5000', 'center').subscribe(
            toast => {
              console.log(toast);
            }
          );
        });
    })
    // .catch(e => {
    //   console.log(e);
    //   this.toast.show(e, '5000', 'center').subscribe(
    //     toast => {
    //       console.log(toast);
    //     }
    //   );
    // });
    //this.navCtrl.push(StarterPage);
    // console.log('Error to save data');


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
    // this.createTableUsers();
   
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

  onChangeSelectProvince(e){
    this.school_lists = [];
    this.data.school = "";
    this.getDistricts(e)
  }

  onChangeSelectDistrict(e){
    this.getSchools(e);
  }


}
