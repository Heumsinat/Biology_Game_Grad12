import { Component } from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams, Platform} from 'ionic-angular';
import { DatabaseProvider } from "../../providers/database/database";
import {SectionPage} from "../section/section";
import {tryCatch} from "rxjs/util/tryCatch";

/**
 * Generated class for the QuestionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-question',
  templateUrl: 'question.html',
})
export class QuestionPage {
  current: any = {};
  questions: any = {};
  answers: any = [];
  lessonID: number;
  nextQuestion: number;
  //totalQuestion: number;
    userQuestion: number;
  constructor(public navCtrl: NavController, public navParams: NavParams,private alertCtrl: AlertController,private platform: Platform, public db: DatabaseProvider) {
    this.lessonID = navParams.get('lessonID');
    this.nextQuestion = this.navParams.get('nextQuestion');
    this.getUserQuestion(1).then(()=>{
        this.db.executeSQL(`SELECT * FROM questions WHERE id = ${this.userQuestion}`)
            .then(res => {
                this.questions = {};
                var first = res.rows.item(0).id;
                for (var i = 0; i < res.rows.length; i++){
                    this.questions[res.rows.item(i).id] = {
                        id:res.rows.item(i).id,
                        question_number:res.rows.item(i).question_number,
                        question_text:res.rows.item(i).question_text,
                        image1:res.rows.item(i).image1,
                        image2:res.rows.item(i).image2,
                        image3:res.rows.item(i).image3,
                        question_sound:res.rows.item(i).question_sound,
                        num_of_answer:res.rows.item(i).num_of_answer,
                        correct_answer_number:res.rows.item(i).correct_answer_number,
                        score:res.rows.item(i).score,
                        section_id:res.rows.item(i).section_id,
                        correct_answer_sound:res.rows.item(i).correct_answer_sound,
                        incorrect_answer_sound:res.rows.item(i).incorrect_answer_sound,
                        next_question_id:res.rows.item(i).next_question_id,
                        created_date:res.rows.item(i).created_date,
                        modified_date:res.rows.item(i).modified_date
                    }
                    //break;
                }
                console.log(this.questions);
                this.content(first);

            }).catch(e => console.log((e)))
    });

  }
  getQuestions(lesson_id: number){
      return this.db.executeSQL(`SELECT * FROM questions WHERE lesson_id = ${lesson_id}`)
          .then(res => {
              this.questions = {};
              var first = res.rows.item(0).id;
              for (var i = 0; i < res.rows.length; i++){
                  this.questions[res.rows.item(i).id] = {
                      id:res.rows.item(i).id,
                      question_number:res.rows.item(i).question_number,
                      question_text:res.rows.item(i).question_text,
                      image1:res.rows.item(i).image1,
                      image2:res.rows.item(i).image2,
                      image3:res.rows.item(i).image3,
                      question_sound:res.rows.item(i).question_sound,
                      num_of_answer:res.rows.item(i).num_of_answer,
                      correct_answer_number:res.rows.item(i).correct_answer_number,
                      score:res.rows.item(i).score,
                      section_id:res.rows.item(i).section_id,
                      correct_answer_sound:res.rows.item(i).correct_answer_sound,
                      incorrect_answer_sound:res.rows.item(i).incorrect_answer_sound,
                      next_question_id:res.rows.item(i).next_question_id,
                      created_date:res.rows.item(i).created_date,
                      modified_date:res.rows.item(i).modified_date
                  }
                  //break;
              }
              console.log("questions", this.questions);
          }).catch(e => console.log((e)))
  };

  getUserQuestion(user_id: number){
        return this.db.executeSQL(`SELECT * FROM user_questions WHERE user_id = ${user_id}`)
            .then(res => {
                console.log("lesson", res);
                this.userQuestion = res.rows.item(0).next_question_id;
            }).catch(e => {
                console.log((e));
                this.userQuestion =1;
            })
  }

  getLessonID(question_id: number){
      return this.db.executeSQL(`SELECT * FROM questions WHERE question_number = ${question_id}`)
          .then(res => {
              console.log("lesson", res);
                  this.lessonID = res.rows.item(0).lesson_id;
          }).catch(e => console.log((e)))
  }

  getAnswers(questions_id: number) {
    this.db.executeSQL(`SELECT * FROM answers WHERE question_id = ${questions_id}`)
        .then(res => {
          this.answers = [];
          console.log(res);
          for (var i = 0; i<res.rows.length; i++){
            this.answers.push({
              id:res.rows.item(i).id,
              answer_text:res.rows.item(i).answer_text,
              answer_order:res.rows.item(i).answer_order,
              answer_image:res.rows.item(i).answer_image,
              answer_sound:res.rows.item(i).answer_sound,
              question_id:res.rows.item(i).question_id,
              is_correct_answer:res.rows.item(i).is_correct_answer,
              created_date:res.rows.item(i).created_date,
              modified_date:res.rows.item(i).modified_date
            })
          }
        }).catch(e => console.log((e)))
  }

  content(id) {
    console.log(id);
    //console.log(this.current);
    if (this.nextQuestion){
        let temp = this.questions[this.nextQuestion];
        if (typeof temp !== 'undefined') {
            //Get Next Question
            this.current = temp;
        }
        console.group('Current');
        console.log('Get Next Question: ', this.current);
        console.groupEnd();

        if (typeof temp == 'undefined'){
            this.getLessonID(this.nextQuestion).then(()=>{
                console.log("LESSON_DATA:" + this.lessonID);
                this.getQuestions(this.lessonID).then(()=>{
                    console.log("QUS", this.questions);
                    this.current = this.questions[this.nextQuestion];
                    this.getAnswers(this.current.id);
                });
            });
        } else {
            this.getAnswers(this.current.id);
        }
    }
    else{
        this.current = this.questions[id];
        // console.log(this.current);
        this.getAnswers(this.current.id);
    }
  }
  public answer (correct_ans: number, question_id: number){
      this.db.executeSQL(`select * from questions where id = '${question_id}'`)
          .then(res => {
              let section_id = res.rows.item(0).section_id;
              let next_question_id = res.rows.item(0).next_question_id;
              console.log('section_id', section_id);
              //Save User_Question
              this.db.executeSQL(`INSERT INTO user_question ( num_of_ans, next_question_id) VALUES ("' + correct_ans + '","' + next_question_id + '")`).then(res=>{
                  console.log(res);
              });
              //End Save
              this.navCtrl.push(SectionPage, {
                  answerCorrect: correct_ans,
                  sectionID: section_id,
                  nextQuestionID: next_question_id
              });
          });
  }
    exitButtonClick() {
        let alert = this.alertCtrl.create({
            title: 'ចាកចេញ',
            message: 'តើ​អ្នក​ពិត​ជា​ចង់​ចាក​ចេញ​ពី​កម្មវិធី​នេះ?​',
            buttons: [
                {
                    text: "ទេ",
                    role: 'cancel'
                },
                {
                    text: "បាទ​ / ចាស",
                    handler: () => {
                        this.platform.exitApp();
                    }
                },
            ]
        });
        alert.present();
    }

}
