import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

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
import { FacebookPage } from "../pages/facebook/facebook";


import { IonFormWizard } from './wizard.component';
import { IonFormWizardStep } from './wizard.step.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Facebook  } from '@ionic-native/facebook';


import {NativeAudio} from "@ionic-native/native-audio";
import {LessonPage} from "../pages/lesson/lesson";
import {QuizPage} from "../pages/quiz/quiz";
import {SectionReviewPage} from "../pages/section-review/section-review";
import {StarterPage} from "../pages/starter/starter";
import { HelpersProvider } from '../providers/helpers/helpers';
import { HttpModule } from '@angular/http';



@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LessonPage,
    QuestionPage,
    SectionPage,
    LoginPage,
    FormPage,
    WelcomePage,
    FacebookPage,
    QuizPage,
    SectionReviewPage,
    StarterPage,
    IonFormWizard,
    IonFormWizardStep
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    BrowserAnimationsModule
    
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LessonPage,
    QuestionPage,
    SectionPage,
    LoginPage,
    FormPage,
    WelcomePage,
    FacebookPage,
    QuizPage,
    SectionReviewPage,
    StarterPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    NativeAudio,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    SQLite,
    Toast,
    DatabaseProvider,
    HelpersProvider,
    Facebook
    

  ]
})
export class AppModule {}