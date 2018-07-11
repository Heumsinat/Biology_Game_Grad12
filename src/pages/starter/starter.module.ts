import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { StarterPage } from './starter';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    StarterPage,
  ],
  imports: [
    IonicPageModule.forChild(StarterPage),
    TranslateModule.forChild()
  ],
})
export class StarterPageModule {}
