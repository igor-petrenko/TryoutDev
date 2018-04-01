import { NgModule } from '@angular/core';
import { TryoutPreviewComponent } from './tryout-preview/tryout-preview';
import { IonicModule } from "ionic-angular";
@NgModule({
	declarations: [TryoutPreviewComponent],
	imports: [IonicModule],
	exports: [TryoutPreviewComponent]
})
export class ComponentsModule {}
