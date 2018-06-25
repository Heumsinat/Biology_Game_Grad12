import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, Platform } from 'ionic-angular';
import { StarterPage } from '../starter/starter';
import { FormPage } from '../form/form';
import { Network } from '@ionic-native/network';
import { HelpersProvider } from '../../providers/helpers/helpers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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

  // username: string ="dfgdf";
  // password: string ="fgdg";
  link_login = "user_login_app";
  userData = { "name_id": "", "pwd": "" };
  loginValidate: FormGroup;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public alertCtrl: AlertController, 
    public platform: Platform,
    public network: Network,
    public helpers: HelpersProvider,
    public formBuilder: FormBuilder,) {
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
    // console.log("userData = " + JSON.stringify(this.userData));
    // this.submitAttempt = true;

    if (this.network.type != "none") {
      if(this.loginValidate.valid)
      {
        this.helpers.postData(this.userData, this.link_login).then((result) => {
          
          console.log("result = " + JSON.stringify(result));
          if (result["message"] == "Ok") {
            let tranLoading = '';
            this.helpers.presentLoadingCustom(1000, "កំពុងផ្ទុក...");
            localStorage.setItem('userData', JSON.stringify(result["user"]));
            // result["user"] = {id":1,"full_name":"u1","fb_id":"","phone_number":"012000000","gender":1,"school_id":"1020101005"}
            console.log("Login Successfully");
            this.navCtrl.push(StarterPage);
           
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

  /* public signin(){
    if(/^[a-zA-Z0-9]+$/.test(this.username+this.password)){
      this.navCtrl.push(StarterPage, {
        username: this.username,
        password: this.password
      });
    } else {
      this.showAlert('Error', 'Invalid Username');

    }  
  } */

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




