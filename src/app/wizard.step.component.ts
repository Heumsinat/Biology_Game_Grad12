import { Component } from '@angular/core';
import { state, trigger, style } from '@angular/animations';
import { IonFormWizard } from './wizard.component';
import { Events } from 'ionic-angular';

@Component({
    selector: 'ion-wizard-step',
    host: {
        '[@hideShowTrigger]': 'isCurrent ?"on":"off"'
    },
    template: `
    	<ng-content></ng-content>
  	`,
   	animations:[
   	 trigger('hideShowTrigger', [
      state('on', style({ display:"block"})),
      state('off', style({ display: 'none' }))
    ])
      ]
})
export class IonFormWizardStep {
    public isCurrent;
    public step;
    constructor(public parent: IonFormWizard, public evts: Events) {
        this.step = this.parent.addStep();
        this.isCurrent = this.step === this.parent.step;
        this.parent.stepChange.subscribe(step => {
            this.isCurrent = this.step === step;
            if (this.isCurrent) {
                this.evts.publish('step:changed', this.step);
            }

        });
    }
}
