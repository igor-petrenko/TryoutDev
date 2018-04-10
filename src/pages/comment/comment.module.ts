import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CommentPage } from './comment';
import { DirectivesModule } from "../../directives/directives.module";

@NgModule({
  declarations: [
    CommentPage,
  ],
  imports: [
    DirectivesModule,
    IonicPageModule.forChild(CommentPage),
  ],
})
export class CommentPageModule {}
