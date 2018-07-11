import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController, NavParams, Platform, AlertController, Events } from 'ionic-angular';
import { DatabaseProvider } from "../../providers/database/database";
// import { Http } from '@angular/http';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { Base64 } from '@ionic-native/base64';
import { WelcomePage } from '../welcome/welcome';
import { HomePage } from '../home/home';
import { StarterPage } from '../starter/starter';
import { NumberFormatStyle } from '@angular/common';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
import { FormControl, FormControlName, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
// Samak imported //
import { Network } from '@ionic-native/network';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { elementEventFullName } from '@angular/core/src/view';

/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

declare var cordova: any;

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
  valForm1: FormGroup;
  valForm2: FormGroup;
  submitAttempt: boolean = false;

  storageDirectory: string = '';
  storage: string = '';
  picture: any;
  fb_id: number;
  is_register: boolean = true;

  constructor(
    public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    public platform: Platform,
    public navParams: NavParams,
    public evts: Events,
    private toast: Toast,
    public db: DatabaseProvider,
    public fb: Facebook,
    public formBuilder: FormBuilder,
    public network: Network,
    public helpers: HelpersProvider,
    public fileTransfer: FileTransfer,
    public toastCtrl: ToastController,
    private base64: Base64
  ) {
   

    /**Get data of facebook user from welcomepage
     * 
     */
    console.log('data = '+this.navParams.get('data'));
    //if(!this.is_register){
      const fbData = this.navParams.get('data');
                  if(fbData){
                    this.data.fullName = fbData.name;
                    this.navParams = fbData;
                    this.fb_id = fbData.id;
                    console.log('My fb id: ',fbData.id);
                    this.picture = fbData.picture;
                  }
    

                  this.platform.ready().then(() => {
                    // make sure this is on a device, not an emulation (e.g. chrome tools device mode)
                    if(!this.platform.is('cordova')) {
                      return false;
                    }              
                    if (this.platform.is('ios')) {
                      this.storageDirectory = cordova.file.documentsDirectory;
                    }
                    else if(this.platform.is('android')) {
                      this.storageDirectory = cordova.file.dataDirectory;
                    }
                    else {
                      // exit otherwise, but you could add further types here e.g. Windows
                      return false;
                    }
                  });

                  const img = this.picture.data.url;
                  console.log('*****My picture url: ',img);
                  this.platform.ready().then(() => {
                    const fileTransfer: FileTransferObject = this.fileTransfer.create();
                    console.log('========>Fb id: ', this.fb_id);
                    fileTransfer.download(img, this.storageDirectory + this.fb_id + `.jpg`).then((entry) => {             
                      const alertSuccess = this.alertCtrl.create({
                        title: `Succeeded!`,
                        // subTitle: `${img} was successfully downloaded to: ${entry.toURL()}`,
                        buttons: ['Ok']
                      });             
                      alertSuccess.present();
              
                    }, (error) => {
              
                      const alertFailure = this.alertCtrl.create({
                        title: `Download Failed!`,
                        subTitle: `${img} was not successfully downloaded. Error code: ${error.code}`,
                        buttons: ['Ok']
                      });             
                      alertFailure.present();
              
                    });
              
                  });

                  let filePath: string = 'file:///data/user/0/kh.org.open.biology12/files/'+ this.fb_id +'.jpg';
                  console.log('=========> My filePath: ',filePath);
                  this.base64.encodeFile(filePath).then((base64File: string) => {
                    console.log('=========> My base64file: ',base64File);
                  }, (err) => {
                    console.log(err);
                  });
    //}  
      // this.data.fullName= new FormCtrl('',);
      this.valForm1 = formBuilder.group({
        fullName: [null, Validators.required],
        userName: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
        password: [null, Validators.compose([Validators.required, Validators.minLength(4)])],
        phone: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(9)])],
        gender:[null]
      });

      this.valForm2 = formBuilder.group({
        province: [null],
        district: [null, Validators.required],
        school: [null, Validators.required]       
      });


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



      this.submitAttempt = true;
 
      if(!this.valForm1.valid){
          this.step=1;
      }
      else if(!this.valForm2.valid){
          this.step=2;
      }
      else {
          console.log("success!")
          console.log(this.valForm1.value);
          console.log(this.valForm2.value);
          this.onFinish();
      }
 

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


  /**Save data after form completed
   * 
   */
  onFinish() { 

    // this.submitAttempt = true;
    let data = [this.data.fullName,this.data.userName,this.data.password,this.data.phone,this.data.gender,this.data.province,this.data.district,this.data.school,this.fb_id];
    this.db.getInstance().then((db: SQLiteObject) => {

      db.executeSql('INSERT INTO users(full_name, user_name, password, phone_number, gender, province_pcode, district_dcode, school_id, fb_id) VALUES(?,?,?,?,?,?,?,?,?)', data)
        .then(res => {
          if (this.network.type == "none") {
            console.log('Data Inserted into users!');
            this.helpers.presentLoadingCustom(2000, "កំពុងផ្ទុកទិន្នន័យ...");
          }
          else {
            this.helpers.synchUserRegistrationToServer(["users"],"user_register_or_update_app", 7,StarterPage);
            this.helpers.presentLoadingCustom(2000, "កំពុងបញ្ជូនទិន្នន័យទៅកាន់ម៉ាស៊ីនមេ...");
            
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
          role: 'cancel'
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
