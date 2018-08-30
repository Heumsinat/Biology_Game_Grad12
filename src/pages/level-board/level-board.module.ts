import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LevelBoardPage } from './level-board';

@NgModule({
  declarations: [
    LevelBoardPage,
  ],
  imports: [
    IonicPageModule.forChild(LevelBoardPage),
  ],
})
export class LevelBoardPageModule {}
