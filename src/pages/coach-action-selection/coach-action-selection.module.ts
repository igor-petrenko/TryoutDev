import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CoachActionSelectionPage } from './coach-action-selection';

@NgModule({
  declarations: [
    CoachActionSelectionPage,
  ],
  imports: [
    IonicPageModule.forChild(CoachActionSelectionPage),
  ],
})
export class CoachActionSelectionPageModule {}
