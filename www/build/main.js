webpackJsonp([10],{

/***/ 112:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FormPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_database_database__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__home_home__ = __webpack_require__(87);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



// import { Http } from '@angular/http';



/**
 * Generated class for the FormPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FormPage = (function () {
    function FormPage(navCtrl, alertCtrl, platform, navParams, evts, 
        //public http: Http,
        sqlite, toast, db) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.navParams = navParams;
        this.evts = evts;
        this.sqlite = sqlite;
        this.toast = toast;
        this.db = db;
        this.data = { fullName: "", userName: "", password: "", phone: "", gender: "", school: "", district: "", province: "" };
        this.getProvinces();
        // console.log('getprovince',this.provinces);
        this.getDistricts();
        this.getSchools();
        this.navParams.get('userParams');
        console.log('Hello SqlStorage Provider');
        this.step = 1;
        this.stepCondition = true;
        this.stepDefaultCondition = this.stepCondition;
        this.evts.subscribe('step:changed', function (step) {
            _this.currentStep = step;
            _this.stepCondition = _this.stepDefaultCondition;
        });
        this.evts.subscribe('step:next', function () {
            console.log('Next pressed: ', _this.currentStep);
        });
        this.evts.subscribe('step:back', function () {
            console.log('Back pressed: ', _this.currentStep);
        });
    }
    // getdistricts() {
    //   this.sqlite.create({
    //     name: 'biology',
    //     location: 'default'
    //       }).then((db: SQLiteObject)  => {
    //         db.executeSql('SELECT * FROM districts',{})
    //           .then(res => {
    //             this.districts = [];
    //             console.log(res);
    //             for (var i = 0; i<res.rows.length; i++){
    //               this.districts.push({
    //                 pcode:res.rows.item(i).pcode,
    //                 pname_en:res.rows.item(i).pname_en
    //               })
    //             }
    //           })
    //           .catch(e => console.log((e)))
    //         })
    // }
    FormPage.prototype.getProvinces = function () {
        var _this = this;
        this.db
            .table("provinces")
            .then(function (res) {
            _this.provinces = [];
            for (var i = 0; i < res.rows.length; i++) {
                _this.provinces.push({
                    pcode: res.rows.item(i).pcode,
                    prefix: res.rows.item(i).prefix,
                    pname_kh: res.rows.item(i).pname_kh,
                    pname_en: res.rows.item(i).pname_en
                });
            }
        }).catch(function (e) { return console.log(e); });
    };
    FormPage.prototype.getDistricts = function () {
        var _this = this;
        this.db
            .table("districts")
            .then(function (res) {
            _this.districts = [];
            for (var i = 0; i < res.rows.length; i++) {
                _this.districts.push({
                    dcode: res.rows.item(i).dcode,
                    prefix: res.rows.item(i).prefix,
                    dname_kh: res.rows.item(i).dname_kh,
                    dname_en: res.rows.item(i).dname_en
                });
            }
        }).catch(function (e) { return console.log(e); });
    };
    // pcode=this.data.province;
    // province() {
    //   this.db.executeSQL(`SELECT * FROM districts WHERE pcode=${this.data.province}`)
    //       .then(res => {
    //        // console.log(pcode);
    //         //this.state = 'districts';
    //         this.districts = [];
    //         for (var i = 0; i<res.rows.length; i++){
    //           this.districts.push({
    //             dcode:res.rows.item(i).dcode,
    //             prefix:res.rows.item(i).prefix,
    //             dname_kh:res.rows.item(i).dname_kh
    //           })
    //         }
    //       })
    // }
    FormPage.prototype.getSchools = function () {
        var _this = this;
        this.db
            .table("school_lists")
            .then(function (res) {
            _this.school_lists = [];
            for (var i = 0; i < res.rows.length; i++) {
                _this.school_lists.push({
                    school_id: res.rows.item(i).school_id,
                    school_name: res.rows.item(i).school_name
                    // dname_kh:res.rows.item(i).dname_kh
                });
            }
        }).catch(function (e) { return console.log(e); });
    };
    FormPage.prototype.school = function (dcode) {
        var _this = this;
        this.db.executeSQL("SELECT * FROM districts WHERE dcode=" + dcode)
            .then(function (res) {
            // this.state = 'districts';
            _this.school_lists = [];
            for (var i = 0; i < res.rows.length; i++) {
                _this.school_lists.push({
                    school_id: res.rows.item(i).school_id,
                    school_name: res.rows.item(i).school_name
                    // dcode:res.rows.item(i).dcode,
                    // prefix:res.rows.item(i).prefix,
                    // dname_kh:res.rows.item(i).dname_kh
                });
            }
        });
    };
    // getDistricts(){
    //   this.sqlite.create({
    //         name: 'biology',
    //         location: 'default'
    //           }).then((db: SQLiteObject)  => {
    //             db.executeSql('SELECT * FROM districts WHERE d',{})
    //               .then(res => {
    //                 this.districts = [];
    //                 console.log(res);
    //                 for (var i = 0; i<res.rows.length; i++){
    //                   this.districts.push({
    //                     dcode:res.rows.item(i).dcode,
    //                     dname_kh:res.rows.item(i).dname_kh
    //                   })
    //                 }
    //               })
    //               .catch(e => console.log((e)))
    //             })
    // }
    FormPage.prototype.createTableUsers = function () {
        this.sqlite.create({
            name: 'biology',
            location: 'default'
        }).then(function (db) {
            db.executeSql('create table users(fullName VARCHAR(32), userName VARCHAR(32), password VARCHAR(20), phone VARCHAR(10), gender VARCHAR(6), province VARCHAR(50), district VARCHAR(50), school VARCHAR(50))', {})
                .then(function (res) { return console.log('execuated SQL!'); })
                .catch(function (e) { return console.log(e); });
        });
    };
    FormPage.prototype.onFinish = function () {
        var _this = this;
        this.sqlite.create({
            name: 'biology',
            location: 'default'
        }).then(function (db) {
            db.executeSql('INSERT INTO users VALUES(?,?,?,?,?,?,?,?)', [_this.data.fullName, _this.data.userName, _this.data.password, _this.data.phone, _this.data.gender, _this.data.province, _this.data.district, _this.data.school])
                .then(function (res) {
                console.log(JSON.stringify(res));
                console.log("fullName = " + _this.data.fullName + "; " + "userName = " + _this.data.userName + ";" + "password =" + _this.data.password + ";" + "phone = " + _this.data.phone + "; " + "gender = " + _this.data.gender + ";" + "province=" + _this.data.province);
                _this.toast.show('Data saved', '5000', 'center').subscribe(function (toast) {
                    //this.navCtrl.popToRoot();
                    _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__home_home__["a" /* HomePage */]);
                });
            });
            // .catch(e => {
            //   console.log(e);
            //   this.toast.show(e, '5000', 'center').subscribe(
            //     toast => {
            //       console.log(toast);
            //     }
            //   );
            // });
        });
        // .catch(e => {
        //   console.log(e);
        //   this.toast.show(e, '5000', 'center').subscribe(
        //     toast => {
        //       console.log(toast);
        //     }
        //   );
        // });
        console.log('Error');
        //console.log(this.data)
        // this.alertCtrl.create({
        //   message: 'Saved',
        //   //title: 'Work here',
        //   buttons: [{
        //     text: 'Ok'
        //   }]
        // }).present();
    };
    FormPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FormPage');
        this.createTableUsers();
    };
    // public form(id) {
    //   this.navCtrl.push(
    //     FormPage, {
    //       formID: id
    //   });
    // }
    FormPage.prototype.backButtonClick = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'ចាកចេញ​ពីទំព័រនេះ?​',
            subTitle: '',
            buttons: [
                {
                    text: 'បោះបង់',
                    role: 'calcel'
                }, {
                    text: 'ចាកចេញ',
                    handler: function () {
                        _this.navCtrl.pop();
                    }
                }
            ]
        });
        confirm.present();
    };
    FormPage.prototype.exitButtonClick = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'ចាកចេញ',
            message: 'តើ​អ្នក​ពិត​ជា​ចង់​ចាក​ចេញ​ពី​កម្មវិធី​នេះ?​',
            buttons: [
                {
                    text: "ទេ",
                    role: 'cancel'
                },
                {
                    text: "បាទ​ / ចាស",
                    handler: function () {
                        _this.platform.exitApp();
                    }
                },
            ]
        });
        alert.present();
    };
    FormPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-form',template:/*ion-inline-start:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/pages/form/form.html"*/'<!--\n  Generated template for the FormPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!-- <ion-header>\n\n  <ion-navbar>\n    <ion-title>ព័ត៌មានអ្នកប្រើប្រាស់</ion-title>\n  </ion-navbar>\n\n</ion-header> -->\n\n\n<ion-content xela padding class="background-img">\n   \n    <ion-grid>\n      \n          \n              <ion-form-wizard [(step)]="step" [showSteps]="false" (finish)="onFinish()" [finishIcon]="\'done-all\'" [(stepCondition)]="stepCondition">\n                  <ion-wizard-step>\n                    <div class="container">  \n                        <ion-item class="form1">\n                          <ion-label>ឈ្មោះពេញ</ion-label>\n                          <ion-input type="text" [(ngModel)]="data.fullName" name="fullName" aria-required="true"></ion-input>\n                        </ion-item>\n                      \n                        <ion-item class="form1">\n                          <ion-label>ឈ្មោះសម្គាល់</ion-label>\n                          <ion-input type="text" [(ngModel)]="data.userName" name="userName" aria-required=""></ion-input>\n                        </ion-item>\n\n                        <ion-item class="form1">\n                          <ion-label>ពាក្យសម្ងាត់</ion-label>\n                          <ion-input type="password" [(ngModel)]="data.password" name="password" aria-required=""></ion-input>\n                        </ion-item>\n                        \n                        <ion-item class="form1">\n                          <ion-label>លេខទូរស័ព្ទ</ion-label>\n                          <ion-input type="text" [(ngModel)]="data.phone" name="phone" aria-required=""></ion-input>\n                        </ion-item>\n\n                        <ion-item class="form1">\n                            <ion-label>ភេទ</ion-label>\n                            <ion-select [(ngModel)]="data.gender" >\n                              <ion-option value="ស្រី">ស្រី</ion-option>\n                              <ion-option value="ប្រុស">ប្រុស</ion-option>\n                            </ion-select>\n                        </ion-item>\n                    </div>\n                  </ion-wizard-step>\n                        \n\n                  <ion-wizard-step>\n                    \n                      <div class="container1">                          \n                          \n                            <ion-item class="form1">\n                              <ion-label>ខេត្ត</ion-label>\n                            \n                                <ion-select [(ngModel)]="data.province">\n                                    \n                                  <ion-option *ngFor="let province of provinces" [value]="province.pcode">{{province.pname_en}}</ion-option>\n                                \n                                </ion-select>\n                              \n                            </ion-item>\n                            \n                          <ion-item class="form1" >\n                            <ion-label>ស្រុក</ion-label>\n                            <ion-select [(ngModel)]="data.district">\n                              <ion-option *ngFor="let district of districts" [value]="district.dcode">{{district.dname_en}}</ion-option>\n                              \n                            </ion-select>\n                          </ion-item>\n                          \n                          \n                          <ion-item class="form1">\n                            <ion-label>សាលារៀន</ion-label>\n                            <ion-select [(ngModel)]="data.school">\n                              <ion-option *ngFor="let school_list of school_lists" [value]="school_list.school_id">{{school_list.school_name}}</ion-option>\n                              \n                            </ion-select>\n                          </ion-item>\n                      </div>\n                    \n                  </ion-wizard-step>\n\n              </ion-form-wizard>\n         \n    </ion-grid>\n\n\n    \n</ion-content>\n\n\n<ion-footer>\n  <ion-toolbar>\n      <button ion-button clear class="bicon" (click)="backButtonClick()">\n        <ion-icon name="md-arrow-round-back"></ion-icon>\n      </button> \n      <button ion-button clear class="eicon" (click)="exitButtonClick()" (press)="toggleDebug()">\n        <ion-icon name="power"></ion-icon>\n      </button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/pages/form/form.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_toast__["a" /* Toast */],
            __WEBPACK_IMPORTED_MODULE_2__providers_database_database__["a" /* DatabaseProvider */]])
    ], FormPage);
    return FormPage;
}());

//# sourceMappingURL=form.js.map

/***/ }),

<<<<<<< HEAD
/***/ 113:
=======
<<<<<<< HEAD
/***/ 110:
=======
/***/ 112:
>>>>>>> 6a7077c9e29e96672c99877818dbbddd6dc88414
>>>>>>> 6a9c5a8adca3ce9a5fc6f2e0f49906e5951c08d3
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SectionReviewPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_database_database__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__question_question__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_audio__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__lesson_lesson__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






/**
 * Generated class for the SectionReviewPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SectionReviewPage = (function () {
    function SectionReviewPage(navCtrl, navParams, alertCtrl, platform, db, nativeAudio, changeRef) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.db = db;
        this.nativeAudio = nativeAudio;
        this.changeRef = changeRef;
        this.current = {};
        this.currentIndex = -1;
        this.sections = {};
        this.sectionsID = [];
        this.answerCorrect = this.navParams.get('answerCorrect');
        this.sectionID = this.navParams.get('sectionID');
        this.nextQuestionID = this.navParams.get('nextQuestionID');
        this.questionID = this.navParams.get('questionID');
        this.lessonId = this.navParams.get('lessonId');
        this.chapterID = this.navParams.get('chapterID');
        this.playCompleted = false;
        console.log('lesson id ', this.lessonId);
        console.log('chapter id', this.chapterID);
        this.getNumSection();
    }
    SectionReviewPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.db.executeSQL("SELECT * FROM sections WHERE id = " + this.sectionID)
            .then(function (res) {
            _this.sections = {};
            // var first = res.rows.item(0).id;
            _this.currentIndex = 0;
            for (var i = 0; i < res.rows.length; i++) {
                // this.sectionsID.push(res.rows.item(i).id);
                _this.sections = {
                    id: res.rows.item(i).id,
                    order: res.rows.item(i).order,
                    lesson: res.rows.item(i).lesson,
                    title: res.rows.item(i).title,
                    content: res.rows.item(i).content,
                    image1: res.rows.item(i).image1,
                    image2: res.rows.item(i).image2,
                    image3: res.rows.item(i).image3,
                    image4: res.rows.item(i).image4,
                    sound: res.rows.item(i).sound,
                    created_date: res.rows.item(i).created_date,
                    modified_date: res.rows.item(i).modified_date
                };
                //break;
            }
            _this.nativeAudio.preloadComplex(_this.sections.id, 'assets/sounds/' + _this.sections.sound, 1, 1, 0).then(function () {
                _this.nativeAudio.play(_this.sections.id, function () {
                    _this.nativeAudio.unload(_this.sections.id);
                    _this.playCompleted = true;
                    _this.changeRef.detectChanges();
                });
            });
            // console.log(this.sections.sound);
        }).catch(function (e) { return console.log((e)); });
    };
    SectionReviewPage.prototype.ionViewWillLeave = function () {
        var _this = this;
        this.nativeAudio.stop(this.sections.id).then(function () {
            _this.nativeAudio.unload(_this.sections.id);
        }, function () {
        });
    };
    SectionReviewPage.prototype.getNumSection = function () {
        var _this = this;
        var number_section = 0;
        console.log("LESSSON ID", this.lessonId);
        this.db.executeSQL("SELECT COUNT(*) as num_section FROM sections WHERE lesson = " + this.lessonId)
            .then(function (data) {
            number_section = data.rows.item(0).num_section;
            _this.num_section = number_section;
        }).catch(function (e) { return console.log((e)); });
    };
    SectionReviewPage.prototype.navigate = function () {
        //  // console.log('SEC_ID:', this.sectionID);
        // this.getNumSection().then(data =>{
        //
        // }).catch(e=>console.log(e));
        if (this.sectionID == this.num_section) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__lesson_lesson__["a" /* LessonPage */], {
                chapterID: this.chapterID,
            });
        }
        else
            (this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__question_question__["a" /* QuestionPage */], {
                nextQuestion: this.nextQuestionID,
                lessonID: this.sections.lesson,
                currentQuestionID: this.questionID,
                chapterID: this.chapterID
            }));
    };
    // goToLessonPage() {
    //   this.navCtrl.push(
    //       LessonPage, {
    //         // nextQuestion: this.nextQuestionID,
    //         // lessonID: this.sections.lesson,
    //         // currentQuestionID: this.questionID
    //       }
    //   );
    // }
    SectionReviewPage.prototype.toggleTest = function () {
        this.playCompleted = !this.playCompleted;
        this.changeRef.detectChanges();
    };
    SectionReviewPage.prototype.exitButtonClick = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'ចាកចេញ',
            message: 'តើ​អ្នក​ពិត​ជា​ចង់​ចាក​ចេញ​ពី​កម្មវិធី​នេះ?​',
            buttons: [
                {
                    text: "ទេ",
                    role: 'cancel'
                },
                {
                    text: "បាទ​ / ចាស",
                    handler: function () {
                        _this.platform.exitApp();
                    }
                },
            ]
        });
        alert.present();
    };
    SectionReviewPage.prototype.replayButtonClick = function () {
        var _this = this;
        // this.nativeAudio.preloadSimple(this.sections.id, 'assets/sounds/'+this.sections.sound).then(()=>{
        //   this.nativeAudio.play(this.sections.id, ()=>{
        //     this.nativeAudio.unload(this.sections.id);
        //   });
        // });
        // console.log(this.sections.sound);
        this.nativeAudio.stop(this.sections.id).then(function () {
            _this.nativeAudio.play(_this.sections.id, function () {
                _this.nativeAudio.unload(_this.sections.id);
            });
            console.log(_this.sections.id);
        }, function () {
        });
    };
    SectionReviewPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-section-review',template:/*ion-inline-start:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/pages/section-review/section-review.html"*/'<!--\n  Generated template for the SectionReviewPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar>\n    <!--<ion-title>-->\n      <!--មេរៀន​​ជំនួយ-->\n    <!--</ion-title>-->\n    <!--<ion-buttons float-start >-->\n      <!--<button ion-button icon-only (click)="goToLessonPage(current.lessonID)">-->\n        <!--<ion-icon name="arrow-round-back"></ion-icon>-->\n      <!--</button>-->\n    <!--</ion-buttons>-->\n    <ion-buttons [hidden]="!playCompleted" end>\n      <button ion-button icon-only (click)="navigate(current.next_question_id)">\n        សំនួរ​បន្ទាប់\n        <ion-icon name="arrow-round-forward"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n\n</ion-header>\n<ion-content class="content">\n  <!--<button ion-button primary (click)="toggleTest()">Toggle</button>-->\n  <!--<p>{{ playCompleted ? \'true\' : \'false\' }}</p>-->\n  <ion-scroll class="view_content" scrollY="true">\n    <ion-grid>\n      <ion-row>\n        <!--<ion-card text-wrap padding="10px">-->\n          <ion-col>\n            {{sections.content || \'\'}}\n          </ion-col>\n          <!--<ion-col width-100>-->\n            <!--&lt;!&ndash;<button width-100 *ngIf="answerCorrect" ion-button block color="primary" (click)="navigate(current.next_question_id, current.question_id)">&ndash;&gt;-->\n            <!--<button width-100 ion-button block color="primary" (click)="navigate(current.next_question_id, current.question_id)">-->\n              <!--សំនួរ​បន្ទាប់-->\n              <!--<ion-icon name="arrow-forward"></ion-icon>-->\n            <!--</button>-->\n          <!--</ion-col>-->\n        <!--</ion-card>-->\n      </ion-row>\n    </ion-grid>\n  </ion-scroll>\n</ion-content>\n<!--<ion-content padding>-->\n  <!--<ion-grid helper-view>-->\n    <!--<ion-row helper-view-head wrap>-->\n      <!--<ion-col width-100>-->\n        <!--<ion-card>-->\n          <!--<img src="" alt="">-->\n        <!--</ion-card>-->\n      <!--</ion-col>-->\n    <!--</ion-row>-->\n    <!--<ion-row helper-view-content>-->\n      <!--<ion-col width-100 padding>-->\n        <!--<h1>{{sections.title || \'\'}}</h1><br>-->\n        <!--&lt;!&ndash;<ion-card text-wrap>&ndash;&gt;-->\n        <!--{{sections.content || \'\'}}-->\n        <!--&lt;!&ndash;</ion-card>&ndash;&gt;-->\n      <!--</ion-col>-->\n      <!--<ion-col width-100>-->\n        <!--<button width-100 *ngIf="answerCorrect" ion-button block color="primary" (click)="navigate(current.next_question_id)">-->\n          <!--សំនួរ​បន្ទាប់-->\n          <!--<ion-icon name="arrow-forward"></ion-icon>-->\n        <!--</button>-->\n      <!--</ion-col>-->\n    <!--</ion-row>-->\n  <!--</ion-grid>-->\n\n<ion-footer unit-footer>\n  <ion-toolbar color="lightgreen">\n    <!--<button ion-button clear (click)="backButtonClick()" *ngIf="isUnitNextAllow == false">-->\n      <!--<ion-icon name="arrow-back"></ion-icon>-->\n    <!--</button>-->\n    <button ion-button float-start clear (click)="replayButtonClick()">\n      <ion-icon name="refresh"></ion-icon>\n    </button>\n    <button ion-button float-end clear (click)="exitButtonClick()" (press)="toggleDebug()">\n      <ion-icon name="power"></ion-icon>\n    </button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/pages/section-review/section-review.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__providers_database_database__["a" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_audio__["a" /* NativeAudio */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])
    ], SectionReviewPage);
    return SectionReviewPage;
}());

//# sourceMappingURL=section-review.js.map

/***/ }),

<<<<<<< HEAD
/***/ 114:
=======
<<<<<<< HEAD
/***/ 111:
=======
/***/ 113:
>>>>>>> 6a9c5a8adca3ce9a5fc6f2e0f49906e5951c08d3
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__starter_starter__ = __webpack_require__(115);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LoginPage = (function () {
    function LoginPage(navCtrl, navParams, alertCtrl, platform) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.username = "dfgdf";
        this.password = "fgdg";
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LoginPage');
    };
    LoginPage.prototype.showAlert = function (title, message) {
        var alert = this.alertCtrl.create({
            title: title,
            subTitle: message,
            buttons: ['OK']
        });
        alert.present();
    };
    LoginPage.prototype.signin = function () {
        if (/^[a-zA-Z0-9]+$/.test(this.username + this.password)) {
            this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__starter_starter__["a" /* StarterPage */], {
                username: this.username,
                password: this.password
            });
        }
        else {
            this.showAlert('Error', 'Invalid Username');
        }
    };
    LoginPage.prototype.backButtonClick = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            title: 'ចាកចេញ​ពីទំព័រនេះ?​',
            subTitle: '',
            buttons: [
                {
                    text: 'បោះបង់',
                    role: 'calcel'
                }, {
                    text: 'ចាកចេញ',
                    handler: function () {
                        _this.navCtrl.pop();
                    }
                }
            ]
        });
        confirm.present();
    };
    LoginPage.prototype.exitButtonClick = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'ចាកចេញ',
            message: 'តើ​អ្នក​ពិត​ជា​ចង់​ចាក​ចេញ​ពី​កម្មវិធី​នេះ?​',
            buttons: [
                {
                    text: "ទេ",
                    role: 'cancel'
                },
                {
                    text: "បាទ​ / ចាស",
                    handler: function () {
                        _this.platform.exitApp();
                    }
                },
            ]
        });
        alert.present();
    };
    LoginPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-login',template:/*ion-inline-start:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/pages/login/login.html"*/'<!--\n  Generated template for the LoginPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<!-- <ion-header>\n\n  <ion-navbar>\n    <ion-title>ការវិវត្តនៃភាវរស់</ion-title>\n  </ion-navbar>\n\n</ion-header> -->\n\n\n<ion-content padding class="background-img">\n  <!--<ion-label class="content">Signin</ion-label>-->\n  <div>    \n      <ion-item class="form1" id="btn01">\n        <ion-label outline>ឈ្មោះសម្គាល់</ion-label>\n        <ion-input type="text"></ion-input>\n      </ion-item>\n        \n      <ion-item class="form1">\n        <ion-label>ពាក្យសម្ងាត់</ion-label>\n        <ion-input type="password"></ion-input>\n      </ion-item>     \n  </div>\n  <div padding id="btn02">\n      <button block class="btn btn-primary btn-lg btn3d" id="btn0" (click)="signin()">Sign In</button>\n  </div>\n  \n\n</ion-content>\n\n<ion-footer>\n  <ion-toolbar>\n      <button ion-button clear class="bicon" (click)="backButtonClick()">\n        <ion-icon name="md-arrow-round-back"></ion-icon>\n      </button>\n      <button ion-button clear class="eicon" (click)="exitButtonClick()" (press)="toggleDebug()">\n        <ion-icon name="power"></ion-icon>\n      </button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/pages/login/login.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */]])
    ], LoginPage);
    return LoginPage;
}());

//# sourceMappingURL=login.js.map

/***/ }),

<<<<<<< HEAD
/***/ 115:
=======
/***/ 114:
>>>>>>> 6a7077c9e29e96672c99877818dbbddd6dc88414
>>>>>>> 6a9c5a8adca3ce9a5fc6f2e0f49906e5951c08d3
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return StarterPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__quiz_quiz__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_helpers_helpers__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__providers_database_database__ = __webpack_require__(22);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







/**
 * Generated class for the StarterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var StarterPage = (function () {
    function StarterPage(navCtrl, navParams, alertCtrl, platform, sqlite, helpers, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.sqlite = sqlite;
        this.helpers = helpers;
        this.db = db;
    }
    StarterPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad StarterPage');
    };
    StarterPage.prototype.goToHomePage = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_2__home_home__["a" /* HomePage */]);
    };
    StarterPage.prototype.goToQuiz = function () {
        var _this = this;
        // TO-DO by Samak using API #4//
        // Send request from App to get the latest settings
        //var new_no_of_quiz = this.helpers.getData("get_setting_app");
        this.helpers.getData("get_setting_app").then(function (result) {
            console.log("settings = " + localStorage.getItem('settings'));
            _this.no_of_quiz = result;
            // If new settings != old setting, then Update new settings into localStorage settings in App
            if (localStorage.getItem('settings') != _this.no_of_quiz)
                localStorage.setItem('settings', _this.no_of_quiz);
        }, function (err) {
            // Connection fail
            console.log(JSON.stringify("err = " + err));
        }).catch(function (e) {
            console.log('Error in listOfFacilities:' + e);
        });
        //this.updateNumberOfQuizColumn(new_no_of_quiz[""]);
        // ======END OF API #4 ======== //
        // TO-DO by Samak using API #6//
        // Send request from App with params: 1. total no. of records, 2. last downloaded date to get order quiz data from server
        // if total no. of records in order_questions == that of server,
        //  Server returns only the updated records recognized by in App modified_date, in Server updated_date
        // else => the total no. of records is different, then
        //  replace all records in App.
        // ======END OF API #4 ======== //
        /*
        ****** SINAT ******
        condition to check number of question that user played and compared with setting before allow user to play game
        */
        this.db.executeSQL("SELECT count(*) as total FROM user_quizzes WHERE user_id = 1 and created_date = date('now')")
            .then(function (res) {
            var num_q = res.rows.item(0).total; // num_q is a number that user have play for today
            console.log('get count number of question', num_q);
            // localStorage.setItem('num_q',num_q);
            var num_quiz = Number(localStorage.getItem('settings'));
            console.log('get number of settings =', num_quiz);
            // compare number of question that user play today with number that set from settings
            if (num_q < num_quiz) {
                console.log(num_q);
                console.log(num_quiz);
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__quiz_quiz__["a" /* QuizPage */]);
            }
            else {
                var alert_1 = _this.alertCtrl.create({
                    title: 'Welcome to Evolution!',
                    message: 'You have no more question for today!',
                    buttons: ['Ok']
                });
                alert_1.present();
            }
            // }).catch(e => console.log((e)));
        }).catch(function (e) { return console.log((e)); });
    };
    StarterPage.prototype.exitButtonClick = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'ចាកចេញ',
            message: 'តើ​អ្នក​ពិត​ជា​ចង់​ចាក​ចេញ​ពី​កម្មវិធី​នេះ?​',
            buttons: [
                {
                    text: "ទេ",
                    role: 'cancel'
                },
                {
                    text: "បាទ​ / ចាស",
                    handler: function () {
                        _this.platform.exitApp();
                    }
                },
            ]
        });
        alert.present();
    };
    StarterPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-starter',template:/*ion-inline-start:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/pages/starter/starter.html"*/'<!--\n  Generated template for the StarterPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header >\n\n  <ion-navbar >\n    <ion-title>Welcome to Evolution</ion-title>\n  </ion-navbar>\n\n</ion-header>\n<ion-content  class="content">\n\n  <div class="message ">\n    <ion-card no-padding>\n      <ion-card-content>\n        Today you have 2 Questions.\n      </ion-card-content>\n    </ion-card>\n  </div>\n  <div class="btnQuiz">\n    <button ion-button class="btn btn-primary btn-lg btn3d" block color="primary" (click)="goToQuiz()">\n      Play\n    </button>\n  </div>\n  <div class="btnReview">\n    <button ion-button class="btn btn-primary btn-lg btn3d" block color="primary" (click)="goToHomePage()">\n      Review\n    </button>\n  </div>\n</ion-content>\n\n<ion-footer class="footer">\n  <div class="btn-wrapper">\n    <button ion-button clear float-start (click)="exitButtonClick()">\n      <ion-icon name="power"></ion-icon>\n    </button>\n    <button ion-button clear float-end (click)="aboutButtonClick()">\n      About\n    </button>\n  </div>\n</ion-footer>\n'/*ion-inline-end:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/pages/starter/starter.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__["a" /* SQLite */],
            __WEBPACK_IMPORTED_MODULE_5__providers_helpers_helpers__["a" /* HelpersProvider */],
            __WEBPACK_IMPORTED_MODULE_6__providers_database_database__["a" /* DatabaseProvider */]])
    ], StarterPage);
    return StarterPage;
}());

//# sourceMappingURL=starter.js.map

/***/ }),

/***/ 116:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SectionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_database_database__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_audio__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__quiz_quiz__ = __webpack_require__(57);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the SectionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var SectionPage = (function () {
    function SectionPage(navCtrl, navParams, alertCtrl, platform, db, nativeAudio, changeRef) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.db = db;
        this.nativeAudio = nativeAudio;
        this.changeRef = changeRef;
        this.current = {};
        this.currentIndex = -1;
        this.sections = {};
        this.sectionsID = [];
        this.answerCorrect = this.navParams.get('answerCorrect');
        this.sectionID = this.navParams.get('sectionID');
        this.questionID = this.navParams.get('questionID');
        this.playCompleted = false;
        // console.log(this.answerCorrect);
        // console.log(this.sectionID);
        // console.log(this.sectionID);
    }
    /*
     ionViewDidEnter runs when the page has fully entered and is now the active page.
     Display SectionPage query by SELECT * FROM sections WHERE id = ${this.sectionID}
     */
    SectionPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.db.executeSQL("SELECT * FROM sections WHERE id = " + this.sectionID)
            .then(function (res) {
            _this.sections = {};
            // var first = res.rows.item(0).id;
            _this.currentIndex = 0;
            for (var i = 0; i < res.rows.length; i++) {
                // this.sectionsID.push(res.rows.item(i).id);
                _this.sections = {
                    id: res.rows.item(i).id,
                    order: res.rows.item(i).order,
                    lesson: res.rows.item(i).lesson,
                    title: res.rows.item(i).title,
                    content: res.rows.item(i).content,
                    image1: res.rows.item(i).image1,
                    image2: res.rows.item(i).image2,
                    image3: res.rows.item(i).image3,
                    image4: res.rows.item(i).image4,
                    sound: res.rows.item(i).sound,
                    created_date: res.rows.item(i).created_date,
                    modified_date: res.rows.item(i).modified_date
                };
                //break;
            }
            _this.nativeAudio.preloadComplex(_this.sections.id, 'assets/sounds/' + _this.sections.sound, 1, 1, 0).then(function () {
                _this.nativeAudio.play(_this.sections.id, function () {
                    _this.nativeAudio.unload(_this.sections.id);
                    _this.playCompleted = true;
                    _this.changeRef.detectChanges();
                });
            });
            // console.log(this.sections.sound);
        }).catch(function (e) { return console.log((e)); });
    };
    /*
       ionViewWillLeave(): when View is about to leave, Stopping current playback sound.
     */
    SectionPage.prototype.ionViewWillLeave = function () {
        var _this = this;
        this.nativeAudio.stop(this.sections.id).then(function () {
            _this.nativeAudio.unload(_this.sections.id);
        }, function () {
        });
    };
    /*
    function used when clicked on NextButton
     // num_q is a number that user have play for today
     // num_quiz is number of settings
     //if num_q < num_quiz then push to QuizPage
     // else pop to root page
     */
    SectionPage.prototype.navigate = function () {
        var _this = this;
        //select count * as column total FROM user_quizzes WHERE user_id = 1 and created_date = date('now')
        this.db.executeSQL("SELECT count(*) as total FROM user_quizzes WHERE user_id = 1 and created_date = date('now')")
            .then(function (res) {
            var num_q = res.rows.item(0).total; // num_q is a number that user have play for today
            console.log('get count number of question', num_q);
            var num_quiz = Number(localStorage.getItem('settings')); // num_quiz get from localStorage and set as a Number
            console.log('get number of settings =', num_quiz);
            // compare number of question that user play today with number that set from settings
            if (num_q < num_quiz) {
                console.log(num_q);
                console.log(num_quiz);
                _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__quiz_quiz__["a" /* QuizPage */], {
                    // questionID: this.getNextQuestionID(),
                    lessonID: _this.sections.lesson
                });
            }
            else {
                _this.navCtrl.popToRoot();
            }
            // }).catch(e => console.log((e)));
        }).catch(function (e) { return console.log((e)); });
    };
    SectionPage.prototype.exitButtonClick = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'ចាកចេញ',
            message: 'តើ​អ្នក​ពិត​ជា​ចង់​ចាក​ចេញ​ពី​កម្មវិធី​នេះ?​',
            buttons: [
                {
                    text: "ទេ",
                    role: 'cancel'
                },
                {
                    text: "បាទ​ / ចាស",
                    handler: function () {
                        _this.platform.exitApp();
                    }
                },
            ]
        });
        alert.present();
    };
    SectionPage.prototype.replayButtonClick = function () {
        var _this = this;
        this.nativeAudio.stop(this.sections.id).then(function () {
            _this.nativeAudio.play(_this.sections.id, function () {
                _this.nativeAudio.unload(_this.sections.id);
            });
            console.log(_this.sections.id);
        }, function () {
        });
    };
    SectionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-section',template:/*ion-inline-start:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/pages/section/section.html"*/'<!--\n  Generated template for the SectionPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar >\n    <!--<ion-title>-->\n      <!--មេរៀន​​ជំនួយ-->\n    <!--</ion-title>-->\n    <ion-buttons [hidden]="!playCompleted" end>\n        <!-- <ion-buttons  end> -->\n      <button ion-button icon-only (click)="navigate(current.next_question_id)">\n        សំនួរ​បន្ទាប់\n        <ion-icon name="arrow-round-forward"></ion-icon>\n      </button>\n    </ion-buttons>\n  </ion-navbar>\n</ion-header>\n<ion-content class="content">\n  <ion-scroll class="view_content" scrollY="true">\n    <ion-grid>\n      <ion-row>\n        <!--<ion-card text-wrap padding="10px">-->\n          <ion-col>\n            {{sections.content || \'\'}}\n          </ion-col>\n          <!--<ion-col width-100>-->\n            <!--<button width-100 *ngIf="answerCorrect" ion-button block color="primary" (click)="navigate(current.next_question_id)">-->\n              <!--សំនួរ​បន្ទាប់-->\n              <!--<ion-icon name="arrow-forward"></ion-icon>-->\n            <!--</button>-->\n          <!--</ion-col>-->\n        <!--</ion-card>-->\n      </ion-row>\n    </ion-grid>\n  </ion-scroll>\n</ion-content>\n\n<ion-footer unit-footer>\n  <ion-toolbar color="lightgreen">\n    <!--<button ion-button float-start clear (click)="backButtonClick()" *ngIf="isUnitNextAllow == false">-->\n      <!--<ion-icon name="arrow-back"></ion-icon>-->\n    <!--</button>-->\n    <button ion-button float-start clear (click)="replayButtonClick()">\n      <ion-icon name="refresh"></ion-icon>\n    </button>\n    <button ion-button float-end clear (click)="exitButtonClick()" (press)="toggleDebug()">\n      <ion-icon name="power"></ion-icon>\n    </button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/pages/section/section.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_2__providers_database_database__["a" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_audio__["a" /* NativeAudio */],
            __WEBPACK_IMPORTED_MODULE_0__angular_core__["j" /* ChangeDetectorRef */]])
    ], SectionPage);
    return SectionPage;
}());

//# sourceMappingURL=section.js.map

/***/ }),

/***/ 117:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return FacebookPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__ = __webpack_require__(89);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



/**
 * Generated class for the FacebookPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var FacebookPage = (function () {
    function FacebookPage(navCtrl, navParams, fb) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.fb = fb;
        this.isLoggedIn = false;
        this.getFbData();
    }
    FacebookPage.prototype.getFbData = function () {
        var _this = this;
        this.fb.login(['public_profile', 'user_friends', 'email'])
            .then(function (res) {
            if (res.status === "connected") {
                _this.isLoggedIn = true;
                _this.getUserDetail(res.authResponse.userID);
            }
            else {
                _this.isLoggedIn = false;
            }
        })
            .catch(function (e) { return console.log('Error logging into Facebook', e); });
    };
    FacebookPage.prototype.getUserDetail = function (userid) {
        var _this = this;
        this.fb.api("/" + userid + "/?fields=id,email,name,picture", ["public_profile"])
            .then(function (res) {
            console.log(res);
            _this.users = res;
        })
            .catch(function (e) {
            console.log(e);
        });
    };
    FacebookPage.prototype.logout = function () {
        var _this = this;
        this.fb.logout()
            .then(function (res) { return _this.isLoggedIn = false; })
            .catch(function (e) { return console.log('Error logout from Facebook', e); });
    };
    FacebookPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FacebookPage');
    };
    FacebookPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-facebook',template:/*ion-inline-start:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/pages/facebook/facebook.html"*/'<!--\n  Generated template for the FacebookPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>facebook</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n\n<ion-content padding>\n\n    \n    <ion-grid>\n        <div *ngIf="isLoggedIn; else facebookLogin">\n            <h2>Hi, {{users.name}} ({{users.email}}), how are you??</h2>\n            <!-- <p>\n              Gender: {{users.gender}}\n            </p> -->\n            <p>\n              <img src="{{users.picture.data.url}}" width="100" alt="{{users.name}}" />\n            </p>\n            <!-- <p>\n              {{users.friends}}\n            </p> -->\n            <button ion-button (click)="logout()">Logout</button>\n        </div>\n    </ion-grid>\n\n\n</ion-content>\n'/*ion-inline-end:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/pages/facebook/facebook.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_facebook__["a" /* Facebook */]])
    ], FacebookPage);
    return FacebookPage;
}());

//# sourceMappingURL=facebook.js.map

/***/ }),

/***/ 118:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WelcomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__home_home__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__quiz_quiz__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_sqlite__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_helpers_helpers__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_async__ = __webpack_require__(169);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_async___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_async__);
=======
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_toast__ = __webpack_require__(86);
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__form_form__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__facebook_facebook__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__ = __webpack_require__(89);
=======
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__form_form__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__login_login__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__ionic_native_facebook__ = __webpack_require__(172);
>>>>>>> 6a7077c9e29e96672c99877818dbbddd6dc88414
>>>>>>> 6a9c5a8adca3ce9a5fc6f2e0f49906e5951c08d3
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var WelcomePage = (function () {
    // isLoggedIn:boolean = false;
    // users: any;
    function WelcomePage(navCtrl, navParams, alertCtrl, platform, fb, toast) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.fb = fb;
        this.toast = toast;
        typeof this.navParams.get('infoID') == 'undefined' ? this.infoID = 'root' : this.infoID = this.navParams.get('infoID');
        //           fb.getLoginStatus()
        // .then(res => {
        //   console.log(res.status);
        //   if(res.status === "connect") {
        //     this.isLoggedIn = true;
        //   } else {
        //     this.isLoggedIn = false;
        //   }
        // })
        // .catch(e => console.log(e));
    }
    WelcomePage_1 = WelcomePage;
    WelcomePage.prototype.fbForm = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_5__facebook_facebook__["a" /* FacebookPage */]);
        // this.fb.login(['public_profile', 'user_friends', 'email'])
        //     .then((res: FacebookLoginResponse) => console.log('Logged into Facebook!', res))
        //     .catch(e => console.log('Error logging into Facebook', e));
        // this.fb.logEvent(this.fb.EVENTS.EVENT_NAME_ADDED_TO_CART);
<<<<<<< HEAD
=======
        this.fb.login(['public_profile', 'user_friends', 'email'])
            .then(function (res) {
            if (res.status === "connected") {
                _this.isLoggedIn = true;
                _this.getUserDetail(res.authResponse.userID);
            }
            else {
                _this.isLoggedIn = false;
            }
        })
            .catch(function (e) { return console.log('Error logging into Facebook', e); });
    };
<<<<<<< HEAD
    StarterPage.prototype.goToQuiz = function () {
        var _this = this;
        // TO-DO by Samak using API #4//
        // Send request from App to get the latest settings
        //var new_no_of_quiz = this.helpers.getData("get_setting_app");
        this.helpers.getData("get_setting_app").then(function (result) {
            console.log("settings = " + localStorage.getItem('settings'));
            _this.no_of_quiz = result;
            // If new settings != old setting, then Update new settings into localStorage settings in App
            if (localStorage.getItem('settings') != _this.no_of_quiz || localStorage.getItem('settings') == null) {
                localStorage.setItem('settings', _this.no_of_quiz);
                console.log("settings 2 = " + localStorage.getItem('settings'));
            }
            // else
            // localStorage.setItem('settings',this.no_of_quiz);
        }, function (err) {
            // Connection fail
            console.log(JSON.stringify("err = " + err));
        }).catch(function (e) {
            console.log('Error in listOfFacilities:' + e);
        });
        //this.updateNumberOfQuizColumn(new_no_of_quiz[""]);
        // ======END OF API #4 ======== //
        // TO-DO by Samak using API #6//
        // Send request from App with params: 1. total no. of records, 2. last downloaded date to get order quiz data from server
        // if total no. of records in order_questions == that of server,
        //  Server returns only the updated records recognized by in App modified_date, in Server updated_date
        // else => the total no. of records is different, then
        //  replace all records in App.
        var self = this;
        this.totalNoOfOrderQuestions()
            .then(function (value) {
            self.helpers.postData(value, "request_data_order_question_app").then(function (result) {
                self.responseData = result;
                console.log("Data Inserted Successfully = " + JSON.stringify(self.responseData));
                var codeReturn = JSON.parse(result["code"]);
                console.log("codeReturn = " + codeReturn);
                if (codeReturn == 200) {
                    // If data is synch successfully, update isSent=1 //
                    //console.log("Data Inserted Successfully = "+JSON.parse(JSON.parse(result["equal"])));
                    var equalReturn = JSON.parse(result["equal"]);
                    console.log("equalReturn = " + equalReturn);
                    switch (equalReturn) {
                        case 1:// num_q is not equal, replace a whole order_questions table
                            var objOrderQuestion = result["data"];
                            console.log("data = " + objOrderQuestion);
                            objOrderQuestion.forEach(function (item) {
                                self.updateOrderQuestion(item["id"], item["question_id"], item["next_question_id"], item["updated_at"]);
                            });
                            console.log("Replace Inserted!");
                            break;
                        case 0:// num_q is equal, update order_questions by id
                            var objOrderQuestion = result["data"];
                            objOrderQuestion.forEach(function (item) {
                                console.log("Item updated_at = " + item["updated_at"]);
                                self.replaceIntoOrderQuestion(item["id"], item["question_id"], item["next_question_id"], item["created_date"], item["updated_at"]);
                            });
                            console.log("Updated!");
                            break;
                    }
                }
                else
                    console.log("Synch Data Error");
                console.log("response = " + JSON.stringify(self.responseData));
            }).catch(function (e) {
                console.log('catch in totalNoOfOrderQuestions:' + e);
            });
        })
            .catch(function (e) {
            console.log('catch in totalNoOfOrderQuestions:' + e);
        });
        // ======END OF API #6 ======== //
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__quiz_quiz__["a" /* QuizPage */]);
=======
    WelcomePage.prototype.getUserDetail = function (userid) {
        var _this = this;
        this.fb.api("/" + userid + "/?fields=id,email,name,picture,gender", ["public_profile"])
            .then(function (res) {
            console.log(res);
            _this.users = res;
        })
            .catch(function (e) {
            console.log(e);
        });
>>>>>>> 6a7077c9e29e96672c99877818dbbddd6dc88414
>>>>>>> 6a9c5a8adca3ce9a5fc6f2e0f49906e5951c08d3
    };
    WelcomePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad WelcomePage');
    };
    WelcomePage.prototype.info = function (id) {
        this.navCtrl.push(WelcomePage_1, {
            infoID: id
        });
    };
    WelcomePage.prototype.createForm = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__form_form__["a" /* FormPage */]);
    };
    WelcomePage.prototype.login = function () {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__login_login__["a" /* LoginPage */]);
    };
    WelcomePage.prototype.backButtonClick = function () {
        this.navCtrl.pop();
    };
    WelcomePage.prototype.exitButtonClick = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'ចាកចេញ',
            message: 'តើ​អ្នក​ពិត​ជា​ចង់​ចាក​ចេញ​ពី​កម្មវិធី​នេះ?​',
            buttons: [
                {
                    text: "ទេ",
                    role: 'cancel'
                },
                {
                    text: "បាទ​ / ចាស",
                    handler: function () {
                        _this.platform.exitApp();
                    }
                },
            ]
        });
        alert.present();
    };
<<<<<<< HEAD
    StarterPage.prototype.totalNoOfOrderQuestions = function () {
        //var data_return = [];
        var _data = {
            "number_of_records": "",
            "last_download_date": ""
        };
        var self = this;
        var asyncTasks = [];
        var number_of_records = "number_of_records";
        var pro = new Promise(function (resolve, reject) {
            var subTasks = [];
            // Task to count total number of records in order_questions table
            subTasks.push(function (callback) {
                return __awaiter(this, void 0, void 0, function () {
                    var colNames, db, resColNames, num_q, err_1;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                colNames = [];
                                _a.label = 1;
                            case 1:
                                _a.trys.push([1, 4, , 5]);
                                return [4 /*yield*/, self.sqlite.create({
                                        name: 'biology.db',
                                        location: 'default'
                                    })];
                            case 2:
                                db = _a.sent();
                                return [4 /*yield*/, db.executeSql("SELECT COUNT(*) as total FROM order_questions", {})];
                            case 3:
                                resColNames = _a.sent();
                                num_q = resColNames.rows.item(0).total;
                                //_data['number_of_records']=num_q;
                                _data['number_of_records'] = "99"; //for testing only
                                callback(null, num_q);
                                return [3 /*break*/, 5];
                            case 4:
                                err_1 = _a.sent();
                                console.log(err_1);
                                return [3 /*break*/, 5];
                            case 5: return [2 /*return*/];
                        }
                    });
                });
            });
            // Task to max date from order_questions table
            subTasks.push(function (callback) {
                return __awaiter(this, void 0, void 0, function () {
                    var db, resMaxDate, maxDate, err_2;
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                _a.trys.push([0, 3, , 4]);
                                return [4 /*yield*/, self.sqlite.create({
                                        name: 'biology.db',
                                        location: 'default'
                                    })];
                            case 1:
                                db = _a.sent();
                                return [4 /*yield*/, db.executeSql('SELECT MAX(modified_date) as max_date FROM order_questions', {})];
                            case 2:
                                resMaxDate = _a.sent();
                                console.log('resMaxDate: ' + resMaxDate);
                                maxDate = resMaxDate.rows.item(0).max_date;
                                console.log('maxDate: ' + maxDate);
                                _data['last_download_date'] = maxDate;
                                callback(null, _data);
                                return [3 /*break*/, 4];
                            case 3:
                                err_2 = _a.sent();
                                console.error(err_2);
                                return [3 /*break*/, 4];
                            case 4: return [2 /*return*/];
                        }
                    });
                });
            });
            /*
            asyncTasks.push(function(callback) {
              async.waterfall(subTasks, (err, data) => {
                if (err) {
                  console.error(err);
                } else {
                  //data_return.push(data);
                  callback(null);
                }
              });
            });
          */
            __WEBPACK_IMPORTED_MODULE_6_async___default.a.series(subTasks, function (err, data) {
                try {
                    if (err) {
                        console.error(err);
                    }
                    else {
                        resolve(_data);
                        console.log(JSON.stringify(_data));
                    }
                }
                catch (err) {
                    console.log(err);
                }
            });
        });
        return pro;
    };
    StarterPage.prototype.updateOrderQuestion = function (id, question_id, next_question_id, modified_date) {
        this.sqlite.create({
            name: 'biology.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('UPDATE order_questions SET question_id=?, next_question_id=?, modified_date=? WHERE id=?', [question_id, next_question_id, modified_date, id])
                .then(function (res) {
                console.log('Data Updated!');
            })
                .catch(function (e) {
                console.log('Catch in Update order_questions:' + e);
            });
        })
            .catch(function (e) {
            console.log('Catch in updateOrderQuestion:' + e);
        });
    };
    StarterPage.prototype.replaceIntoOrderQuestion = function (id, question_id, next_question_id, created_date, modified_date) {
        this.sqlite.create({
            name: 'biology.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('REPLACE INTO order_questions(id, question_id,next_question_id,created_date,modified_date) VALUES (?,?,?,?,?)', [id, question_id, next_question_id, created_date, modified_date])
                .then(function (res) {
                console.log('Data Updated!');
            })
                .catch(function (e) {
                console.log('Catch in replaceIntoOrderQuestion:' + e);
            });
        });
    };
    StarterPage = __decorate([
=======
    WelcomePage = WelcomePage_1 = __decorate([
>>>>>>> 6a7077c9e29e96672c99877818dbbddd6dc88414
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-welcome',template:/*ion-inline-start:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/pages/welcome/welcome.html"*/'<!--\n  Generated template for the WelcomePage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <!--<ion-navbar>\n    <ion-title>ការវិវត្តនៃភាវរស់</ion-title>\n  </ion-navbar>-->\n\n</ion-header>\n\n<ion-content xela class="background-img">\n    \n\n    <!-- <ion-label class="content"></ion-label>\n    \n      <div padding>\n        <button ion-button block class="btn btn-primary btn-lg btn3d" id="btn1"><ion-icon class="ficon" name="logo-facebook"></ion-icon>Facebook</button>\n      </div>\n      <div padding>\n        <button ion-button block class="btn btn-primary btn-lg btn3d" (click)="createForm()">Register</button>\n      </div>\n  \n        <ion-label class="content1" (click)="login()">Log In</ion-label>\n        <ion-label class="content2" color="blue">About Evolution</ion-label> -->\n    \n<!-- </ion-content> -->\n\n<!-- <ion-footer>\n    <ion-toolbar>\n        <button ion-button block clear (click)="exitButtonClick()" (press)="toggleDebug()">\n        <ion-icon name="power"></ion-icon>\n        </button> -->\n\n    <ion-grid *ngIf="infoID == \'root\'">\n    \n        <div padding id="btn1">\n          <button class="btn btn-primary btn-lg btn3d" (click)="fbForm()"><ion-icon class="ficon" name="logo-facebook"></ion-icon>Facebook</button>\n          \n        </div>\n        <div padding id="btn2">\n          <button class="btn btn-primary btn-lg btn3d" (click)="createForm()">Register</button>\n        </div>\n    \n        <ion-label class="content1" (click)="login()">Log In</ion-label>\n\n    </ion-grid>\n\n\n\n   \n\n\n\n    <ion-grid *ngIf="infoID == \'C1\'">\n        <ion-scroll scrollbar-y="true" scrollbar-x="true">\n      <div class="evo">\n          <ion-label><b>Evidence of Evolution</b></ion-label>\n            <p>               \n                We cannot watch changes in life directly. They take place over thousands or millions of years. However, scientists cannot find proof that these changes have taken place. Important evidence for evolution comes from fossils, the leftovers of ancient life. When animals or plants die they are pressed into sand or clay. Over millions of years rocks are formed.\n                \n                FossilsScientists have found out that different fossils are found in rocks of different ages. For example, the oldest rocks of our earth are about 3.8 billion years old. They contain no fossils because there was probably no life at that time. Fossils of bacteria appear in rocks that are about 3.5 billion years old. Fish , reptile and mammal fossils appear in younger rocks. Human fossils are found only in the youngest and highest rock layers.\n                \n                Fossils also show that certain groups of animals have evolved from other groups. Amphibians evolved from fish that could breathe air and move on land. They had legs but also scales and a fin.\n            </p>\n\n            <p>    \n                Birds probably evolved from dinosaurs. The archaeopteryx was an animal that had feathers like a bird and could fly. It also had teeth, claws on its wings and a skeleton that looked like a meat-eating dinosaur.\n                \n                But even without fossils there is other proof which shows that evolution has taken place. Different species often have similar features which they probably got from a common ancestor. For example the front limbs of lizards, birds, bats and humans are very much alike. They have one bone in the upper arm, two in the forearm, wrist bones and five fingers.\n                \n                Living creatures might also have structures that they have inherited from an ancestor but have become useless. They don\'t need them any more. Pythons, for example, have the remains of back leg bones, but snakes do not have such legs. The appendix was used by animals that ate only plants but in our bodies these organs have become useless.\n                \n                The way in which different species occur all over the world also gives us evidence for evolution. Similar species, for example, are found together in certain areas. All types of kangaroos are found in Australia. This is because the kangaroos\' ancestors also lived there.\n                \n                Plants and animals do not always live in ideal places. Tropical ocean islands, for example, are ideal places for frogs to live, but no frogs \n            </p>\n          \n      </div>\n    </ion-scroll>\n    </ion-grid>\n\n</ion-content>\n\n<ion-footer >\n    <ion-toolbar *ngIf="infoID == \'C1\'">\n        <button ion-button clear *ngIf="infoID == \'C1\'" class="bicon" (click)="backButtonClick()">\n          <ion-icon name="md-arrow-round-back"></ion-icon>\n        </button>\n        <button ion-button clear *ngIf="infoID == \'C1\'" class="eicon" (click)="exitButtonClick()">\n          <ion-icon name="power"></ion-icon>\n        </button>\n    </ion-toolbar>\n    <ion-toolbar *ngIf="infoID == \'root\'" transparent>\n        <button ion-button clear *ngIf="infoID == \'root\'" class="eicon" (click)="exitButtonClick()">\n            <ion-icon name="power"></ion-icon>\n        </button>\n        <button ion-button clear *ngIf="infoID == \'root\'" class="content2" (click)="info(\'C1\')" color="blue">About</button>\n\n    </ion-toolbar>\n  </ion-footer>'/*ion-inline-end:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/pages/welcome/welcome.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_6__ionic_native_facebook__["a" /* Facebook */],
            __WEBPACK_IMPORTED_MODULE_2__ionic_native_toast__["a" /* Toast */]])
    ], WelcomePage);
    return WelcomePage;
    var WelcomePage_1;
}());

//# sourceMappingURL=welcome.js.map

/***/ }),

/***/ 128:
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = 128;

/***/ }),

/***/ 170:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"../pages/facebook/facebook.module": [
		302,
		9
	],
	"../pages/form/form.module": [
		299,
		8
	],
	"../pages/lesson/lesson.module": [
		300,
		7
	],
	"../pages/login/login.module": [
		301,
		6
	],
	"../pages/question/question.module": [
<<<<<<< HEAD
		303,
=======
<<<<<<< HEAD
		296,
		5
	],
	"../pages/quiz/quiz.module": [
		295,
		4
	],
	"../pages/section-review/section-review.module": [
		297,
=======
		302,
>>>>>>> 6a9c5a8adca3ce9a5fc6f2e0f49906e5951c08d3
		5
	],
	"../pages/quiz/quiz.module": [
		304,
		4
	],
	"../pages/section-review/section-review.module": [
<<<<<<< HEAD
		305,
=======
		304,
>>>>>>> 6a7077c9e29e96672c99877818dbbddd6dc88414
>>>>>>> 6a9c5a8adca3ce9a5fc6f2e0f49906e5951c08d3
		3
	],
	"../pages/section/section.module": [
		306,
		2
	],
	"../pages/starter/starter.module": [
		307,
		1
	],
	"../pages/welcome/welcome.module": [
		308,
		0
	]
};
function webpackAsyncContext(req) {
	var ids = map[req];
	if(!ids)
		return Promise.reject(new Error("Cannot find module '" + req + "'."));
	return __webpack_require__.e(ids[1]).then(function() {
		return __webpack_require__(ids[0]);
	});
};
webpackAsyncContext.keys = function webpackAsyncContextKeys() {
	return Object.keys(map);
};
webpackAsyncContext.id = 170;
module.exports = webpackAsyncContext;

/***/ }),

<<<<<<< HEAD
/***/ 215:
=======
<<<<<<< HEAD
/***/ 212:
=======
/***/ 214:
>>>>>>> 6a7077c9e29e96672c99877818dbbddd6dc88414
>>>>>>> 6a9c5a8adca3ce9a5fc6f2e0f49906e5951c08d3
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IonFormWizard; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__form_form__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_login__ = __webpack_require__(111);
=======
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
>>>>>>> 6a7077c9e29e96672c99877818dbbddd6dc88414
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

/*import { Keyboard } from '@ionic-native/keyboard';*/

var IonFormWizard = (function () {
    function IonFormWizard(evts) {
        this.evts = evts;
        this.finishIcon = 'send'; //Default
        this.showSteps = true; //Default
        this.step = 1; //Default
        this.finish = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.stepChange = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["v" /* EventEmitter */]();
        this.steps = 0; //Innitial
        this.hideWizard = false; //Default
        this.stepCondition = true; //Default
    }
    IonFormWizard.prototype.ngOnInit = function () {
        this.hideWizard = false;
    };
    /**
     * @return {number} New Steps
     */
    IonFormWizard.prototype.addStep = function () {
        var newSteps = this.steps + 1;
        this.steps = newSteps;
        return newSteps;
    };
    /**
     * @return {boolean} true if is the final step
     */
    IonFormWizard.prototype.isOnFinalStep = function () {
        return this.step === this.steps;
    };
    /**
     * @return {boolean} the current step condition
     */
    IonFormWizard.prototype.getCondition = function () {
        return this.stepCondition;
    };
    /**
     * @return {boolean} true if the the step is the first
     */
    IonFormWizard.prototype.isOnFirstStep = function () {
        return this.step === 1;
    };
    /**
     * @method back button event and emit Event Called 'step:back'
     */
    IonFormWizard.prototype.back = function () {
        this.stepChange.emit(this.step - 1);
        this.evts.publish('step:back');
    };
    /**
     * @method next button event and emit  Event Called 'step:next'
     */
    IonFormWizard.prototype.next = function () {
        this.stepChange.emit(this.step + 1);
        this.evts.publish('step:next');
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], IonFormWizard.prototype, "finishIcon", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Boolean)
    ], IonFormWizard.prototype, "showSteps", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], IonFormWizard.prototype, "step", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", Object)
    ], IonFormWizard.prototype, "finish", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["O" /* Output */])(),
        __metadata("design:type", Object)
    ], IonFormWizard.prototype, "stepChange", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["D" /* Input */])(),
        __metadata("design:type", Object)
    ], IonFormWizard.prototype, "stepCondition", void 0);
    IonFormWizard = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'ion-form-wizard',template:/*ion-inline-start:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/app/wizard.component.html"*/'<ng-content></ng-content>\n<div [hidden]="hideWizard" class="ion-wizard-footer">\n   <!--Back Button-->\n\n   <!-- div *ngIf="!isOnFirstStep()" left bottom>\n     <button (click)="back()">\n       Back\n     </button>\n   <div> -->\n\n\n   <!--Steps count-->   \n   <ion-badge *ngIf="showSteps">{{step}} / {{steps}}</ion-badge>\n   <!--Next Button-->\n   <div id="btn1" *ngIf="(!isOnFinalStep() && getCondition())">\n     <button ion-button class="btn btn-primary btn-lg btn3d" id="btn0" (click)="next()">\n       បន្ត\n     </button>\n    </div>\n\n   <!--Finish Button-->\n   <div id="btn1" *ngIf="(isOnFinalStep() && getCondition())">\n     <button ion-button class="btn btn-primary btn-lg btn3d" id="btn0" (click)="finish.emit(step + 1)">\n        បន្តទៀត\n     </button>\n   </div>\n </div>\n'/*ion-inline-end:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/app/wizard.component.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["c" /* Events */]])
    ], IonFormWizard);
    return IonFormWizard;
}());

//# sourceMappingURL=wizard.component.js.map

/***/ }),

<<<<<<< HEAD
/***/ 216:
=======
<<<<<<< HEAD
/***/ 213:
=======
/***/ 215:
>>>>>>> 6a7077c9e29e96672c99877818dbbddd6dc88414
>>>>>>> 6a9c5a8adca3ce9a5fc6f2e0f49906e5951c08d3
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(217);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(240);
=======
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(237);
=======
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__ = __webpack_require__(216);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__app_module__ = __webpack_require__(239);
>>>>>>> 6a7077c9e29e96672c99877818dbbddd6dc88414
>>>>>>> 6a9c5a8adca3ce9a5fc6f2e0f49906e5951c08d3


Object(__WEBPACK_IMPORTED_MODULE_0__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_1__app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

<<<<<<< HEAD
/***/ 237:
=======
/***/ 22:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DatabaseProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ionic_native_sqlite__ = __webpack_require__(43);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


/*
 Generated class for the DatabaseProvider provider.
 See https://angular.io/guide/dependency-injection for more info on providers
 and Angular DI.
 */
var DatabaseProvider = (function () {
    function DatabaseProvider(sqlite) {
        this.sqlite = sqlite;
        this.init({ name: "biology.db", location: "default" });
    }
    /**
     * Prepare Database for Application
     */
    DatabaseProvider.prototype.init = function (config) {
        /**
         * Set config
         */
        this._config = config;
        /**
         * sqlDB
         */
        var plugins = window.plugins;
        var sqlDBLocation;
        switch (config.location) {
            case "Documents":
                sqlDBLocation = 0;
                break;
            case "Library":
                sqlDBLocation = 1;
                break;
            default:
                sqlDBLocation = 2;
                break;
        }
        plugins.sqlDB.copy("biology.db", 0, this.dbCopySuccess, this.dbCopyError);
    };
    /**
     * Select * from tableName
     * @param tableName {string}
     */
    DatabaseProvider.prototype.table = function (tableName) {
        return this.sqlite.create(this._config).then(function (db) {
            console.log(db);
            return db.executeSql("SELECT * FROM " + tableName, {});
        });
    };
    DatabaseProvider.prototype.executeSQL = function (string) {
        return this.sqlite.create(this._config).then(function (db) {
            console.log(db);
            return db.executeSql(string, {});
        });
    };
    DatabaseProvider.prototype.dbCopySuccess = function (suc) {
        console.log(suc);
    };
    DatabaseProvider.prototype.dbCopyError = function (err) {
        console.log(err);
    };
    DatabaseProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__ionic_native_sqlite__["a" /* SQLite */]])
    ], DatabaseProvider);
    return DatabaseProvider;
}());

//# sourceMappingURL=database.js.map

/***/ }),

<<<<<<< HEAD
/***/ 240:
=======
/***/ 239:
>>>>>>> 6a7077c9e29e96672c99877818dbbddd6dc88414
>>>>>>> 6a9c5a8adca3ce9a5fc6f2e0f49906e5951c08d3
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(291);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_sqlite__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_toast__ = __webpack_require__(167);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_database_database__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_question_question__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_section_section__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_login_login__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_form_form__ = __webpack_require__(109);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_welcome_welcome__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__ionic_native_native_audio__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__pages_lesson_lesson__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__pages_quiz_quiz__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__pages_section_review_section_review__ = __webpack_require__(110);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__pages_starter_starter__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__providers_helpers_helpers__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__angular_http__ = __webpack_require__(168);
=======
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__(295);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__pages_home_home__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ionic_native_sqlite__ = __webpack_require__(43);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ionic_native_toast__ = __webpack_require__(86);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__providers_database_database__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__pages_question_question__ = __webpack_require__(56);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__pages_section_section__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__pages_login_login__ = __webpack_require__(114);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__pages_form_form__ = __webpack_require__(112);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__pages_welcome_welcome__ = __webpack_require__(118);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__pages_facebook_facebook__ = __webpack_require__(117);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__wizard_component__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__wizard_step_component__ = __webpack_require__(296);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__angular_platform_browser_animations__ = __webpack_require__(297);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__ionic_native_facebook__ = __webpack_require__(89);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__ionic_native_native_audio__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__pages_lesson_lesson__ = __webpack_require__(55);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__pages_quiz_quiz__ = __webpack_require__(57);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__pages_section_review_section_review__ = __webpack_require__(113);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__pages_starter_starter__ = __webpack_require__(115);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__providers_helpers_helpers__ = __webpack_require__(88);
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__angular_http__ = __webpack_require__(172);
=======
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__angular_http__ = __webpack_require__(170);
>>>>>>> 6a7077c9e29e96672c99877818dbbddd6dc88414
>>>>>>> 6a9c5a8adca3ce9a5fc6f2e0f49906e5951c08d3
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



























var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_lesson_lesson__["a" /* LessonPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_question_question__["a" /* QuestionPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_section_section__["a" /* SectionPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_form_form__["a" /* FormPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_welcome_welcome__["a" /* WelcomePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_facebook_facebook__["a" /* FacebookPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_quiz_quiz__["a" /* QuizPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_section_review_section_review__["a" /* SectionReviewPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_starter_starter__["a" /* StarterPage */],
                __WEBPACK_IMPORTED_MODULE_16__wizard_component__["a" /* IonFormWizard */],
                __WEBPACK_IMPORTED_MODULE_17__wizard_step_component__["a" /* IonFormWizardStep */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["f" /* IonicModule */].forRoot(__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */], {}, {
                    links: [
                        { loadChildren: '../pages/form/form.module#FormPageModule', name: 'FormPage', segment: 'form', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/lesson/lesson.module#LessonPageModule', name: 'LessonPage', segment: 'lesson', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/login/login.module#LoginPageModule', name: 'LoginPage', segment: 'login', priority: 'low', defaultHistory: [] },
<<<<<<< HEAD
                        { loadChildren: '../pages/facebook/facebook.module#FacebookPageModule', name: 'FacebookPage', segment: 'facebook', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/question/question.module#QuestionPageModule', name: 'QuestionPage', segment: 'question', priority: 'low', defaultHistory: [] },
=======
>>>>>>> 6a9c5a8adca3ce9a5fc6f2e0f49906e5951c08d3
                        { loadChildren: '../pages/quiz/quiz.module#QuizPageModule', name: 'QuizPage', segment: 'quiz', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/question/question.module#QuestionPageModule', name: 'QuestionPage', segment: 'question', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/section-review/section-review.module#SectionReviewPageModule', name: 'SectionReviewPage', segment: 'section-review', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/section/section.module#SectionPageModule', name: 'SectionPage', segment: 'section', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/starter/starter.module#StarterPageModule', name: 'StarterPage', segment: 'starter', priority: 'low', defaultHistory: [] },
                        { loadChildren: '../pages/welcome/welcome.module#WelcomePageModule', name: 'WelcomePage', segment: 'welcome', priority: 'low', defaultHistory: [] }
                    ]
                }),
                __WEBPACK_IMPORTED_MODULE_26__angular_http__["c" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_18__angular_platform_browser_animations__["a" /* BrowserAnimationsModule */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_2_ionic_angular__["d" /* IonicApp */]],
            entryComponents: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* MyApp */],
                __WEBPACK_IMPORTED_MODULE_6__pages_home_home__["a" /* HomePage */],
                __WEBPACK_IMPORTED_MODULE_21__pages_lesson_lesson__["a" /* LessonPage */],
                __WEBPACK_IMPORTED_MODULE_10__pages_question_question__["a" /* QuestionPage */],
                __WEBPACK_IMPORTED_MODULE_11__pages_section_section__["a" /* SectionPage */],
                __WEBPACK_IMPORTED_MODULE_12__pages_login_login__["a" /* LoginPage */],
                __WEBPACK_IMPORTED_MODULE_13__pages_form_form__["a" /* FormPage */],
                __WEBPACK_IMPORTED_MODULE_14__pages_welcome_welcome__["a" /* WelcomePage */],
                __WEBPACK_IMPORTED_MODULE_15__pages_facebook_facebook__["a" /* FacebookPage */],
                __WEBPACK_IMPORTED_MODULE_22__pages_quiz_quiz__["a" /* QuizPage */],
                __WEBPACK_IMPORTED_MODULE_23__pages_section_review_section_review__["a" /* SectionReviewPage */],
                __WEBPACK_IMPORTED_MODULE_24__pages_starter_starter__["a" /* StarterPage */]
            ],
            providers: [
                __WEBPACK_IMPORTED_MODULE_4__ionic_native_status_bar__["a" /* StatusBar */],
                __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */],
                __WEBPACK_IMPORTED_MODULE_20__ionic_native_native_audio__["a" /* NativeAudio */],
                { provide: __WEBPACK_IMPORTED_MODULE_1__angular_core__["u" /* ErrorHandler */], useClass: __WEBPACK_IMPORTED_MODULE_2_ionic_angular__["e" /* IonicErrorHandler */] },
                __WEBPACK_IMPORTED_MODULE_7__ionic_native_sqlite__["a" /* SQLite */],
                __WEBPACK_IMPORTED_MODULE_8__ionic_native_toast__["a" /* Toast */],
                __WEBPACK_IMPORTED_MODULE_9__providers_database_database__["a" /* DatabaseProvider */],
                __WEBPACK_IMPORTED_MODULE_25__providers_helpers_helpers__["a" /* HelpersProvider */],
                __WEBPACK_IMPORTED_MODULE_19__ionic_native_facebook__["a" /* Facebook */]
            ]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 295:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyApp; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(211);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(210);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_starter_starter__ = __webpack_require__(113);
=======
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(214);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_welcome_welcome__ = __webpack_require__(118);
=======
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__ = __webpack_require__(213);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__ = __webpack_require__(212);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__pages_welcome_welcome__ = __webpack_require__(116);
>>>>>>> 6a7077c9e29e96672c99877818dbbddd6dc88414
>>>>>>> 6a9c5a8adca3ce9a5fc6f2e0f49906e5951c08d3
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyApp = (function () {
    function MyApp(platform, statusBar, splashScreen) {
        // rootPage:any = WelcomePage;
        this.rootPage = __WEBPACK_IMPORTED_MODULE_4__pages_welcome_welcome__["a" /* WelcomePage */];
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            statusBar.styleDefault();
            splashScreen.hide();
        });
    }
    MyApp = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({template:/*ion-inline-start:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/app/app.html"*/'<ion-nav [root]="rootPage"></ion-nav>\n'/*ion-inline-end:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/app/app.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__ionic_native_status_bar__["a" /* StatusBar */], __WEBPACK_IMPORTED_MODULE_3__ionic_native_splash_screen__["a" /* SplashScreen */]])
    ], MyApp);
    return MyApp;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 296:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return IonFormWizardStep; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_animations__ = __webpack_require__(111);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__wizard_component__ = __webpack_require__(215);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_ionic_angular__ = __webpack_require__(11);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var IonFormWizardStep = (function () {
    function IonFormWizardStep(parent, evts) {
        var _this = this;
        this.parent = parent;
        this.evts = evts;
        this.step = this.parent.addStep();
        this.isCurrent = this.step === this.parent.step;
        this.parent.stepChange.subscribe(function (step) {
            _this.isCurrent = _this.step === step;
            if (_this.isCurrent) {
                _this.evts.publish('step:changed', _this.step);
            }
        });
    }
    IonFormWizardStep = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'ion-wizard-step',
            host: {
                '[@hideShowTrigger]': 'isCurrent ?"on":"off"'
            },
            template: "\n    \t<ng-content></ng-content>\n  \t",
            animations: [
                Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["h" /* trigger */])('hideShowTrigger', [
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* state */])('on', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* style */])({ display: "block" })),
                    Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["f" /* state */])('off', Object(__WEBPACK_IMPORTED_MODULE_1__angular_animations__["g" /* style */])({ display: 'none' }))
                ])
            ]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__wizard_component__["a" /* IonFormWizard */], __WEBPACK_IMPORTED_MODULE_3_ionic_angular__["c" /* Events */]])
    ], IonFormWizardStep);
    return IonFormWizardStep;
}());

//# sourceMappingURL=wizard.step.component.js.map

/***/ }),

/***/ 55:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LessonPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_database_database__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__question_question__ = __webpack_require__(56);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




/**
 * Generated class for the LessonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var LessonPage = (function () {
    function LessonPage(navCtrl, navParams, db) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.lessons = [];
        this.chapterID = navParams.get('chapterID');
        this.chapterTitle = navParams.get('chapterTitle');
        console.log(this.chapterID);
        console.log(this.chapterTitle);
        this.getLessons();
    }
    LessonPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad LessonPage');
    };
    /*
      Function to get list of lessons query by chapterID
     */
    LessonPage.prototype.getLessons = function () {
        var _this = this;
        this.db.executeSQL("SELECT * FROM lessons WHERE chapter = " + this.chapterID)
            .then(function (res) {
            _this.lessons = [];
            console.log(res);
            for (var i = 0; i < res.rows.length; i++) {
                _this.lessons.push({
                    id: res.rows.item(i).id,
                    number: res.rows.item(i).number,
                    title: res.rows.item(i).title,
                    chapter: res.rows.item(i).chapter,
                    created_date: res.rows.item(i).created_date,
                    modified_date: res.rows.item(i).modified_date
                });
            }
        }).catch(function (e) { return console.log((e)); });
    };
    /*
      Function when click on each lesson then push to QuestionPage by lessonID
     */
    LessonPage.prototype.lesson = function (lesson_id) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__question_question__["a" /* QuestionPage */], {
            lessonID: lesson_id,
            chapterID: this.chapterID
        });
    };
    LessonPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-lesson',template:/*ion-inline-start:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/pages/lesson/lesson.html"*/'<!--\n  Generated template for the LessonPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n\n  <ion-navbar>\n    <ion-title>មេរៀនទី</ion-title>\n  </ion-navbar>\n\n</ion-header>\n\n<ion-content>\n  <ion-grid class="content">\n    <ion-row class="choice">\n      <ion-item>\n        <ion-item-sliding *ngFor="let lessons of lessons; let i=index">\n          <ion-item no-lines no-padding >\n            <button ion-button class="btn btn-primary btn-lg btn3d" block color="primary" (click)="lesson(lessons.id)">\n              <div class="number">\n                {{lessons.number}}: {{lessons.title}}\n              </div>\n              <!--<div class="text">-->\n                <!--{{lessons.title}}-->\n              <!--</div>-->\n            </button>\n          </ion-item>\n        </ion-item-sliding>\n      </ion-item>\n    </ion-row>\n  </ion-grid>\n</ion-content>\n\n<!--<ion-footer>-->\n  <!--<ion-toolbar>-->\n    <!--<button ion-button clear (click)="playButtonClick()">-->\n      <!--<ion-icon name="play"></ion-icon>-->\n    <!--</button>-->\n    <!--<button ion-button clear (click)="exitButtonClick()" (press)="toggleDebug()">-->\n      <!--<ion-icon name="power"></ion-icon>-->\n    <!--</button>-->\n  <!--</ion-toolbar>-->\n<!--</ion-footer>-->\n'/*ion-inline-end:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/pages/lesson/lesson.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_database_database__["a" /* DatabaseProvider */]])
    ], LessonPage);
    return LessonPage;
}());

//# sourceMappingURL=lesson.js.map

/***/ }),

/***/ 56:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuestionPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_database_database__ = __webpack_require__(30);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_audio__ = __webpack_require__(44);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__section_review_section_review__ = __webpack_require__(110);
=======
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_database_database__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_audio__ = __webpack_require__(44);
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__section_review_section_review__ = __webpack_require__(113);
=======
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__section_review_section_review__ = __webpack_require__(112);
>>>>>>> 6a7077c9e29e96672c99877818dbbddd6dc88414
>>>>>>> 6a9c5a8adca3ce9a5fc6f2e0f49906e5951c08d3
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
var QuestionPage = (function () {
    function QuestionPage(navCtrl, navParams, db, nativeAudio, alertCtrl, platform, app) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.db = db;
        this.nativeAudio = nativeAudio;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.app = app;
        this.current = {};
        this.questions = {};
        this.answers = [];
        this.lessonID = navParams.get('lessonID');
        this.currentQuestionID = this.navParams.get('currentQuestionID');
        this.chapterID = this.navParams.get('chapterID');
        platform.ready().then(function () {
            //Registration of push in Android and Windows Phone
            platform.registerBackButtonAction(function () {
                var nav = _this.app.getActiveNav();
                console.log('Back is click');
                if (nav.canGoBack()) {
                    nav.popToRoot();
                }
                else {
                    _this.platform.exitApp(); //Exit from app
                }
            });
        });
    }
    /*
     ionViewDidEnter runs when the page has fully entered and is now the active page.
     Display Question query by lesson_id
     */
    QuestionPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.db.executeSQL("SELECT * FROM questions WHERE lesson_id = " + this.lessonID)
            .then(function (res) {
            _this.questions = {};
            var first = res.rows.item(0).id;
            for (var i = 0; i < res.rows.length; i++) {
                _this.questions[res.rows.item(i).id] = {
                    id: res.rows.item(i).id,
                    question_number: res.rows.item(i).question_number,
                    question_text: res.rows.item(i).question_text,
                    image1: res.rows.item(i).image1,
                    image2: res.rows.item(i).image2,
                    image3: res.rows.item(i).image3,
                    question_sound: res.rows.item(i).question_sound,
                    num_of_answer: res.rows.item(i).num_of_answer,
                    correct_answer_number: res.rows.item(i).correct_answer_number,
                    score: res.rows.item(i).score,
                    section_id: res.rows.item(i).section_id,
                    lesson_id: res.rows.item(i).lesson_id,
                    correct_answer_sound: res.rows.item(i).correct_answer_sound,
                    incorrect_answer_sound: res.rows.item(i).incorrect_answer_sound,
                    next_question_id: res.rows.item(i).next_question_id,
                    created_date: res.rows.item(i).created_date,
                    modified_date: res.rows.item(i).modified_date
                };
                //break;
            }
            console.log(_this.questions);
            _this.content(first);
        }).catch(function (e) { return console.log((e)); });
    };
    /*
     ionViewWillLeave(): when View is about to leave, Stopping current playback sound.
     */
    QuestionPage.prototype.ionViewWillLeave = function () {
        var _this = this;
        console.log("ionViewWillLeave(): View is about to leave, Stopping current playback sound.");
        this.nativeAudio.stop(this.current.id).then(function () {
            _this.nativeAudio.unload(_this.current.id);
        }, function () {
        });
    };
    /*
    Function to get Next sectionID that query by CurrentQuestionID
     this.sectionID = (res.rows.item(0).section_id)+1;
     */
    QuestionPage.prototype.getSectionID = function () {
        var _this = this;
        return this.db.executeSQL("SELECT * FROM questions WHERE id = " + this.currentQuestionID)
            .then(function (res) {
            _this.sectionID = (res.rows.item(0).section_id) + 1;
            console.log(_this.sectionID);
        }).catch(function (e) { return console.log((e)); });
    };
    /*
    Function to get Next Question query by section_id ORDER BY id ASC LIMIT 1.
     */
    QuestionPage.prototype.getNextQuestions = function (section_id) {
        var _this = this;
        return this.db.executeSQL("SELECT * FROM questions WHERE section_id = " + section_id + " ORDER BY id ASC LIMIT 1")
            .then(function (res) {
            //this.questions = {};
            for (var i = 0; i < res.rows.length; i++) {
                _this.questions = {
                    id: res.rows.item(i).id,
                    question_number: res.rows.item(i).question_number,
                    question_text: res.rows.item(i).question_text,
                    image1: res.rows.item(i).image1,
                    image2: res.rows.item(i).image2,
                    image3: res.rows.item(i).image3,
                    question_sound: res.rows.item(i).question_sound,
                    num_of_answer: res.rows.item(i).num_of_answer,
                    correct_answer_number: res.rows.item(i).correct_answer_number,
                    score: res.rows.item(i).score,
                    section_id: res.rows.item(i).section_id,
                    correct_answer_sound: res.rows.item(i).correct_answer_sound,
                    incorrect_answer_sound: res.rows.item(i).incorrect_answer_sound,
                    next_question_id: res.rows.item(i).next_question_id,
                    created_date: res.rows.item(i).created_date,
                    modified_date: res.rows.item(i).modified_date
                };
                //break;
            }
            console.log("Last Question", _this.questions);
        }).catch(function (e) { return console.log((e)); });
    };
    ;
    /*
    Get list of answer query by question_id
     */
    QuestionPage.prototype.getAnswers = function (questions_id) {
        var _this = this;
        this.db.executeSQL("SELECT * FROM answers WHERE question_id = " + questions_id)
            .then(function (res) {
            _this.answers = [];
            console.log(res);
            for (var i = 0; i < res.rows.length; i++) {
                _this.answers.push({
                    id: res.rows.item(i).id,
                    answer_text: res.rows.item(i).answer_text,
                    answer_order: res.rows.item(i).answer_order,
                    answer_image: res.rows.item(i).answer_image,
                    answer_sound: res.rows.item(i).answer_sound,
                    question_id: res.rows.item(i).question_id,
                    is_correct_answer: res.rows.item(i).is_correct_answer,
                    created_date: res.rows.item(i).created_date,
                    modified_date: res.rows.item(i).modified_date
                });
            }
        }).catch(function (e) { return console.log((e)); });
    };
    /*
        this Function to display content on screen
     */
    QuestionPage.prototype.content = function (id) {
        var _this = this;
        console.log(id);
        console.log("Hello : ", id);
        if (this.currentQuestionID) {
            //let temp = this.questions[this.nextQuestion];
            var temp = void 0;
            // if (typeof temp !== 'undefined') {
            //     //Get Next Question
            //     this.current = temp;
            // }
            console.group('Current');
            console.log('Get Next Question: ', this.current);
            console.groupEnd();
            if (typeof temp == 'undefined') {
                this.getSectionID().then(function () {
                    console.log("SECTION_ID : " + _this.sectionID);
                    _this.getNextQuestions(_this.sectionID).then(function () {
                        console.log("QUESTION", _this.questions);
                        _this.current = _this.questions;
                        console.log('TEST CUR:', _this.current);
                        console.log(_this.current.id);
                        console.log(_this.current.question_sound);
                        _this.getAnswers(_this.current.id);
                        _this.nativeAudio.preloadComplex(_this.current.id, 'assets/sounds/' + _this.current.question_sound, 1, 1, 0).then(function () {
                            _this.nativeAudio.play(_this.current.id, function () {
                                _this.nativeAudio.unload(_this.current.id);
                            });
                        });
                        console.log(_this.current.question_sound);
                    });
                });
            }
            else {
                this.getAnswers(this.current.id);
            }
        }
        else {
            this.current = this.questions[id];
            console.log(this.current);
            this.getAnswers(this.current.id);
            this.nativeAudio.preloadSimple(this.current.id, 'assets/sounds/' + this.current.question_sound).then(function () {
                _this.nativeAudio.play(_this.current.id, function () {
                    _this.nativeAudio.unload(_this.current.id);
                });
            });
            console.log(this.current.question_sound);
        }
    };
    /*
    this function when click on answer and push to SectionReviewPage with
    (answerCorrect, sectionID, questionID, lessonId, chapterID)
     */
    QuestionPage.prototype.answer = function (correct_ans, question_id) {
        var _this = this;
        // if correct_ans , play audio correct then push to SectionReviewPage
        if (correct_ans == 1) {
            return this.nativeAudio.preloadComplex('correct', 'assets/sounds/correct.mp3', 1, 1, 0).then(function () {
                return _this.nativeAudio.play('correct', function () {
                    _this.nativeAudio.unload('correct');
                    _this.db.executeSQL("select * from questions where id = '" + question_id + "'")
                        .then(function (res) {
                        var section_id = res.rows.item(0).section_id;
                        // let next_question_id = res.rows.item(0).next_question_id;
                        var current_question_id = res.rows.item(0).id;
                        console.log('section_id', section_id);
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__section_review_section_review__["a" /* SectionReviewPage */], {
                            answerCorrect: correct_ans,
                            sectionID: section_id,
                            // nextQuestionID: next_question_id,
                            questionID: current_question_id,
                            lessonId: _this.lessonID,
                            chapterID: _this.chapterID
                        });
                    });
                });
            });
        }
        else {
            /// if incorrect play wrong audio and push to SectionReviewPage
            return this.nativeAudio.preloadComplex('wrong', 'assets/sounds/wrong.mp3', 1, 1, 0).then(function () {
                return _this.nativeAudio.play('wrong', function () {
                    _this.nativeAudio.unload('wrong');
                    _this.db.executeSQL("select * from questions where id = '" + question_id + "'")
                        .then(function (res) {
                        var section_id = res.rows.item(0).section_id;
                        // let next_question_id = res.rows.item(0).next_question_id;
                        var current_question_id = res.rows.item(0).id;
                        console.log('section_id', section_id);
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_4__section_review_section_review__["a" /* SectionReviewPage */], {
                            answerCorrect: correct_ans,
                            sectionID: section_id,
                            // nextQuestionID: next_question_id
                            questionID: current_question_id,
                            lessonId: _this.lessonID,
                            chapterID: _this.chapterID
                        });
                    });
                });
            });
        }
    };
    /*
    Function to exit app when clicked on button
     */
    QuestionPage.prototype.exitButtonClick = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'ចាកចេញ',
            message: 'តើ​អ្នក​ពិត​ជា​ចង់​ចាក​ចេញ​ពី​កម្មវិធី​នេះ?​',
            buttons: [
                {
                    text: "ទេ",
                    role: 'cancel'
                },
                {
                    text: "បាទ​ / ចាស",
                    handler: function () {
                        _this.platform.exitApp();
                    }
                },
            ]
        });
        alert.present();
    };
    /*
    Function to replay audio sound file when clicked on button
     */
    QuestionPage.prototype.replayButtonClick = function () {
        var _this = this;
        this.nativeAudio.stop(this.current.id).then(function () {
            _this.nativeAudio.play(_this.current.id, function () {
                _this.nativeAudio.unload(_this.current.id);
            });
            console.log(_this.current.question_sound);
        }, function () {
        });
    };
    /*
    Function back page when clicked on button
     */
    QuestionPage.prototype.backButtonClick = function () {
        this.navCtrl.pop();
    };
    QuestionPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-question',template:/*ion-inline-start:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/pages/question/question.html"*/'<!--\n  Generated template for the QuestionPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="skyblue">\n    <ion-title>សំណួរ</ion-title>\n      <!--<ion-title>សំណួរទី {{current.question_number || \'\'}}</ion-title>  -->\n  </ion-navbar>\n</ion-header>\n<ion-content >\n    <ion-grid class="content">\n    <!--<ion-row class="content">-->\n        <!--<ion-col text-wrap width-100 padding>-->\n            <!--&lt;!&ndash;{{sections.image1}}&ndash;&gt;-->\n            <!--{{current.question_number || \'\'}}-->\n            <!--{{current.question_text || \'\'}}-->\n        <!--</ion-col>-->\n    <!--</ion-row>-->\n    <ion-row class="choice">\n        <ion-item>\n            <ion-item-sliding width-100 *ngFor="let answers of answers; let i=index">\n                <ion-item no-lines no-padding>\n                    <button ion-button class="btn btn-primary btn-lg btn3d" width-100 menu-header block color="primary" (click)="answer(answers.is_correct_answer, answers.question_id)">\n                        {{answers.answer_text}}\n                    </button>\n                </ion-item>\n            </ion-item-sliding>\n        </ion-item>\n    </ion-row>\n    </ion-grid>\n</ion-content>\n<ion-footer unit-footer>\n  <ion-toolbar  color="lightgreen">\n    <button ion-button float-start clear (click)="backButtonClick()">\n      <ion-icon name="arrow-back"></ion-icon>\n    </button>\n    <button ion-button clear (click)="replayButtonClick()">\n      <ion-icon name="refresh"></ion-icon>\n    </button>\n    <button ion-button float-end clear (click)="exitButtonClick()" (press)="toggleDebug()">\n      <ion-icon name="power"></ion-icon>\n    </button>\n  </ion-toolbar>\n</ion-footer>\n'/*ion-inline-end:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/pages/question/question.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */],
            __WEBPACK_IMPORTED_MODULE_2__providers_database_database__["a" /* DatabaseProvider */],
            __WEBPACK_IMPORTED_MODULE_3__ionic_native_native_audio__["a" /* NativeAudio */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */],
            __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */]])
    ], QuestionPage);
    return QuestionPage;
}());

//# sourceMappingURL=question.js.map

/***/ }),

/***/ 57:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return QuizPage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_database_database__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__section_section__ = __webpack_require__(116);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_audio__ = __webpack_require__(44);
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_helpers_helpers__ = __webpack_require__(87);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_sqlite__ = __webpack_require__(42);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_async__ = __webpack_require__(169);
=======
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__providers_helpers_helpers__ = __webpack_require__(88);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ionic_native_sqlite__ = __webpack_require__(43);
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_async__ = __webpack_require__(274);
=======
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_async__ = __webpack_require__(273);
>>>>>>> 6a7077c9e29e96672c99877818dbbddd6dc88414
>>>>>>> 6a9c5a8adca3ce9a5fc6f2e0f49906e5951c08d3
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_async___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_async__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};








/**
 * Generated class for the QuizPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
// *** Creator: SINAT *** //
var QuizPage = (function () {
    function QuizPage(navCtrl, navParams, alertCtrl, platform, db, nativeAudio, app, helpers, sqlite) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.platform = platform;
        this.db = db;
        this.nativeAudio = nativeAudio;
        this.app = app;
        this.helpers = helpers;
        this.sqlite = sqlite;
        this.current = {};
        this.questions = {};
        this.answers = [];
        this.lessonID = navParams.get('lessonID'); //Get param lessonID from SectionPage
        this.currentQuestionID = this.navParams.get('questionID');
        //console.log('current question id in constructor = ', this.currentQuestionID);
        platform.ready().then(function () {
            //Registration of push in Android and Windows Phone
            platform.registerBackButtonAction(function () {
                var nav = _this.app.getActiveNav();
                console.log('Back is click');
                if (nav.canGoBack()) {
                    nav.popToRoot();
                }
                else {
                    _this.platform.exitApp(); //Exit from app
                }
            });
        });
    }
    QuizPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        //Previous Question
        this.getUserQuestion().then(function () {
            // this.db.executeSQL(`SELECT * FROM questions WHERE id = ${this.userQuestion}`)
            console.log("userQuestion = " + _this.userQuestion);
            _this.db.executeSQL("SELECT * FROM questions WHERE id = " + _this.userQuestion)
                .then(function (res) {
                _this.questions = {};
                var first = res.rows.item(0).id;
                for (var i = 0; i < res.rows.length; i++) {
                    _this.questions[res.rows.item(i).id] = {
                        id: res.rows.item(i).id,
                        question_number: res.rows.item(i).question_number,
                        question_text: res.rows.item(i).question_text,
                        image1: res.rows.item(i).image1,
                        image2: res.rows.item(i).image2,
                        image3: res.rows.item(i).image3,
                        question_sound: res.rows.item(i).question_sound,
                        num_of_answer: res.rows.item(i).num_of_answer,
                        correct_answer_number: res.rows.item(i).correct_answer_number,
                        score: res.rows.item(i).score,
                        section_id: res.rows.item(i).section_id,
                        correct_answer_sound: res.rows.item(i).correct_answer_sound,
                        incorrect_answer_sound: res.rows.item(i).incorrect_answer_sound,
                        next_question_id: res.rows.item(i).next_question_id,
                        created_date: res.rows.item(i).created_date,
                        modified_date: res.rows.item(i).modified_date
                    };
                    //break;
                }
                console.log("Question Object" + JSON.stringify(_this.questions));
                _this.content(first);
            }).catch(function (e) { return console.log((e)); });
        });
    };
    /*
     ionViewWillLeave(): View is about to leave, Stopping playback sound current.id.
     */
    QuizPage.prototype.ionViewWillLeave = function () {
        var _this = this;
        console.log("ionViewWillLeave(): View is about to leave, Stopping current playback sound.");
        this.nativeAudio.stop(this.current.id).then(function () {
            _this.nativeAudio.unload(_this.current.id);
        }, function () {
        });
    };
    /*
     this function use to get nextQuestionID by
     SELECT * FROM order_questions WHERE question_id = ${this.currentQuestionID}.
     */
    QuizPage.prototype.getNextQuestions = function () {
        var _this = this;
        // console.log("this.currentQuestionID = "+this.currentQuestionID);
        return this.db.executeSQL("SELECT * FROM order_questions WHERE question_id = " + this.currentQuestionID)
            .then(function (res) {
            //this.questions = {};
            _this.nextQuestionID = res.rows.item(0).next_question_id;
            console.log("NEXT QUESTION ID", _this.nextQuestionID);
        }).catch(function (e) { return console.log((e)); });
    };
    ;
    /*
    Get User Question by nextQuestionID
     */
    QuizPage.prototype.getUserQuestion = function () {
        var _this = this;
        this.nextQuestionID = localStorage.getItem("NextQID");
        console.log("local storage NEXTQID = " + this.nextQuestionID);
        return this.db.executeSQL("SELECT * FROM questions WHERE id = " + this.nextQuestionID) // =?> Error 
            .then(function (res) {
            console.log("res in getUserQuestion = " + JSON.stringify(res));
            _this.userQuestion = res.rows.item(0).id;
        }).catch(function (err) {
            console.log("Error while query question from questions = " + err);
            _this.userQuestion = 1;
        });
    };
    /*
    Function Get Answers query by question_id
     */
    QuizPage.prototype.getAnswers = function (questions_id) {
        var _this = this;
        this.db.executeSQL("SELECT * FROM answers WHERE question_id = " + questions_id)
            .then(function (res) {
            _this.answers = [];
            console.log(res);
            for (var i = 0; i < res.rows.length; i++) {
                _this.answers.push({
                    id: res.rows.item(i).id,
                    answer_text: res.rows.item(i).answer_text,
                    answer_order: res.rows.item(i).answer_order,
                    answer_image: res.rows.item(i).answer_image,
                    answer_sound: res.rows.item(i).answer_sound,
                    question_id: res.rows.item(i).question_id,
                    is_correct_answer: res.rows.item(i).is_correct_answer,
                    created_date: res.rows.item(i).created_date,
                    modified_date: res.rows.item(i).modified_date,
                });
            }
        }).catch(function (e) { return console.log((e)); });
    };
    /*
    Function to display content on screen of question and answer with sound
     */
    QuizPage.prototype.content = function (id) {
        var _this = this;
        this.getNextQuestions().then(function () {
            _this.current = _this.questions[id];
            console.log('TEST CUR:', _this.current);
            console.log("nextQuestionID in content = " + _this.nextQuestionID);
            _this.getAnswers(_this.current.id);
            _this.nativeAudio.preloadComplex(_this.current.id, 'assets/sounds/' + _this.current.question_sound, 1, 1, 0).then(function () {
                _this.nativeAudio.play(_this.current.id, function () {
                    _this.nativeAudio.unload(_this.current.id);
                });
            });
            console.log(_this.current.question_sound);
        });
    };
    /*
     this function when click on answer and push to SectionReviewPage with
     (answerCorrect, sectionID, questionID) and save data to Table user_quizzes
     */
    QuizPage.prototype.answer = function (correct_ans, question_id, answer_order) {
        var _this = this;
        console.log('USER ANSWER ID', answer_order);
        // if correct_ans , play audio correct then push to SectionReviewPage
        if (correct_ans == 1) {
            return this.nativeAudio.preloadComplex('correct', 'assets/sounds/correct.mp3', 1, 1, 0).then(function () {
                return _this.nativeAudio.play('correct', function () {
                    _this.nativeAudio.unload('correct');
                    _this.db.executeSQL("select * from questions where id = '" + question_id + "'")
                        .then(function (res) {
                        var question_id = res.rows.item(0).id;
                        var section_id = res.rows.item(0).section_id;
                        // let next_question_id = res.rows.item(0).next_question_id;
                        console.log('section_id', section_id);
                        /*
                         //Save data to table user_quizzes
                         Samak API #2
                        */
                        //Save User_Question
                        _this.db.executeSQL("INSERT INTO user_quizzes ( user_id, question_id,user_ans_id, ans_correct, score, created_date, isSent) \n                                            VALUES (1," + question_id + "," + answer_order + "," + correct_ans + ",1, date('now'), 0)").then(function (res) {
                            console.log('Current number of question that has insert', res);
                        });
                        _this.synchUserQuizeToServer();
                        //End Save
                        // console.log(this.current.question_sound);
                        localStorage.setItem("currentQID", question_id);
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__section_section__["a" /* SectionPage */], {
                            answerCorrect: correct_ans,
                            sectionID: section_id,
                            questionID: question_id
                        });
                        // Get nextQID by SELECT * FROM order_questions WHERE question_id = ${localStorage.getItem("currentQID")
                        console.log("SELECT * FROM order_questions WHERE question_id =" + localStorage.getItem("currentQID"));
                        _this.db.executeSQL("SELECT * FROM order_questions WHERE question_id = " + localStorage.getItem("currentQID"))
                            .then(function (res) {
                            //this.questions = {};
                            var nextQID;
                            console.log("res result in getNextQuestionID = " + JSON.stringify(res));
                            nextQID = res.rows.item(0).next_question_id;
                            // set local storage for NextQID
                            localStorage.setItem("NextQID", nextQID);
                        }).catch(function (e) { return console.log((e)); });
                    });
                });
            });
        }
        else {
            return this.nativeAudio.preloadComplex('wrong', 'assets/sounds/wrong.mp3', 1, 1, 0).then(function () {
                return _this.nativeAudio.play('wrong', function () {
                    _this.nativeAudio.unload('wrong');
                    _this.db.executeSQL("select * from questions where id = '" + question_id + "'")
                        .then(function (res) {
                        var question_id = res.rows.item(0).id;
                        var section_id = res.rows.item(0).section_id;
                        var next_question_id = res.rows.item(0).next_question_id;
                        console.log('section_id', section_id);
                        //Save User_Question
                        _this.db.executeSQL("INSERT INTO user_quizzes ( user_id, question_id,user_ans_id, ans_correct, score, created_date, isSent) \n                                            VALUES (1," + question_id + "," + answer_order + "," + correct_ans + ",1, date('now'), 0)").then(function (res) {
                            console.log('Current number of question that has insert', res);
                        });
                        _this.synchUserQuizeToServer();
                        //End Save
                        // console.log(this.current.question_sound);
                        localStorage.setItem("currentQID", question_id);
                        _this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__section_section__["a" /* SectionPage */], {
                            answerCorrect: correct_ans,
                            sectionID: section_id,
                            questionID: question_id
                        });
                        // Get nextQID by SELECT * FROM order_questions WHERE question_id = ${localStorage.getItem("currentQID")
                        _this.db.executeSQL("SELECT * FROM order_questions WHERE question_id = " + localStorage.getItem("currentQID"))
                            .then(function (res) {
                            //this.questions = {};
                            var nextQID;
                            console.log("res result in getNextQuestionIDSamak = " + JSON.stringify(res));
                            nextQID = res.rows.item(0).next_question_id;
                            // set local storage for NextQID
                            localStorage.setItem("NextQID", nextQID);
                        }).catch(function (e) { return console.log((e)); });
                    });
                });
            });
        }
    };
    /*
     Function back page when clicked on button
     */
    QuizPage.prototype.backButtonClick = function () {
        this.navCtrl.pop();
    };
    /*
     Function to exit app when clicked on button
     */
    QuizPage.prototype.exitButtonClick = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            title: 'ចាកចេញ',
            message: 'តើ​អ្នក​ពិត​ជា​ចង់​ចាក​ចេញ​ពី​កម្មវិធី​នេះ?​',
            buttons: [
                {
                    text: "ទេ",
                    role: 'cancel'
                },
                {
                    text: "បាទ​ / ចាស",
                    handler: function () {
                        _this.platform.exitApp();
                    }
                },
            ]
        });
        alert.present();
    };
    /*
     Function to replay audio sound file of current.id of question when clicked on button
     */
    QuizPage.prototype.replayButtonClick = function () {
        var _this = this;
        this.nativeAudio.stop(this.current.id).then(function () {
            _this.nativeAudio.play(_this.current.id, function () {
                _this.nativeAudio.unload(_this.current.id);
            });
            console.log(_this.current.question_sound);
        }, function () {
        });
    };
    // *** END Creator: SINAT *** //
    // *** Creator: Samak *** //
    // * Function to synchronize data into server, then update isSent = 1 * //
    QuizPage.prototype.synchUserQuizeToServer = function () {
        var listOfTable = ["user_quizzes"];
        var self = this;
        this.retrieveDBSchema(listOfTable)
            .then(function (value) {
            self.helpers.postData(value, "insert_user_quiz_app").then(function (result) {
                self.responseData = result;
                if (JSON.parse(result["code"]) == 200) {
                    // If data is synch successfully, update isSent=1 //
                    self.updateIsSentColumn();
                    console.log("Data Inserted Successfully");
                }
                else
                    console.log("Synch Data Error");
                console.log("response = " + JSON.stringify(self.responseData));
            }, function (err) {
                // Connection fail
                console.log(JSON.stringify("err while postData= " + err));
            })
                .catch(function (e) {
                console.log('bleh:' + e);
            });
        })
            .catch(function (e) {
            console.log('bleh:' + e);
        });
    };
    // *** Creator: Samak *** //
    // * Function to select DB schema (column names), then construct JSON data to be sent to server* //
    // * Params: listOfTable: a list of tables whose column name will be retrieved //
    // * Return: Promise of JSON DATA to be sent to Server.
    QuizPage.prototype.retrieveDBSchema = function (listOfTable) {
        var data_return = [];
        var _data = {};
        var self = this;
        var asyncTasks = [];
        var pro = new Promise(function (resolve, reject) {
            for (var _i = 0, listOfTable_1 = listOfTable; _i < listOfTable_1.length; _i++) {
                var tableName = listOfTable_1[_i];
                console.log('tableName = ' + tableName);
                var subTasks = [];
                _data[tableName] = [];
                subTasks.push(function (callback) {
                    return __awaiter(this, void 0, void 0, function () {
                        var db, resColNames, colNames, index_colName, index, err_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    _a.trys.push([0, 3, , 4]);
                                    return [4 /*yield*/, self.sqlite.create({
                                            name: 'biology.db',
                                            location: 'default'
                                        })];
                                case 1:
                                    db = _a.sent();
                                    return [4 /*yield*/, db.executeSql("PRAGMA table_info('" + tableName + "')", {})];
                                case 2:
                                    resColNames = _a.sent();
                                    colNames = [];
                                    index_colName = 0;
                                    for (index = 1; index < 6; index++) {
                                        colNames[index_colName] = resColNames.rows.item(index).name;
                                        index_colName++;
                                    }
                                    callback(null, colNames);
                                    return [3 /*break*/, 4];
                                case 3:
                                    err_1 = _a.sent();
                                    console.log(err_1);
                                    return [3 /*break*/, 4];
                                case 4: return [2 /*return*/];
                            }
                        });
                    });
                });
                subTasks.push(function (colNames, callback) {
                    return __awaiter(this, void 0, void 0, function () {
                        var db, resOfflineRecords, i, eachData, valFromTable, col, obj, j, err_2;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    console.log('colNames: ' + JSON.stringify(colNames));
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 4, , 5]);
                                    return [4 /*yield*/, self.sqlite.create({
                                            name: 'biology.db',
                                            location: 'default'
                                        })];
                                case 2:
                                    db = _a.sent();
                                    return [4 /*yield*/, db.executeSql('SELECT * FROM user_quizzes where isSent=?', [0])
                                        //var resOfflineRecords = await db.executeSql('SELECT * FROM user_quizzes',[])
                                    ];
                                case 3:
                                    resOfflineRecords = _a.sent();
                                    //var resOfflineRecords = await db.executeSql('SELECT * FROM user_quizzes',[])
                                    console.log('resOfflineRecords: ' + JSON.stringify(resOfflineRecords));
                                    //console.log('object of resOfflineRecords: '+JSON.parse(resOfflineRecords));
                                    for (i = 0; i < resOfflineRecords.rows.length; i++) {
                                        eachData = resOfflineRecords.rows.item(i);
                                        console.log("test eachData: " + eachData);
                                        valFromTable = [eachData.user_id,
                                            eachData.question_id,
                                            eachData.user_ans_id,
                                            eachData.ans_correct,
                                            eachData.score];
                                        col = null;
                                        obj = {};
                                        for (j = 0; j < colNames.length; j++) {
                                            // Construct JSON string with key (column name)/value (offline data) pair //
                                            col = colNames[j];
                                            obj[col] = valFromTable[j];
                                        }
                                        _data[tableName].push(obj);
                                        console.log('_data = ' + JSON.stringify(_data));
                                    }
                                    callback(null, _data);
                                    return [3 /*break*/, 5];
                                case 4:
                                    err_2 = _a.sent();
                                    console.error(err_2);
                                    return [3 /*break*/, 5];
                                case 5: return [2 /*return*/];
                            }
                        });
                    });
                });
                asyncTasks.push(function (callback) {
                    __WEBPACK_IMPORTED_MODULE_7_async___default.a.waterfall(subTasks, function (err, data) {
                        if (err) {
                            console.error(err);
                        }
                        else {
                            data_return.push(data);
                            callback(null);
                        }
                    });
                });
            }
            __WEBPACK_IMPORTED_MODULE_7_async___default.a.series(asyncTasks, function (err, data) {
                if (err) {
                    console.error(err);
                }
                else {
                    resolve(data_return);
                    console.log(JSON.stringify(data_return));
                }
            });
        });
        return pro;
    };
    // *** Creator: Samak *** //
    // * Function to update isSent after data has been synchronized into server * //
    QuizPage.prototype.updateIsSentColumn = function () {
        this.sqlite.create({
            name: 'biology.db',
            location: 'default'
        }).then(function (db) {
            db.executeSql('UPDATE user_quizzes SET isSent=? WHERE isSent=0', [1])
                .then(function (res) {
                console.log('Data Updated!');
            })
                .catch(function (e) { return console.log(e); });
        });
    };
    QuizPage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-quiz',template:/*ion-inline-start:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/pages/quiz/quiz.html"*/'<!--\n  Generated template for the QuizPage page.\n\n  See http://ionicframework.com/docs/components/#navigation for more info on\n  Ionic pages and navigation.\n-->\n<ion-header>\n  <ion-navbar color="skyblue" >\n    <ion-title>សំណួរ</ion-title>\n      <!--<ion-title>សំណួរទី {{current.question_number || \'\'}}</ion-title>-->\n  </ion-navbar>\n</ion-header>\n<ion-content >\n    <ion-grid class="content">\n    <!--<ion-row class="content">-->\n    <!--<ion-col text-wrap width-100 padding>-->\n    <!--&lt;!&ndash;{{sections.image1}}&ndash;&gt;-->\n    <!--{{current.question_number || \'\'}}-->\n    <!--{{current.question_text || \'\'}}-->\n    <!--</ion-col>-->\n    <!--</ion-row>-->\n    <ion-row class="choice">\n        <ion-item >\n        <ion-item-sliding no-lines no-padding width-100 *ngFor="let answers of answers; let i=index">\n          <ion-item no-lines no-padding>\n            <button ion-button class="btn btn-primary btn-lg btn3d" width-100 menu-header block color="primary" (click)="answer(answers.is_correct_answer, answers.question_id,answers.answer_order)">\n              {{answers.answer_text}}\n            </button>\n          </ion-item>\n        </ion-item-sliding>\n        </ion-item>\n    </ion-row>\n    </ion-grid>\n</ion-content>\n<ion-footer unit-footer>\n  <ion-toolbar  color="lightgreen">\n    <button ion-button float-start clear (click)="backButtonClick()">\n      <ion-icon name="arrow-back"></ion-icon>\n    </button>\n    <button ion-button clear (click)="replayButtonClick()">\n      <ion-icon name="refresh"></ion-icon>\n    </button>\n    <button ion-button float-end clear (click)="exitButtonClick()" (press)="toggleDebug()">\n      <ion-icon name="power"></ion-icon>\n    </button>\n  </ion-toolbar>\n</ion-footer>'/*ion-inline-end:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/pages/quiz/quiz.html"*/,
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["i" /* NavParams */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["a" /* AlertController */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["j" /* Platform */], __WEBPACK_IMPORTED_MODULE_2__providers_database_database__["a" /* DatabaseProvider */], __WEBPACK_IMPORTED_MODULE_4__ionic_native_native_audio__["a" /* NativeAudio */], __WEBPACK_IMPORTED_MODULE_1_ionic_angular__["b" /* App */], __WEBPACK_IMPORTED_MODULE_5__providers_helpers_helpers__["a" /* HelpersProvider */], __WEBPACK_IMPORTED_MODULE_6__ionic_native_sqlite__["a" /* SQLite */]])
    ], QuizPage);
    return QuizPage;
}());

//# sourceMappingURL=quiz.js.map

/***/ }),

/***/ 87:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomePage; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_ionic_angular__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__providers_database_database__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__lesson_lesson__ = __webpack_require__(55);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var HomePage = (function () {
    function HomePage(navCtrl, db) {
        this.navCtrl = navCtrl;
        this.db = db;
        this.menuTitle = 'ជីវវិទ្យា​ ថ្នាក់​ទី​១២';
        this.state = 'chapters';
        this.chapters = [];
        this.lessons = [];
        this.getChapters();
    }
    /*
     function get list of chapters
     */
    HomePage.prototype.getChapters = function () {
        var _this = this;
        this.db
            .table("chapters")
            .then(function (res) {
            _this.chapters = [];
            console.log(res);
            for (var i = 0; i < res.rows.length; i++) {
                _this.chapters.push({
                    id: res.rows.item(i).id,
                    number: res.rows.item(i).number,
                    title: res.rows.item(i).title,
                    created_date: res.rows.item(i).created_date,
                    modified_date: res.rows.item(i).modified_date
                });
            }
        }).catch(function (e) { return console.log(e); });
    };
    /*
    Function when click on each of chapter then push to Lesson page
     */
    HomePage.prototype.chapter = function (chapter_id, chapter_title) {
        this.navCtrl.push(__WEBPACK_IMPORTED_MODULE_3__lesson_lesson__["a" /* LessonPage */], {
            chapterID: chapter_id,
            chapterTitle: chapter_title,
        });
    };
    HomePage = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["m" /* Component */])({
            selector: 'page-home',template:/*ion-inline-start:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/pages/home/home.html"*/'<ion-header>\n  <ion-navbar>\n    <ion-title >\n      បញ្ជីជំពូក\n    </ion-title>\n  </ion-navbar>\n</ion-header>\n\n<ion-content class="content">\n  <ion-scroll class="view_content" scrollY="true">\n    <ion-grid>\n      <ion-row class="choice">\n        <ion-item>\n          <ion-item-sliding *ngFor="let chapters of chapters; let i=index">\n            <ion-item no-lines no-padding>\n              <button ion-button class="btn btn-primary btn-lg btn3d" block  (click)="chapter(chapters.id, chapters.title)">\n                <div class="number">\n                  {{chapters.number}}: {{chapters.title}}\n                </div>\n                <!--<div class="text">-->\n                  <!--{{chapters.title}}-->\n                <!--</div>-->\n              </button>\n            </ion-item>\n          </ion-item-sliding>\n        </ion-item>\n      </ion-row>\n    </ion-grid>\n  </ion-scroll>\n\n\n<!-- <ion-content xela class="card-background-page">\n    <ion-card>\n        <img src="assets/imgs/01.jpg"/>\n    \n  chapter\n  \n  <ion-list *ngIf="state == \'chapters\'" no-lines>\n    <ion-item-sliding *ngFor="let chapters of chapters; let i=index">\n      <ion-item >\n          \n              \n        <button ion-button block color="primary" (click)="chapter(chapters.id)">\n          <div class="number">\n            ជំពូកទី: {{chapters.number}}\n          </div>\n          <div class="text">\n            {{chapters.title}}\n          </div>\n\n        </button>\n      \n      </ion-item>\n    </ion-item-sliding>\n  </ion-list>-->\n  \n\n  <!--lesson-->\n  <!--<ion-list equalized *ngIf="state == \'lessons\'" no-lines>\n    <ion-item-sliding *ngFor="let lessons of lessons; let i=index">\n      <ion-item width-100 menu-header class="animated fadeInUp">\n        <button ion-button block color="primary" (click)="lesson(lessons.id)">\n\n          <div class="number">\n            មេរៀនទី: {{lessons.number}}<br>\n          </div>\n          <div class="text">\n            {{lessons.title}}\n          </div>\n        </button>\n      </ion-item>\n    </ion-item-sliding>\n  </ion-list>\n</ion-card> -->\n\n</ion-content>\n\n<!--<ion-footer>-->\n  <!--<ion-toolbar>-->\n    <!--<button ion-button clear (click)="playButtonClick()">-->\n      <!--<ion-icon name="play"></ion-icon>-->\n    <!--</button>-->\n    <!--<button ion-button clear (click)="exitButtonClick()" (press)="toggleDebug()">-->\n      <!--<ion-icon name="power"></ion-icon>-->\n    <!--</button>-->\n  <!--</ion-toolbar>-->\n<!--</ion-footer>-->\n'/*ion-inline-end:"/home/sorya/Documents/n1/Biology_Game_Grad12/src/pages/home/home.html"*/
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1_ionic_angular__["h" /* NavController */],
            __WEBPACK_IMPORTED_MODULE_2__providers_database_database__["a" /* DatabaseProvider */]])
    ], HomePage);
    return HomePage;
}());

//# sourceMappingURL=home.js.map

/***/ }),

/***/ 88:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HelpersProvider; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_http__ = __webpack_require__(172);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(0);
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(273);
=======
<<<<<<< HEAD
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(270);
=======
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__ = __webpack_require__(272);
>>>>>>> 6a7077c9e29e96672c99877818dbbddd6dc88414
>>>>>>> 6a9c5a8adca3ce9a5fc6f2e0f49906e5951c08d3
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_map__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var apiUrl = "http://biology.open.org.kh/api/";
/*
  Generated class for the HelpersProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
var HelpersProvider = (function () {
    function HelpersProvider(http) {
        this.http = http;
        console.log('Hello HelpersProvider Provider');
    }
    HelpersProvider.prototype.postData = function (credentials, type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
            //this.http.post(apiUrl+type, JSON.stringify(credentials),{headers: headers})
            console.log("credentials data = " + JSON.stringify(credentials));
            console.log("apiUrl+type = " + apiUrl + type);
            //this.http.post(apiUrl+type, credentials)
            _this.http.post(apiUrl + type, credentials, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    HelpersProvider.prototype.getData = function (type) {
        var _this = this;
        return new Promise(function (resolve, reject) {
            var headers = new __WEBPACK_IMPORTED_MODULE_0__angular_http__["a" /* Headers */]();
            // this.http.get(apiUrl+type, {headers: headers})
            _this.http.get(apiUrl + type, { headers: headers })
                .subscribe(function (res) {
                resolve(res.json());
            }, function (err) {
                reject(err);
            });
        });
    };
    HelpersProvider = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_0__angular_http__["b" /* Http */]])
    ], HelpersProvider);
    return HelpersProvider;
}());

//# sourceMappingURL=helpers.js.map

/***/ })

<<<<<<< HEAD
},[216]);
=======
<<<<<<< HEAD
},[213]);
=======
},[215]);
>>>>>>> 6a7077c9e29e96672c99877818dbbddd6dc88414
>>>>>>> 6a9c5a8adca3ce9a5fc6f2e0f49906e5951c08d3
//# sourceMappingURL=main.js.map