import { Component, OnInit } from '@angular/core';
import { SharedService } from "src/app/shared.service";

@Component({
  selector: 'app-show-pl',
  templateUrl: './show-pl.component.html',
  styleUrls: ['./show-pl.component.css']
})
export class ShowPlComponent implements OnInit {
  playerList:any = [];
  teamList:any=[];
  modalTitle:any;
  activateAddEditPlCom:boolean = false;
  player:any;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.refreshPlayerList();
    this.refreshTeamList();
  }

  refreshPlayerList() {
    this.sharedService.getPlayerList().subscribe(data =>{
      this.playerList = data;
    });
  }
  refreshTeamList() {
    this.sharedService.getTeamList().subscribe(data =>{
      this.teamList = data;
    });
  }

  AddPlayer(){
    this.player={
      Id:0,
      FirstName:"",
      LastName:"",
      Photo:"",
      TeamId:0
    }
    this.modalTitle = "Add Player";
    this.activateAddEditPlCom = true;

  }

  EditPlayer(item: any){
    this.player = item;
    this.activateAddEditPlCom = true;
    this.modalTitle = "Update Player";
  }

  deleteClick(item: any){
    if(confirm('Are you sure??')){
      this.sharedService.deletePlayer(item.Id).subscribe(data =>{
        alert(data.toString());
        this.refreshPlayerList();
      })
    }
  }

  closeClick(){
    this.activateAddEditPlCom=false;
    this.refreshPlayerList();
  }

  getTeamName(teamId:any):any{
    for (let team of this.teamList){
      if (team.Id == teamId){
        return team.TeamName;
      }
    }
  }


}
