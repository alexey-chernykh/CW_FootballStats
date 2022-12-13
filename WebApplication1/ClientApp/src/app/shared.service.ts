import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl = "http://localhost:5000/api";

  constructor(private http: HttpClient) {
  }

  //Trener//

  getTrenerList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Trener');
  }

  addTrener(val: any) {
    return this.http.post(this.APIUrl + '/Trener', val);
  }

  updateTrener(val: any) {
    return this.http.put(this.APIUrl + '/Trener', val);
  }

  deleteTrener(id: any) {
    return this.http.delete(this.APIUrl + '/Trener/' + id);
  }

  //////////

  //Team//

  getTeamList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Team');
  }

  addTeam(val: any) {
    return this.http.post(this.APIUrl + '/Team', val);
  }

  updateTeam(val: any) {
    return this.http.put(this.APIUrl + '/Team', val);
  }

  deleteTeam(id: any) {
    return this.http.delete(this.APIUrl + '/Team/' + id);
  }

  //////////

  //Player//

  getPlayerList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Player');
  }

  addPlayer(val: any) {
    return this.http.post(this.APIUrl + '/Player', val);
  }

  updatePlayer(val: any) {
    return this.http.put(this.APIUrl + '/Player', val);
  }

  deletePlayer(id: any) {
    return this.http.delete(this.APIUrl + '/Player/' + id);
  }

  //////////

  //Match//

  getMatchList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Match');
  }

  addMatch(val: any) {
    return this.http.post(this.APIUrl + '/Match', val);
  }

  updateMatch(val: any) {
    return this.http.put(this.APIUrl + '/Match', val);
  }

  deleteMatch(id: any) {
    return this.http.delete(this.APIUrl + '/Match/' + id);
  }

  //////////

  //Goal//

  getGoalList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Goal');
  }

  addGoal(val: any) {
    return this.http.post(this.APIUrl + '/Goal', val);
  }

  updateGoal(val: any) {
    return this.http.put(this.APIUrl + '/Goal', val);
  }

  deleteGoal(id: any) {
    return this.http.delete(this.APIUrl + '/Goal/' + id);
  }

  //////////

  //Card//

  getCardList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Card');
  }

  addCard(val: any) {
    return this.http.post(this.APIUrl + '/Card', val);
  }

  updateCard(val: any) {
    return this.http.put(this.APIUrl + '/Card', val);
  }

  deleteCard(id: any) {
    return this.http.delete(this.APIUrl + '/Card/' + id);
  }

  //////////

  //Kalendar//

  getKalendarList(): Observable<any[]> {
    return this.http.get<any>(this.APIUrl + '/Kalendar');
  }

  addKalendar(val: any) {
    return this.http.post(this.APIUrl + '/Kalendar', val);
  }

  updateKalendar(val: any) {
    return this.http.put(this.APIUrl + '/Kalendar', val);
  }

  deleteKalendar(id: any) {
    return this.http.delete(this.APIUrl + '/Kalendar/' + id);
  }

  //////////
}
