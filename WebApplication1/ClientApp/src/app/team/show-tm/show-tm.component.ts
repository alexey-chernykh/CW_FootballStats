import { Component, OnInit } from '@angular/core';
import { SharedService } from "src/app/shared.service";

@Component({
  selector: 'app-show-tm',
  templateUrl: './show-tm.component.html',
  styleUrls: ['./show-tm.component.css']
})
export class ShowTmComponent implements OnInit {
  teamList:any = [];
  trenerList:any = [];
  playerList:any = [];
  modalTitle:any;
  activateAddEditTmCom:boolean = false;
  team:any;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.refreshTeamList();
    this.refreshTrenerList();
    this.refreshPlayerList();
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
  refreshTrenerList(){
    this.sharedService.getTrenerList().subscribe(data =>{
      this.trenerList = data;
    });
  }

  AddTeam(){
    this.team={
      Id:0,
      TeamName:"",
      Herb:"",
      City:"",
      HomeStadion:"",
      TrenerId:0,

    }
    this.modalTitle = "Add Team";
    this.activateAddEditTmCom = true;
  }

  EditTeam(item: any){
    this.team = item;
    this.activateAddEditTmCom = true;
    this.modalTitle = "Update Team";
  }

  WatchRoster(item: any){
    this.refreshPlayerList();
    this.team = item;
    this.modalTitle = this.team.TeamName + " Roster";
    const box = document.getElementById('box');
    if (box != null)
      box.innerHTML = "";
    for (let player of this.playerList){
      if (player.TeamId == item.Id){
        let block = document.createElement('div');
        block.style.display = "inline-block";
        let name = document.createElement('div');
        name.style.textAlign = "center";
        name.style.fontSize = "12pt";
        let photo = document.createElement('img');
        photo.style.width = "150px";
        name.textContent = this.getPlayerFullName(player.Id);
        photo.src = player.Photo;
        if (box != null){
          box.appendChild(block);
          block.appendChild(name);
          block.appendChild(photo);
        }

      }
    }
  }

  deleteClick(item: any){
    if(confirm('Are you sure??')){
      this.sharedService.deleteTeam(item.Id).subscribe(data =>{
        alert(data.toString());
        this.refreshTeamList();
      })
    }
  }

  closeClick(){
    this.activateAddEditTmCom=false;
    this.refreshTeamList();
  }

  getTrenerFullName(trenerId:any):any{
    for (let trener of this.trenerList){
      if (trener.Id == trenerId)
        return [trener.FirstName, trener.LastName].join(' ');
    }
  }

  getPlayerFullName(playerId:any):any{
    for (let player of this.playerList){
      if (player.Id == playerId)
        return [player.FirstName, player.LastName].join(' ');
    }
  }

}
