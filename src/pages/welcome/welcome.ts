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

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public alertCtrl: AlertController,
    public platform: Platform,
    private fb: Facebook,
    private toast: Toast,
    public helpers: HelpersProvider
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
              this.navCtrl.push(StarterPage);
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
}
