import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PlayerEditPage } from './player-edit';

@NgModule({
  declarations: [
    PlayerEditPage,
  ],
  imports: [
    IonicPageModule.forChild(PlayerEditPage),
  ],
})
export class PlayerEditPageModule {}
