import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from "src/app/shared.service";

@Component({
  selector: 'app-add-edit-mt',
  templateUrl: './add-edit-mt.component.html',
  styleUrls: ['./add-edit-mt.component.css']
})
export class AddEditMtComponent implements OnInit {

  @Input() match:any;
  Id:string = "";
  Team1Id: string ="";
  Team2Id: string ="";
  TeamWinId: string ="";
  Team1Score: string ="";
  Team2Score: string ="";
  TeamHomeId: string ="";
  teamList:any = [];
  isRefreshed:any;
  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.Id = this.match.Id;
    this.Team1Id = this.match.Team1Id;
    this.Team2Id = this.match.Team2Id;
    this.TeamWinId = this.match.TeamWinId;
    this.Team1Score = this.match.Team1Score;
    this.Team2Score = this.match.Team2Score;
    this.TeamHomeId = this.match.TeamHomeId;
    this.refreshTeamList();
  }
  refreshTeamList() {
    this.service.getTeamList().subscribe(data =>{
      this.teamList = data;
    });
  }
  addMatch(){
    var val = {
      Id: this.Id,
      Team1Id : this.Team1Id,
      Team2Id : this.Team2Id,
      TeamWinId: this.TeamWinId,
      Team1Score : this.Team1Score,
      Team2Score : this.Team2Score,
      TeamHomeId : this.TeamHomeId,
    };
      this.service.addMatch(val).subscribe(res =>{
        alert(res.toString());
      })
  }

  updateMatch(){
    var val = {
      Id: this.Id,
      Team1Id : this.Team1Id,
      Team2Id : this.Team2Id,
      TeamWinId: this.TeamWinId,
      Team1Score : this.Team1Score,
      Team2Score : this.Team2Score,
      TeamHomeId : this.TeamHomeId,
    };
      this.service.updateMatch(val).subscribe(res =>{
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
  refreshTeamSelect(){
    if (!this.isRefreshed){
      this.refreshTeam1();
      this.refreshTeam2();
      this.refreshTeamWin();
      this.refreshTeamHome();
    }this.isRefreshed = true;
  }

  private refreshTeam1() {
    const select = document.getElementById('selectTeam1');
    if (select != null)
      select.innerHTML = "";
    for (let team of this.teamList){
      let block = document.createElement('option');
      block.textContent = this.getTeamName(team.Id);
      block.setAttribute("value", team.Id);
      if (team.Id == this.Team1Id){
        block.setAttribute("selected", "")
      }
      if (select != null){
        select.appendChild(block);
      }
    }console.log(select);
  }

  private refreshTeam2() {
    const select = document.getElementById('selectTeam2');
    if (select != null)
      select.innerHTML = "";
    for (let team of this.teamList){
      let block = document.createElement('option');
      block.textContent = this.getTeamName(team.Id);
      block.setAttribute("value", team.Id);
      if (team.Id == this.Team2Id){
        block.setAttribute("selected", "")
      }
      if (select != null){
        select.appendChild(block);
      }
    }console.log(select);
  }

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
      else console.log(team.Id);
    }

  }
}
