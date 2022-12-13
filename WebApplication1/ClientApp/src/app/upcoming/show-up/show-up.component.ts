import { Component, OnInit } from '@angular/core';
import { SharedService } from "src/app/shared.service";
import { getDateToString, compare, normalize } from "src/app/functions/dtf";

@Component({
  selector: 'app-show-up',
  templateUrl: './show-up.component.html',
  styleUrls: ['./show-up.component.css']
})
export class ShowUpComponent implements OnInit {
  currDate=new Date();
  upcomingList:any = [];
  matchList:any = [];
  teamList:any=[];
  modalTitle:any;
  activateAddEditUpCom:boolean = false;
  upcoming:any;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.refreshUpcomingList();
    this.refreshMatchList()
    this.refreshTeamList();
  }

  refreshMatchList() {
    this.sharedService.getMatchList().subscribe(data =>{
      this.matchList = data;
    });
  }
  refreshUpcomingList() {
    this.sharedService.getKalendarList().subscribe(data =>{
      this.upcomingList = [];
      for (let dataItem of data){
        console.log(dataItem.PlayDate.split('T')[0]);
        console.log(getDateToString(this.currDate));
        if (compare(dataItem.PlayDate.split('T')[0], getDateToString(this.currDate)) != "equal"
          && compare(dataItem.PlayDate.split('T')[0], getDateToString(this.currDate)) != getDateToString(this.currDate)){
          this.upcomingList.push({
            Id: dataItem.Id,
            MatchId: dataItem.MatchId,
            PlayDate: dataItem.PlayDate
          });
        }
      }
    });
  }
  refreshTeamList() {
    this.sharedService.getTeamList().subscribe(data =>{
      this.teamList = data;
    });
  }

  AddUpcoming(){
    this.upcoming={
      Id:0,
      MatchId:0,
      PlayDate:""
    }
    this.modalTitle = "Add Upcoming Match";
    this.activateAddEditUpCom = true;
  }

  EditUpcoming(item: any){
    this.upcoming = item;
    this.activateAddEditUpCom = true;
    this.modalTitle = "Update Upcoming Match";
  }

  MatchDetails(item: any){

    this.upcoming = item;
    this.modalTitle = [normalize(item.PlayDate), this.getMatchName(item.MatchId)].join(' - ');
    const box = document.getElementById('box');
    if (box != null)
      box.innerHTML = "";
    for (let match of this.matchList){
      if (match.Id == item.MatchId){
        let block = document.createElement('div');
        block.style.display = "block";
        block.style.marginLeft = "135px";
        block.style.marginTop = "20px";
        block.style.textAlign = "center";
        let photo1 = document.createElement('img');
        photo1.style.display = "inline-block";
        photo1.style.width = "100px";
        photo1.style.height = "70px";
        let score = document.createElement('div');
        score.style.display = "inline-block";
        score.style.textAlign = "center";
        score.style.fontSize = "12pt";
        let photo2 = document.createElement('img');
        photo2.style.display = "inline-block";
        photo2.style.width = "100px";
        photo2.style.height = "70px";
        let winner = document.createElement('div');
        winner.style.textAlign = "center";
        winner.style.marginTop = "30px";
        winner.style.fontSize = "12pt";
        let teamhone = document.createElement('div');
        teamhone.style.textAlign = "center";
        teamhone.style.fontSize = "12pt";
        score.textContent = this.getMatchScore(match.Id);
        winner.textContent = ["Winner",this.getTeamName(match.TeamWinId)].join(': ');
        photo1.src = this.getTeamHerb(match.Team1Id);
        photo2.src = this.getTeamHerb(match.Team2Id);
        teamhone.textContent = ["Game at ",this.getTeamHomeStadion(match.TeamHomeId)].join('');
        if (box != null){
          box.appendChild(block);
          block.appendChild(photo1);
          block.appendChild(score);
          block.appendChild(photo2);
          block.appendChild(winner);
          block.appendChild(teamhone);
        }

      }
    }
  }
  getMatchScore(matchId:any):any{
    for (let match of this.matchList){
      if (match.Id == matchId){
        return [match.Team1Score, match.Team2Score].join(':')
      }
    }

  }
  normalize(date:string):string{
    return [date.split('T')[0], date.split('T')[1]].join(' ');
  }
/*
  WatchGoals(item: any){

    this.match = item;
    this.modalTitle = this.getTeamName(this.match.Team1Id) + " vs " + this.getTeamName(this.match.Team2Id) + ": Goals";
    const box = document.getElementById('box');
    if (box != null)
      box.innerHTML = "";
    for (let goal of this.goalList){
      if (goal.MatchId == item.Id){
        let block = document.createElement('div');
        block.style.display = "inline-block";
        block.style.margin = "49px";
        let name = document.createElement('div');
        name.style.textAlign = "center";
        name.style.fontSize = "12pt";
        let min = document.createElement('div');
        min.style.textAlign = "center";
        min.style.fontSize = "12pt";
        let photo = document.createElement('img');
        photo.style.width = "150px";
        name.textContent = this.getPlayerFullName(goal.PlayerId);
        min.textContent = ["Reached Goal at",goal.GoalMinute,"min"].join(' ');
        photo.src = this.getPlayerPhoto(goal.PlayerId);
        if (box != null){
          box.appendChild(block);
          block.appendChild(name);
          block.appendChild(min);
          block.appendChild(photo);
        }

      }
    }
  }

  WatchCards(item: any){

    this.match = item;
    this.modalTitle = this.getTeamName(this.match.Team1Id) + " vs " + this.getTeamName(this.match.Team2Id) + ": Cards";
    const box = document.getElementById('box');
    if (box != null)
      box.innerHTML = "";
    for (let card of this.cardList){
      if (card.MatchId == item.Id){
        let block = document.createElement('div');
        block.style.display = "inline-block";
        block.style.margin = "49px";
        let name = document.createElement('div');
        name.style.textAlign = "center";
        name.style.fontSize = "12pt";
        let cn = document.createElement('div');
        cn.style.textAlign = "center";
        cn.style.fontSize = "12pt";
        let photo = document.createElement('img');
        photo.style.width = "150px";
        name.textContent = this.getPlayerFullName(card.PlayerId);
        cn.innerHTML = ["Got<span style='color: "+card.CardName+"'>",card.CardName,"</span>card"].join(' ');
        photo.src = this.getPlayerPhoto(card.PlayerId);
        if (box != null){
          box.appendChild(block);
          block.appendChild(name);
          block.appendChild(cn);
          block.appendChild(photo);
        }

      }
    }
  }

 */
  deleteClick(item: any){
    if(confirm('Are you sure??')){
      this.sharedService.deleteKalendar(item.Id).subscribe(data =>{
        alert(data.toString());
        this.refreshUpcomingList();
      })
    }
  }

  closeClick(){
    this.activateAddEditUpCom=false;
    this.refreshUpcomingList();
  }
/*
  getPlayerFullName(playerId:any):any{
    for (let player of this.playerList){
      if (player.Id == playerId)
        return [player.FirstName, player.LastName].join(' ');
    }
  }

 */

  getMatchName(matchId:any):any{
    for (let match of this.matchList){
      if (match.Id == matchId)
        return [this.getTeamName(match.Team1Id), this.getTeamName(match.Team2Id)].join(' vs ');
    }
  }

  getTeamName(teamId:any):any{
    for (let team of this.teamList){
      if (team.Id == teamId)
        return team.TeamName;
      else if(teamId == undefined){
        return "TBD"
      }
    }
  }
  getTeamHerb(teamId:any):any{
    for (let team of this.teamList){
      if (team.Id == teamId)
        return team.Herb;
      else if(teamId == undefined){
        return "assets/images/team/tbd-logo.png"
      }
    }
  }
  getTeamHomeStadion(teamId:any):any{
    for (let team of this.teamList){
      if (team.Id == teamId)
        return team.HomeStadion;
      else if(teamId == undefined){
        return "TBD"
      }
    }
  }
/*
  private getPlayerPhoto(playerId: any):any {
    for (let player of this.playerList){
      if (player.Id == playerId)
        return player.Photo;
    }
  }

 */
}
