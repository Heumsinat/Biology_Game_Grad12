import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { FormPage } from "../pages/form/form";
import { WelcomePage } from '../pages/welcome/welcome';

import {QuestionPage} from "../pages/question/question";
import {StarterPage} from "../pages/starter/starter";
import { LocalNotifications } from '@ionic-native/local-notifications';
import { HelpersProvider } from '../providers/helpers/helpers';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  // rootPage:any = WelcomePage;

  rootPage:any = WelcomePage;
  

  constructor(
    private translate: TranslateService, 
    platform: Platform, 
    statusBar: StatusBar, 
    splashScreen: SplashScreen,
    public localNotifications: LocalNotifications,
    public helpers: HelpersProvider,
  ) {
    this.translate.setDefaultLang("km");
    this.translate.use("km");
    var cordova: any;
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      var localStorage_userData = JSON.parse(localStorage.getItem("userData"));
      if(localStorage_userData != null)
      {
        this.rootPage = StarterPage ;
      }

      // Set daily notification at 7 am (default)  //
      this.translate.get('notifyString').subscribe(val => {
        if(!localStorage.getItem('timeNotify')){
          localStorage.setItem('timeNotify','07:00');
          this.helpers.setNotificationSchedule(val,7,0,localNotifications);
        }
      });
        
      statusBar.styleDefault();
      splashScreen.hide();
    });

  }

  
}

