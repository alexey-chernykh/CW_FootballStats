import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from "src/app/shared.service";

@Component({
  selector: 'app-add-edit-cd',
  templateUrl: './add-edit-cd.component.html',
  styleUrls: ['./add-edit-cd.component.css']
})
export class AddEditCdComponent implements OnInit {

  @Input() card:any;
  Id:string = "";
  MatchId: string ="";
  PlayerId: string ="";
  CardName: string ="";
  cardList:any = [];
  cards:any = ["yellow", "red"];
  playerList:any = [];
  isRefreshed:any;
  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.Id = this.card.Id;
    this.MatchId = this.card.MatchId;
    this.PlayerId = this.card.PlayerId;
    this.CardName = this.card.CardName;
    this.refreshCardList();
    this.refreshPlayerList();
  }
  refreshCardList() {
    this.service.getCardList().subscribe(data =>{
      this.cardList = data;
    });
  }
  refreshPlayerList() {
    this.service.getPlayerList().subscribe(data =>{
      this.playerList = data;
    });
  }
  addCard(){
    var val = {
      Id: this.Id,
      MatchId : this.MatchId,
      PlayerId : this.PlayerId,
      CardName: this.CardName
    };
      this.service.addCard(val).subscribe(res =>{
        alert(res.toString());
      })
  }

  updateCard(){
    var val = {
      Id: this.Id,
      MatchId : this.MatchId,
      PlayerId : this.PlayerId,
      CardName: this.CardName
    };
      this.service.updateCard(val).subscribe(res =>{
        alert(res.toString());
      })
  }
  /*
  selectFile(event:any){
    if (event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.Herb = event.target.name;
      reader.onload = (event:any)=>{
        this.Herb = event.target.result;
        console.log(this.Herb);
      }
    }
  }
  */
  refreshSelect(){
    if (!this.isRefreshed){
      this.refreshPlayer();
      this.refreshCard();
    }this.isRefreshed = true;
  }

  private refreshPlayer() {
    const select = document.getElementById('selectPlayer');
    if (select != null)
      select.innerHTML = "";
    for (let player of this.playerList){
      let block = document.createElement('option');
      block.textContent = this.getPlayerFullName(player.Id);
      block.setAttribute("value", player.Id);
      if (player.Id == this.PlayerId){
        block.setAttribute("selected", "")
      }
      if (select != null){
        select.appendChild(block);
      }
    }console.log(select);
  }

  private refreshCard() {
    const select = document.getElementById('selectCard');
    if (select != null)
      select.innerHTML = "";
    for (let card of this.cards){
      let block = document.createElement('option');
      block.textContent = card;
      block.setAttribute("value", card);
      if (card == this.CardName){
        block.setAttribute("selected", "")
      }
      if (select != null){
        select.appendChild(block);
      }
    }console.log(select);
  }
  getPlayerFullName(playerId:any):any{
    for (let player of this.playerList){
      if (player.Id == playerId)
        return [player.FirstName, player.LastName].join(' ');
    }
  }
/*
  private refreshTeamWin() {
    const select = document.getElementById('selectTeamWin');
    if (select != null)
      select.innerHTML = "";
    for (let team of this.teamList){
      let block = document.createElement('option');
      block.textContent = this.getTeamName(team.Id);
      block.setAttribute("value", team.Id);
      if (team.Id == this.TeamWinId){
        block.setAttribute("selected", "")
      }
      if (select != null){
        select.appendChild(block);
      }
    }console.log(select);
  }

  private refreshTeamHome() {
    const select = document.getElementById('selectTeamHome');
    if (select != null)
      select.innerHTML = "";
    for (let team of this.teamList){
      let block = document.createElement('option');
      block.textContent = this.getTeamName(team.Id);
      block.setAttribute("value", team.Id);
      if (team.Id == this.TeamHomeId){
        block.setAttribute("selected", "")
      }
      if (select != null){
        select.appendChild(block);
      }
    }console.log(select);
  }

  private getTeamName(teamId:any):any {
    for (let team of this.teamList){
      if (team.Id == teamId)
        return team.TeamName;
    }

  }*/
}
