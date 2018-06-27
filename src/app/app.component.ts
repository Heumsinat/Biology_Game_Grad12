import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { FormPage } from "../pages/form/form";
import { WelcomePage } from '../pages/welcome/welcome';
import { FacebookPage } from '../pages/facebook/facebook';

import {QuestionPage} from "../pages/question/question";
import {StarterPage} from "../pages/starter/starter";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  // rootPage:any = WelcomePage;

  rootPage:any = WelcomePage;


  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      var localStorage_userData = JSON.parse(localStorage.getItem("userData"));
      if(localStorage_userData != null)
      {
        this.rootPage = StarterPage;
      }
      // else
      // {
      //   this.rootPage = WelcomePage;
      // }
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

