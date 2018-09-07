import { Component,  ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import {DatabaseProvider} from "../../providers/database/database";

/**
 * Generated class for the LevelBoardPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-level-board',
  templateUrl: 'level-board.html',
})
export class LevelBoardPage {
   @ViewChild('content') content:any;

  levels: any = [
    {'bg' : 'rgba(0, 128, 0, 0.966)'},
    {'bg' : 'skyblue'},
    {'bg' : 'blue'},
    {'bg' : 'lightseagreen'},
    {'bg' : 'lightgreen'},
    {'bg' : 'lightcyan'},
    {'bg' : 'blue'},
    {'bg' : 'rgb(21, 248, 21)'},
  ];
  position: any = [
    {'left' : '0px'},
    {'left' : '230px'},
    {'left' : '110px'},
    {'left' : '10px'},
    {'left' : '130px'},
    {'left' : '230px'},
    {'left' : '5px'},
    {'left' : '150px'},
  ]
  // index: number = this.index + 8;
 
   sections: any =[];
   
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public db: DatabaseProvider) {
    // this.index = this.index + 1;
    // console.log('==========> index: ',this.index);
    this.getSections();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LevelBoardPage');
  }
  ionViewDidEnter(){
    this.content.scrollToBottom(0);
  }
  
  getSections(){
    this.db.executeSQL(`SELECT * FROM sections`)
      .then(res => {
        this.sections = [];
        let bgIndex = 0;
        let postionIndex =0;
        for (var i = res.rows.length-1; i>=0; i--){
          this.sections.push({
            id: res.rows.item(i).id,
            bg: this.levels[bgIndex].bg,
            left: this.position[postionIndex].left,
            

          });
          bgIndex++;
          postionIndex++;
          if(bgIndex == 8)
            bgIndex = 0;
          if(postionIndex == 8)
          postionIndex = 0  
        }
      }).catch(e => console.log((e)))
}

}
