import { Component, OnInit } from '@angular/core';
import { SharedService } from "src/app/shared.service";

@Component({
  selector: 'app-show-cd',
  templateUrl: './show-cd.component.html',
  styleUrls: ['./show-cd.component.css']
})
export class ShowCdComponent implements OnInit {
  matchList:any = [];
  cardList:any = [];
  playerList:any = [];
  modalTitle:any;
  activateAddEditCdCom:boolean = false;
  card:any;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.refreshMatchList()
    this.refreshPlayerList();
    this.refreshCardList();
  }

  refreshMatchList() {
    this.sharedService.getMatchList().subscribe(data =>{
      this.matchList = data;
    });
  }
  refreshPlayerList() {
    this.sharedService.getPlayerList().subscribe(data =>{
      this.playerList = data;
    });
  }
  refreshCardList() {
    this.sharedService.getCardList().subscribe(data =>{
      this.cardList = data;
    });
  }

  AddCard(){
    this.card={
      Id:0,
      MatchId:0,
      PlayerId:0,
      CardName:""
    }
    this.modalTitle = "Add Card";
    this.activateAddEditCdCom = true;
  }

  EditCard(item: any){
    this.card = item;
    this.activateAddEditCdCom = true;
    this.modalTitle = "Update Card";
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
      this.sharedService.deleteCard(item.Id).subscribe(data =>{
        alert(data.toString());
        this.refreshCardList();
      })
    }
  }

  closeClick(){
    this.activateAddEditCdCom=false;
    this.refreshCardList();
  }
  getPlayerFullName(playerId:any):any{
    for (let player of this.playerList){
      if (player.Id == playerId)
        return [player.FirstName, player.LastName].join(' ');
    }
  }
/*

  getTeamName(teamId:any):any{
    for (let team of this.teamList){
      if (team.Id == teamId)
        return team.TeamName;
    }
  }

  private getPlayerPhoto(playerId: any):any {
    for (let player of this.playerList){
      if (player.Id == playerId)
        return player.Photo;
    }
  }
 */
}
