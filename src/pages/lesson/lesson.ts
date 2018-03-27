import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";
import {QuestionPage} from "../question/question";

/**
 * Generated class for the LessonPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lesson',
  templateUrl: 'lesson.html',
})
export class LessonPage {
  lessons: any = [];
    chapterID: number;
  constructor(public navCtrl: NavController, public navParams: NavParams,public db: DatabaseProvider) {
      this.chapterID = navParams.get('chapterID');
      this.getLessons();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LessonPage');
  }

  getLessons(){
      this.db.executeSQL(`SELECT * FROM lessons WHERE chapter = ${this.chapterID}`)
        .then(res => {
          this.lessons = [];
          console.log(res);
          for (var i = 0; i<res.rows.length; i++){
            this.lessons.push({
              id:res.rows.item(i).id,
              number:res.rows.item(i).number,
              title:res.rows.item(i).title,
              chapter:res.rows.item(i).chapter,
              created_date:res.rows.item(i).created_date,
              modified_date:res.rows.item(i).modified_date
            })
          }
        }).catch(e => console.log((e)))
  }

  public lesson(lesson_id: number) {
    this.navCtrl.push(
        QuestionPage, {
          lessonID: lesson_id
        }
    );
  }

}
