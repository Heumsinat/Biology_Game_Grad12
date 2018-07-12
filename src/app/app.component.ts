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
    splashScreen: SplashScreen
  ) {
    this.translate.setDefaultLang("km");
    this.translate.use("km");
    
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      var localStorage_userData = JSON.parse(localStorage.getItem("userData"));
      if(localStorage_userData != null)
      {
        this.rootPage = StarterPage ;
      }
      
      statusBar.styleDefault();
      splashScreen.hide();
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
  });

    this.initTranslate();
  }

  initTranslate() {


    // if (this.translate.getBrowserLang() !== undefined) {
    //     this.translate.use(this.translate.getBrowserLang());
    // } else {
    //     this.translate.use('kh'); // Set your language here
    // }

  }
}

