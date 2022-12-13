import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from "src/app/shared.service";
import {compare, getDateToString, normalize} from "../../functions/dtf";

@Component({
  selector: 'app-add-edit-td',
  templateUrl: './add-edit-td.component.html',
  styleUrls: ['./add-edit-td.component.css']
})
export class AddEditTdComponent implements OnInit {
  currDate=new Date();
  @Input() upcoming:any;
  Id:string = "";
  MatchId: string ="";
  PlayDate: string ="";
  PlayTime: string ="";
  matchList:any = [];
  teamList:any=[];
  upcomingList:any=[];
  isRefreshed:any;
  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.Id = this.upcoming.Id;
    this.MatchId = this.upcoming.MatchId;
    this.PlayDate = this.upcoming.PlayDate;
    this.PlayTime = this.upcoming.PlayTime;
    this.refreshMatchList();
    this.refreshTeamList();
    this.refreshUpcomingList();
  }
  refreshMatchList() {
    this.service.getMatchList().subscribe(data =>{
      this.matchList = data;
    });
  }
  refreshTeamList() {
    this.service.getTeamList().subscribe(data =>{
      this.teamList = data;
    });
  }
  refreshUpcomingList() {
    this.service.getKalendarList().subscribe(data =>{
      this.upcomingList = [];
      for (let dataItem of data){
        console.log(dataItem.PlayDate.split('T')[0]);
        console.log(getDateToString(this.currDate));
        if (compare(dataItem.PlayDate.split('T')[0], getDateToString(this.currDate)) != "equal"){
          this.upcomingList.push({
            Id: dataItem.Id,
            MatchId: dataItem.MatchId,
            PlayDate: dataItem.PlayDate
          });
        }
      }
    });
  }
  addUpcoming(){

    var val = {
      Id: this.Id,
      MatchId : this.MatchId,
      PlayDate : [this.PlayDate, this.PlayTime+":00"].join('T')
    };
      this.service.addKalendar(val).subscribe(res =>{
        alert(res.toString());
      })
  }

  updateUpcoming(){
    var val = {
      Id: this.Id,
      MatchId : this.MatchId,
      PlayDate : [this.PlayDate, this.PlayTime+":00"].join('T')
    };
      this.service.updateKalendar(val).subscribe(res =>{
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
      this.refreshMatch();
    }this.isRefreshed = true;
  }
  kindOfMatch(match: any):any {
    for (let up of this.upcomingList){
      if (match.Id == up.MatchId && this.getTeamName(match.TeamWinId) == "TBD"){
        return "todays";
      }
    }
  }
  private refreshMatch() {
    const select = document.getElementById('selectMatch');
    if (select != null)
      select.innerHTML = "";
    for (let match of this.matchList){
      if (this.kindOfMatch(match) == "todays"){
        let block = document.createElement('option');
        block.textContent = this.getMatchName(match.Id);
        block.setAttribute("value", match.Id);
        if (match.Id == this.MatchId){
          block.setAttribute("selected", "")
        }
        if (select != null){
          select.appendChild(block);
        }
      }

    }console.log(select);
  }
  getMatchName(matchId:any):any{
    for (let match of this.matchList){
      if (match.Id == matchId)
        return [normalize(this.getMatchPlayDate(matchId)),[this.getTeamName(match.Team1Id), this.getTeamName(match.Team2Id)].join(' vs ')].join(' - ');
    }
  }

  private getMatchPlayDate(matchId:any):any {
    for (let up of this.upcomingList){
      if (up.MatchId == matchId)
        return up.PlayDate;
    }
  }
  private getTeamName(teamId:any):any {
    for (let team of this.teamList){
      if (team.Id == teamId)
        return team.TeamName;
    }
  }
}
