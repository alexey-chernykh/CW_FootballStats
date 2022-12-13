import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from "src/app/shared.service";

@Component({
  selector: 'app-add-edit-tm',
  templateUrl: './add-edit-tm.component.html',
  styleUrls: ['./add-edit-tm.component.css']
})
export class AddEditTmComponent implements OnInit {

  @Input() team:any;
  Id:string = "";
  TeamName: string ="";
  Herb: string ="";
  City: string ="";
  HomeStadion: string ="";
  TrenerId: string ="";
  trenerList:any = [];
  isRefreshed:any;
  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.Id = this.team.Id;
    this.TeamName = this.team.TeamName;
    this.Herb = this.team.Herb;
    this.City = this.team.City;
    this.HomeStadion = this.team.HomeStadion;
    this.TrenerId = this.team.TrenerId;
    this.refreshTrenerList();
  }
  refreshTrenerList() {
    this.service.getTrenerList().subscribe(data =>{
      this.trenerList = data;
    });
  }
  addTeam(){
    var val = {
      Id: this.Id,
      TeamName : this.TeamName,
      Herb : this.Herb,
      City: this.City,
      HomeStadion : this.HomeStadion,
      TrenerId : this.TrenerId
    };
      this.service.addTeam(val).subscribe(res =>{
        alert(res.toString());
      })
  }

  updateTeam(){
    var val = {
      Id: this.Id,
      TeamName : this.TeamName,
      Herb : this.Herb,
      City: this.City,
      HomeStadion : this.HomeStadion,
      TrenerId : this.TrenerId
    };
      this.service.updateTeam(val).subscribe(res =>{
        alert(res.toString());
      })
  }

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
  refreshTrenerSelect(){
    if (!this.isRefreshed){
      const select = document.getElementById('selectTrener');
      if (select != null)
        select.innerHTML = "";
      for (let trener of this.trenerList){
        let block = document.createElement('option');
        block.textContent = this.getTrenerFullName(trener.Id);
        block.setAttribute("value", trener.Id);
        if (trener.Id == this.TrenerId){
          block.setAttribute("selected", "")
        }
        if (select != null){
          select.appendChild(block);
        }
      }console.log(select);
    }this.isRefreshed = true;
  }

  private getTrenerFullName(Id:any):any {
    for (let trener of this.trenerList){
      if (trener.Id == Id){
        return [trener.FirstName, trener.LastName].join(' ');
      }
    }
  }
}
