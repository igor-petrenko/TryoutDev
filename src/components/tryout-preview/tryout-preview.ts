import { Component, Input } from '@angular/core';
import { NavController } from "ionic-angular";
import { RegistratorTryoutPage } from "../../pages/registrator-tryout/registrator-tryout";


@Component({
  selector: 'tryout-preview',
  templateUrl: 'tryout-preview.html'
})
export class TryoutPreviewComponent {

  @Input() tryoutId: number;
  @Input() tryoutDate: string;
  @Input() tryoutName: string;
  @Input() tryoutStatus: string;
  @Input() userMode: string;

  constructor(public navCtrl: NavController) {
  }

  openTryout () {
    if (this.userMode === "registrator") {
      this.navCtrl.push("RegistratorTryoutPage", {id: this.tryoutId, name: this.tryoutName, date: this.tryoutDate, status: this.tryoutStatus});
    }
    else {

    }
  }
}
