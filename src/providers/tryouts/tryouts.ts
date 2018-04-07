import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RestProvider } from "../rest/rest";
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";


export class Tryout {
  id: number;
  date: string;
  name: string;
  status: string;
}


@Injectable()
export class TryoutsProvider {

  private selectedTryout: Tryout;

  constructor(public http: HttpClient, private api: RestProvider) {

  }

  public loadAllTryouts(): Observable<Tryout[]> {
    let tryouts = JSON.parse(localStorage.getItem('tryouts'));
    if (!tryouts) {
      tryouts = [{id: 1, date: '2017-03-03', name: "Spring 2017", status: 'closed'},{id: 2, date: '2017-10-15', name: "Autumn 2017", status: 'opened'}];
      localStorage.setItem('tryouts', JSON.stringify(tryouts));
    }
    return of(tryouts);

    // return this.api.getTryouts();
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

  public createNewTryout (data) {
    let tryouts = JSON.parse(localStorage.getItem('tryouts'));
    if (!tryouts) {
      tryouts = [];
    }
    data.id = tryouts[tryouts.length - 1].id + 1;
    data.status = 'opened';
    tryouts.push(data);
    localStorage.setItem('tryouts', JSON.stringify(tryouts));

    return of({status: 'success'});
    // return this.api.createNewTryout(data);
  }

  public closeTryout (tryoutId: number) {
    let tryouts = JSON.parse(localStorage.getItem('tryouts'));
    if (!tryouts) {
      tryouts = [];
    }

    for (var i = 0; i < tryouts.length; i++) {
      if (tryoutId === tryouts[i].id) {
        tryouts[i].status = 'closed';
        break;
      }
    }
    localStorage.setItem('tryouts', JSON.stringify(tryouts));

    return of({status: 'success'});

    // return this.api.closeTryout(tryoutId);
  }

}
