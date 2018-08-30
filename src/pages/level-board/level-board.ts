import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  levels: any = [1, 2, 3];
  index: number = this.index + 8;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    // this.index = this.index + 1;
    console.log('==========> index: ',this.index);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LevelBoardPage');
  }

}
