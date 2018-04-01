import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { of } from "rxjs/observable/of";
import { RestProvider } from "../rest/rest";

export class Player {
  id: number;
  shirt: string;
  name: string;
  age: number;
  position: string;
}

@Injectable()
export class PlayersProvider {

  constructor(public http: HttpClient, private api: RestProvider) {

  }

  public getTryoutPlayers(tryoutId: number): Observable<Player[]> {
    let players = JSON.parse(localStorage.getItem('players_' + tryoutId));
    if (!players) {
      players = [
        {id: 1, shirt: '5', name: "Johnson Smith", age: 11, position: 'Setter', image: 'http://icons-for-free.com/free-icons/png/128/1814089.png'},
        {id: 2, shirt: '12', name: "Frank Griffin", age: 12, position: 'Middle blocker', image: 'http://icons-for-free.com/free-icons/png/128/1814089.png'},
        {id: 3, shirt: '56', name: "Linda Mezzano", age: 11, position: 'Setter', image: 'http://icons-for-free.com/free-icons/png/128/1814089.png'},
        {id: 4, shirt: '90', name: "Jack Richard", age: 13, position: 'Outside hitter', image: 'http://icons-for-free.com/free-icons/png/128/1814089.png'},
        {id: 5, shirt: '15', name: "Ervin Howell", age: 10, position: 'Right side hitter', image: 'http://icons-for-free.com/free-icons/png/128/1814089.png'}
      ];
      localStorage.setItem('players_' + tryoutId, JSON.stringify(players));
    }
    return of(players);

    // return this.api.getTryoutPlayers(tryoutId);
  }

  public addPlayer (tryoutId, playerData) {
    let players = JSON.parse(localStorage.getItem('players_' + tryoutId));
    if (!players) {
      players = [];
    }
    playerData.id = players[players.length - 1].id + 1;
    playerData.image = 'http://icons-for-free.com/free-icons/png/128/1814089.png';
    players.push(playerData);
    localStorage.setItem('players_' + tryoutId, JSON.stringify(players));

    return of({status: 'success'});

    // return this.api.addNewPlayer(tryoutId, playerData);
  }

}
