import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
<<<<<<< HEAD
import { LoginPage } from '../pages/login/login';
import { FormPage } from "../pages/form/form";
import { WelcomePage } from '../pages/welcome/welcome';


=======
import {QuestionPage} from "../pages/question/question";
// import {WelcomePage} from "../pages/welcome/welcome";
import {MainPage} from "../pages/main/main";
>>>>>>> 034084850a985fa1f9508a35948feaf049372900
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
<<<<<<< HEAD
  rootPage:any = WelcomePage;
=======

>>>>>>> 034084850a985fa1f9508a35948feaf049372900

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

