import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
/*import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
/*import { FIREBASE_CREDENTIALS } from "./firebase.credentials";*/

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { SQLite } from '@ionic-native/sqlite';
import { Toast } from '@ionic-native/toast';
import { DatabaseProvider } from '../providers/database/database';
import { QuestionPage } from '../pages/question/question';
import {SectionPage} from "../pages/section/section";

import { LoginPage } from "../pages/login/login";
import { FormPage } from "../pages/form/form";
import { WelcomePage } from "../pages/welcome/welcome";


// import {WelcomePage} from "../pages/welcome/welcome";
import {NativeAudio} from "@ionic-native/native-audio";
import {LessonPage} from "../pages/lesson/lesson";
import {QuizPage} from "../pages/quiz/quiz";
import {SectionReviewPage} from "../pages/section-review/section-review";
import { MainPage } from "../pages/main/main";



@NgModule({
  declarations: [
    MyApp,
    // WelcomePage,
    HomePage,
    LessonPage,
    QuestionPage,
    SectionPage,
    LoginPage,
    FormPage,
    WelcomePage,
    QuizPage,
    SectionReviewPage,
    MainPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
    /*AngularFireAuthModule.initializeApp(config),*/
    /*AngularFireModule.initializeApp(FIREBASE_CREDENTIALS),*/
    /*AngularFireAuthModule*/
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    // WelcomePage,
    HomePage,
    LessonPage,
    QuestionPage,
    SectionPage,
    LoginPage,
    FormPage,
    WelcomePage,
    QuizPage,
    SectionReviewPage,
    MainPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeAudio,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    Toast,
    DatabaseProvider
  ]
})
export class AppModule {}