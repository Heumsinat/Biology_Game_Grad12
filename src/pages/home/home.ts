import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DatabaseProvider } from "../../providers/database/database";
import {LessonPage} from "../lesson/lesson";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  public menuTitle = 'ជីវវិទ្យា​ ថ្នាក់​ទី​១២';
  state: string = 'chapters';
  chapters: any = [];
  lessons: any = [];
  constructor(
      public navCtrl: NavController,
      public db: DatabaseProvider
  ){
    this.getChapters();
  }

  /*
   function get list of chapters
   */
  getChapters(){
    this.db
        .table("chapters")
        .then(res => {
          this.chapters = [];
          console.log(res);
          for (var i = 0; i<res.rows.length; i++){
            this.chapters.push({
              id:res.rows.item(i).id,
              number:res.rows.item(i).number,
              title:res.rows.item(i).title,
              created_date:res.rows.item(i).created_date,
              modified_date:res.rows.item(i).modified_date
            })
          }
        }).catch(e => console.log(e));
  }
    /*
    Function when click on each of chapter then push to Lesson page
     */
    public chapter(chapter_id: number, chapter_title: string) {
        this.navCtrl.push(
            LessonPage, {
                chapterID: chapter_id,
                chapterTitle: chapter_title,
            }
        );
    }
}
