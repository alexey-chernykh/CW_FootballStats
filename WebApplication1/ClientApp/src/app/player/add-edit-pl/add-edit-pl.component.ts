import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from "src/app/shared.service";

@Component({
  selector: 'app-add-edit-pl',
  templateUrl: './add-edit-pl.component.html',
  styleUrls: ['./add-edit-pl.component.css']
})
export class AddEditPlComponent implements OnInit {

  @Input() player:any;
  Id:string = "";
  FirstName: string ="";
  LastName: string ="";
  Photo: string ="";
  TeamId: string ="";
  teamList:any=[];
  isRefreshed:any;

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.Id = this.player.Id;
    this.FirstName = this.player.FirstName;
    this.LastName = this.player.LastName;
    this.Photo = this.player.Photo;
    this.TeamId = this.player.TeamId;
    this.refreshTeamList();
  }
  refreshTeamList() {
    this.service.getTeamList().subscribe(data =>{
      this.teamList = data;
    });
  }
  addPlayer(){
    var val = {
      Id:this.Id,
      FirstName:this.FirstName,
      LastName:this.LastName,
      Photo:this.Photo,
      TeamId:this.TeamId
    };
      this.service.addPlayer(val).subscribe(res =>{
        alert(res.toString());
      })
  }

  updatePlayer(){
    var val = {
      Id:this.Id,
      FirstName:this.FirstName,
      LastName:this.LastName,
      Photo:this.Photo,
      TeamId:this.TeamId
    };
      this.service.updatePlayer(val).subscribe(res =>{
        alert(res.toString());
      })
  }

  selectFile(event:any){
    if (event.target.files){
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      this.Photo = event.target.name;
      reader.onload = (event:any)=>{
        this.Photo = event.target.result;
        console.log(this.Photo);
      }
    }
  }

  refreshTeamSelect(){
    if (!this.isRefreshed){
      const select = document.getElementById('selectTeam');
      if (select != null)
        select.innerHTML = "";
      for (let team of this.teamList){
        let block = document.createElement('option');
        block.textContent = team.TeamName;
        block.setAttribute("value", team.Id);
        if (team.Id == this.TeamId){
          block.setAttribute("selected", "")
        }
        if (select != null){
          select.appendChild(block);
        }
      }console.log(select);
    }this.isRefreshed = true;
  }

}
