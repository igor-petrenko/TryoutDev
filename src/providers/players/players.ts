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
  image: string;
  suggestedPosition: string;
}

export class Comment {
  id: number;
  date: string;
  comment: string;
}

@Injectable()
export class PlayersProvider {

  constructor(public http: HttpClient, private api: RestProvider) {

  }

  public getTryoutPlayers(tryoutId: number): Observable<Player[]> {
    let players = JSON.parse(localStorage.getItem('players_' + tryoutId));
    if (!players) {
      players = [
        {id: 1, shirt: '5', name: "Johnson Smith", age: 11, position: 'Setter', image: ''},
        {id: 2, shirt: '12', name: "Frank Griffin", age: 12, position: 'Middle Blocker', image: ''},
        {id: 3, shirt: '56', name: "Linda Mezzano", age: 11, position: 'Setter', image: ''},
        {id: 4, shirt: '90', name: "Jack Richard", age: 13, position: 'Outside hitter', image: ''},
        {id: 5, shirt: '15', name: "Ervin Howell", age: 10, position: 'Right side hitter', image: ''}
      ];
      localStorage.setItem('players_' + tryoutId, JSON.stringify(players));
    }
    return of(players);

    // return this.api.getTryoutPlayers(tryoutId);
  }


  /*********** Player deteails ************/

  public addPlayer (tryoutId, playerData) {
    let players = JSON.parse(localStorage.getItem('players_' + tryoutId));
    if (!players) {
      players = [];
    }
    playerData.id = PlayersProvider.getRandomId();
    players.push(playerData);
    localStorage.setItem('players_' + tryoutId, JSON.stringify(players));

    return of({status: 'success'});

    // return this.api.addNewPlayer(tryoutId, playerData);
  }

  public editPlayer (tryoutId, playerData) {
    let players = JSON.parse(localStorage.getItem('players_' + tryoutId));
    if (!players) {
      players = [];
    }

    let player = players.find(item => item.id === playerData.id);
    player.shirt = playerData.shirt;
    player.name = playerData.name;
    player.age = playerData.age;
    player.position = playerData.position;
    player.image = playerData.image;

    localStorage.setItem('players_' + tryoutId, JSON.stringify(players));

    return of({status: 'success'});

    // return this.api.addNewPlayer(tryoutId, playerData);
  }

  public removePlayer (tryoutId, playerId: number) {
    let players = JSON.parse(localStorage.getItem('players_' + tryoutId));
    if (!players) {
      players = [];
    }
    for (var i = 0; i < players.length; i++) {
      if (players[i].id === playerId) {
        players.splice(i, 1);
        break;
      }
    }
    localStorage.setItem('players_' + tryoutId, JSON.stringify(players));

    return of({status: 'success'});
    // return this.api.removePlayer(tryoutId, player);
  }


  /*********** Comments ************/

  public getPlayerComments (tryoutId: number, userId: number, playerId: number) {
    let comments = JSON.parse(localStorage.getItem('comments_' + tryoutId + '_' + userId + '_' + playerId));
    if (!comments) {
      comments = [
        {id: 1, date: '04/05/2018', comment: "First comment"},
        {id: 2, date: '04/05/2018', comment: "Second comment"},
        {id: 3, date: '06/05/2018', comment: "third comment"},
        {id: 4, date: '07/05/2018', comment: "Long comment: text text text text text more text text text text text one more text text text text text"},
        {id: 5, date: '07/05/2018', comment: "Last comment"}
      ];
      localStorage.setItem('comments_' + tryoutId + '_' + userId + '_' + playerId, JSON.stringify(comments));
    }

    return of(comments);

    // return this.api.getPlayerComments(tryoutId, userId, playerId);
  }

  public saveComment(commentId, commentText, playerId, userId, tryoutId) {
    let comments = JSON.parse(localStorage.getItem('comments_' + tryoutId + '_' + userId + '_' + playerId));
    if (!comments) comments = [];

    let comment = comments.find(item => item.id === commentId);
    let isCreate = false;
    if (!comment) {
      isCreate = true;
      comment = {
        id: PlayersProvider.getRandomId(),
        comment: commentText,
        date: new Date().toLocaleDateString()
      }
    }
    else {
      comment.comment = commentText;
      comment.date = new Date().toLocaleDateString();
    }

    if (isCreate) {
      comments.push(comment);
    }

    localStorage.setItem('comments_' + tryoutId + '_' + userId + '_' + playerId, JSON.stringify(comments));

    return of({status: 'success'});
  }

  private static getRandomId():number {
    return Math.floor(Math.random() * (999999999 - 1 + 1)) + 1;
  }

  public removeComment(commentId, playerId, userId, tryoutId) {
    let comments = JSON.parse(localStorage.getItem('comments_' + tryoutId + '_' + userId + '_' + playerId));
    if (!comments) {
      return of({status: 'success'});
    }

    let index = comments.findIndex(item => item.id === commentId);
    if (index !== -1) {
      comments.splice(index, 1);
    }
    localStorage.setItem('comments_' + tryoutId + '_' + userId + '_' + playerId, JSON.stringify(comments));

    return of({status: 'success'});
  }

  /*********** Suggestions ************/

  public getTeamSuggestions(userId, tryoutId) {
    let suggestions = JSON.parse(localStorage.getItem('suggestions_' + tryoutId + '_' + userId));
    if (!suggestions) suggestions = [];
    return of(suggestions);
  }

  public getPlayerSuggestion(userId, tryoutId, playerId) {
    let suggestions = JSON.parse(localStorage.getItem('suggestions_' + tryoutId + '_' + userId));
    if (!suggestions || !suggestions.length) suggestions = [];
    let suggestion = suggestions.find(item => item.playerId === playerId);
    return of(suggestion);
  }

  public saveSuggestion(userId, tryoutId, playerId, suggestionId, suggestPosition) {
    let suggestions = JSON.parse(localStorage.getItem('suggestions_' + tryoutId + '_' + userId));
    if (!suggestions) suggestions = [];

    let suggestion = suggestions.find(item => item.id === suggestionId);
    let isCreate = false;
    if (!suggestion) {
      isCreate = true;
      suggestion = {
        id: PlayersProvider.getRandomId(),
        playerId: playerId,
        suggest: suggestPosition
      }
    }
    else {
      suggestion.suggest = suggestPosition;
    }

    if (isCreate) {
      suggestions.push(suggestion);
    }

    localStorage.setItem('suggestions_' + tryoutId + '_' + userId, JSON.stringify(suggestions));

    return of({status: 'success'});
  }

  public removeSuggestion(userId, tryoutId, playerId) {
    let suggestions = JSON.parse(localStorage.getItem('suggestions_' + tryoutId + '_' + userId));
    if (!suggestions) {
      return of({status: 'success'});
    }

    let index = suggestions.findIndex(item => item.playerId === playerId);
    if (index !== -1) {
      suggestions.splice(index, 1);
    }
    localStorage.setItem('suggestions_' + tryoutId + '_' + userId, JSON.stringify(suggestions));

    return of({status: 'success'});
  }

}
