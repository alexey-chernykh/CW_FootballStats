import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from "src/app/shared.service";

@Component({
  selector: 'app-add-edit-gl',
  templateUrl: './add-edit-gl.component.html',
  styleUrls: ['./add-edit-gl.component.css']
})
export class AddEditGlComponent implements OnInit {

  @Input() goal:any;
  Id:string = "";
  MatchId: string ="";
  PlayerId: string ="";
  GoalMinute: string ="";
  goalList:any = [];
  playerList:any = [];
  isRefreshed:any;
  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.Id = this.goal.Id;
    this.MatchId = this.goal.MatchId;
    this.PlayerId = this.goal.PlayerId;
    this.GoalMinute = this.goal.GoalMinute;
    this.refreshGoalList();
    this.refreshPlayerList();
  }
  refreshGoalList() {
    this.service.getGoalList().subscribe(data =>{
      this.goalList = data;
    });
  }
  refreshPlayerList() {
    this.service.getPlayerList().subscribe(data =>{
      this.playerList = data;
    });
  }
  addGoal(){
    var val = {
      Id: this.Id,
      MatchId : this.MatchId,
      PlayerId : this.PlayerId,
      GoalMinute: this.GoalMinute
    };
      this.service.addGoal(val).subscribe(res =>{
        alert(res.toString());
      })
  }

  updateGoal(){
    var val = {
      Id: this.Id,
      MatchId : this.MatchId,
      PlayerId : this.PlayerId,
      GoalMinute: this.GoalMinute
    };
      this.service.updateGoal(val).subscribe(res =>{
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

  getPlayerFullName(playerId:any):any{
    for (let player of this.playerList){
      if (player.Id == playerId)
        return [player.FirstName, player.LastName].join(' ');
    }
  }
}
