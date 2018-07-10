import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import {HttpClient, HttpClientModule } from "@angular/common/http";
import {TranslateLoader, TranslateModule } from "@ngx-translate/core";
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import {File} from '@ionic-native/file';

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
import { LeaderboardPage } from '../pages/leaderboard/leaderboard';
import { ProfilePage } from '../pages/profile/profile';
import { Network } from '@ionic-native/network';


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
    QuizPage,
    SectionReviewPage,
    StarterPage,
    LeaderboardPage,
    IonFormWizard,
    IonFormWizardStep,
    ProfilePage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule,
    HttpModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: (HttpLoaderFactory),
            deps: [HttpClient]
        }
    }),
    
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
    QuizPage,
    SectionReviewPage,
    StarterPage,
    LeaderboardPage,
    ProfilePage
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
    Facebook,
    Network,
    File,
    FileTransfer,
    FileTransferObject
    // TranslateService
    
  ]
})
export class AppModule {}

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'assets/i18n/', '.json');
}