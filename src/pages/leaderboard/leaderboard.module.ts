import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LeaderboardPage } from './leaderboard';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [
    LeaderboardPage,
  ],
  imports: [
    IonicPageModule.forChild(LeaderboardPage),
    TranslateModule.forChild()
  ],
})
export class LeaderboardPageModule {}
