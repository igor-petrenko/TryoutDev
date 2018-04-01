import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TryoutCreatePage } from './tryout-create';

@NgModule({
  declarations: [
    TryoutCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(TryoutCreatePage),
  ],
})
export class TryoutCreatePageModule {}
