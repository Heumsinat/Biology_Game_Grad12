import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormPage } from './form';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
    FormPage,
  ],
  imports: [
    IonicPageModule.forChild(FormPage),
    TranslateModule.forChild()
  ],
})
export class FormPageModule {}
