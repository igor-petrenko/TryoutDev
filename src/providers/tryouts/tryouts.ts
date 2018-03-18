import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from "../user/user";
import { RestProvider } from "../rest/rest";


export class Tryout {
  id: number;
  date: string;
  name: string;
  status: string;
}


@Injectable()
export class TryoutsProvider {

  private tryoutsList: Tryout[];
  private selectedTryout: Tryout;

  constructor(public http: HttpClient, private api: RestProvider) {

  }

  public loadAllTryouts() {
    return this.api.getTryouts();
  }

  public getSelected (): Tryout {
    return this.selectedTryout;
  }

  public setSelected (data: Tryout) {
    if (!data) return;

    this.selectedTryout = data;
  }

  public clearSelectedTryout () {
    this.selectedTryout = null;
  }

  public createNewTryout (data: Tryout) {
    return this.api.createNewTryout(data);
  }

}
