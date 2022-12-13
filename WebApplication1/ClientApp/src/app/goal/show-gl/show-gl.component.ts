import { Component, OnInit } from '@angular/core';
import { SharedService } from "src/app/shared.service";

@Component({
  selector: 'app-show-gl',
  templateUrl: './show-gl.component.html',
  styleUrls: ['./show-gl.component.css']
})
export class ShowGlComponent implements OnInit {
  matchList:any = [];
  goalList:any = [];
  playerList:any = [];
  modalTitle:any;
  activateAddEditGlCom:boolean = false;
  goal:any;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.refreshMatchList()
    this.refreshPlayerList();
    this.refreshGoalList();
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
  refreshGoalList() {
    this.sharedService.getGoalList().subscribe(data =>{
      this.goalList = data;
    });
  }

  AddGoal(){
    this.goal={
      Id:0,
      MatchId:0,
      PlayerId:0,
      GoalMinute:0
    }
    this.modalTitle = "Add Goal";
    this.activateAddEditGlCom = true;
  }

  EditGoal(item: any){
    this.goal = item;
    this.activateAddEditGlCom = true;
    this.modalTitle = "Update Goal";
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
      this.sharedService.deleteGoal(item.Id).subscribe(data =>{
        alert(data.toString());
        this.refreshGoalList();
      })
    }
  }

  closeClick(){
    this.activateAddEditGlCom=false;
    this.refreshGoalList();
  }

  getPlayerFullName(playerId:any):any{
    for (let player of this.playerList){
      if (player.Id == playerId)
        return [player.FirstName, player.LastName].join(' ');
    }
  }
}
