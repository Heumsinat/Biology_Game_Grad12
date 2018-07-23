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
import { FormControl, AbstractControl, ValidatorFn, FormControlName, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
// Samak imported //
import { Network } from '@ionic-native/network';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { elementEventFullName } from '@angular/core/src/view';
// import { IonFormWizard } from '../../app/wizard.component';

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
  userNameInfo: any [];


  step: any;
  stepCondition: any;
  stepDefaultCondition: any;
  currentStep: any;

  valForm1: FormGroup;
  valForm2: FormGroup;
  submitAttempt: boolean = false;

  storageDirectory: string = '';
  storage: string = '';
  picture: any;
  fb_id: any;
  provinceName: any;
  fbData: any;
  userName: any;
  // userInfo: any;

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
   
    this.checkUsername();
    /**Get data of facebook user from welcomepage
     * 
     */
    console.log('data = '+this.navParams.get('data'));
      this.fbData = this.navParams.get('data');
      if(this.fbData != 1 && this.fbData != 2){
        this.data.fullName = this.fbData.name;
        this.navParams = this.fbData;
        this.fb_id = this.fbData.id;
        console.log('My fb id: ',this.fbData.id);
        this.picture = this.fbData.picture;
      
        this.platform.ready().then(() => {
          // make sure this is on a device, not an emulation
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
            // exit otherwise, but you could add further types here
            return false;
          }
        });
        
        /**Pass url from form page and save it in local file */
        const img = this.picture.data.url;
        console.log('*****My picture url: ',img);
        this.platform.ready().then(() => {
          const fileTransfer: FileTransferObject = this.fileTransfer.create();
          console.log('==>Fb id: ', this.fb_id);
          fileTransfer.download(img, this.storageDirectory + this.fb_id + `.jpg`).then((entry) => {             
            // const alertSuccess = this.alertCtrl.create({
            //   title: `Succeeded!`,
            //   // subTitle: `${img} was successfully downloaded to: ${entry.toURL()}`,
            //   buttons: ['Ok']
            // });             
            // alertSuccess.present();
    
          }, (error) => {
    
            const alertFailure = this.alertCtrl.create({
              title: `Download Failed!`,
              subTitle: `${img} was not successfully downloaded. Error code: ${error.code}`,
              buttons: ['Ok']
            });             
            alertFailure.present();
          });
    
        });
      } 
      // Update User Registration
      else if(this.fbData == 2)
      {
        var userDetail = JSON.parse(localStorage.getItem('userData'));
        this.data.fullName = userDetail.full_name;
        this.data.userName = userDetail.user_name;
        this.data.phone = userDetail.phone_number;
        this.data.gender = userDetail.gender;
        this.data.school = userDetail.school_id;

        this.getProvinceName(userDetail.school_id).then(res=>{
          this.data.province = res;
          this.getDistricts(res);
        });
        this.getDistrictName(userDetail.school_id).then(res=>{
          this.data.district = res;
          this.getSchools(res);
          this.getSchoolName(res);
        });
        //this.getDistrictName(userDetail.school_id);
        console.log("this.date = ");
        console.log(this.data);

        
      }
      this.valForm1 = formBuilder.group({
        fullName: [null, Validators.required],
        userName: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
        password: [null, Validators.compose([Validators.required, Validators.minLength(4)])],
        phone: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(9)])],
        gender:[null]
      });

      if(this.fbData == 2)
      {
        this.valForm1 = formBuilder.group({
          fullName: [null, Validators.required],
          userName: [null, Validators.compose([Validators.minLength(3)])],
          password: [null, Validators.compose([Validators.minLength(4)])],
          phone: [null, Validators.compose([Validators.required, Validators.pattern('[0-9]*'), Validators.minLength(9)])],
          gender:[null, Validators.required]
        });
      }
      // , this.validateUsername()

      this.valForm2 = formBuilder.group({
        province: [null, Validators.required],
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
 
  }
//   key: string;
//   someServiceWorkingWithDatabase: any;
//   private validateUsername(): ValidatorFn {
//     return (control: AbstractControl): { [key: string]: any }  => {
//       this.someServiceWorkingWithDatabase.checkUsername(control)
//         .subscribe(
//           ({data}) => {
//             let res: string = data;
//             if (res === control.value) {
//               return {'alreadyExist': true};
//             } else {
//               return null
//             }
//           },
//           (error) => {
//             console.log(error);
//           }
//         )
//     }
// }

  getProvinceName(school_id)
  {
    return this.db.executeSQL(`select procode from provinces join school_lists on procode = province_id where school_id =${school_id}`)
    .then(res => {
        return res.rows.item(0).procode;
    }).catch(e => console.log(e));
  }

  getDistrictName(school_id)
  {
    return this.db.executeSQL(`select dcode from districts join school_lists on dcode = district_id where school_id =${school_id}`)
    .then(res => {
      return res.rows.item(0).dcode;
    }).catch(e => console.log(e));
  }

  getSchoolName(school_id)
  {
    this.db.executeSQL(`select school_name from school_lists where school_id =${school_id}`)
    .then(res => {
      for (var i = 0; i<res.rows.length; i++){
        this.data.school = res.rows.item(i).school_name;
      }    
    }).catch(e => console.log(e));
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
              procode: res.rows.item(i).procode,
              prefix: res.rows.item(i).prefix,
              province_kh: res.rows.item(i).province_kh,
              province: res.rows.item(i).province
              
            })
          }
        }).catch(e => console.log(e));
  }
  

  /**Get all districts of province
   * 
   */
  getDistricts(id:any){
    console.log(this.db);
    this.db
        .executeSQL(`SELECT * FROM districts WHERE pcode=${id}`)  
        .then(res => {
          this.districts = [];       
          for(var i = 0; i<res.rows.length; i++){
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
              school_id: res.rows.item(i).school_id,
              school_name: res.rows.item(i).school_name,
              school_name_en : res.rows.item(i).school_name_en
                          
            })
          }
        }).catch(e => console.log(e));
  }

  checkUsername(){
    // console.log(id);
    this.db.executeSQL(`SELECT user_name FROM users WHERE user_name=${this.data.userName}`)  
        .then(res => {
          console.log('==========> User_name: ',res);
          this.userNameInfo = [];       
          for (var i = 0; i<res.rows.length; i++){
            this.userNameInfo.push({
              user_name: res.rows.item(i).user_name     
                     
            })
          }
        }).catch(e => console.log(e));
  }

  

  /**Save data after form completed
   * 
   */
  onFinish() { 

    this.submitAttempt = true;
    if(!this.valForm1.valid || !this.valForm2.valid){
        const confirm = this.alertCtrl.create({
          title: '',
          message: 'ព៌ត័មានដែលអ្នកបំពេញមិនត្រឹមត្រូវទេ!'
        });
        ​confirm.present();
        // this.navCtrl.push(FormPage);
    }
    else {
            
      var sqlStr ='INSERT INTO users(full_name, user_name, password, phone_number, gender, province_pcode, district_dcode, school_id, fb_id) VALUES(?,?,?,?,?,?,?,?,?)';
      let data = [this.data.fullName,this.data.userName,this.data.password,this.data.phone,this.data.gender,this.data.province,this.data.district,this.data.school,this.fb_id];
      console.log('data to be inserted = ');
      console.log(data);
      var isUpdateProfile = false;
      // To update old user
      if(this.fbData==2)
      {
        sqlStr ='UPDATE users SET full_name=?, user_name=?, phone_number=?, gender=?, province_pcode=?, district_dcode=?, school_id=? WHERE user_id=?';
        data = [this.data.fullName,this.data.userName,this.data.phone,this.data.gender,this.data.province,this.data.district,this.data.school,JSON.parse(localStorage.getItem('userData')).id];
        isUpdateProfile = true;
      }
      console.log('sqlStr = '+sqlStr);
      // To Insert New User
    // else{
     
      // console.log('===============> My value: ',;
      // if(this.data.userName == this. ){
        this.db.getInstance().then((db: SQLiteObject) => {
          db.executeSql(sqlStr, data)
            .then(res => {
              if (this.network.type == "none") {
                console.log('Data Inserted into users!');
                this.helpers.presentLoadingCustom(2000, "កំពុងផ្ទុកទិន្នន័យ...");
              }
              else {
                this.helpers.synchUserRegistrationToServer(["users"],"user_register_or_update_app",7,StarterPage,isUpdateProfile);
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
      // }
      // else{
      //   const confirm = this.alertCtrl.create({
      //     title: '',
      //     message: 'ឈ្មោះសម្គាល់ត្រូវបានប្រើប្រាស់រួចហើយ!'
      //   });
      //   ​confirm.present();
      // }

    }
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

    // this.evts.subscribe('step:back', () => {
    //   console.log('Back pressed: ', this.currentStep);
    // });

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

  onChangeSelectProvince(e:any){
    this.school_lists = [];
    this.data.school = "";
    this.getDistricts(e);
  }

  onChangeSelectDistrict(e:any){
    this.getSchools(e);
  }

}
