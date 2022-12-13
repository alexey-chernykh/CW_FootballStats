import { Component, OnInit, Input } from '@angular/core';
import { SharedService } from "src/app/shared.service";

@Component({
  selector: 'app-add-edit-tr',
  templateUrl: './add-edit-tr.component.html',
  styleUrls: ['./add-edit-tr.component.css']
})
export class AddEditTrComponent implements OnInit {

  @Input() trener:any;
  Id:string = "";
  FirstName: string ="";
  LastName: string ="";

  constructor(private service: SharedService) { }

  ngOnInit(): void {
    this.Id = this.trener.Id;
    this.FirstName = this.trener.FirstName;
    this.LastName = this.trener.LastName;
  }

  addTrener(){
    var val = {Id:this.Id,
      FirstName:this.FirstName,
      LastName:this.LastName};
      this.service.addTrener(val).subscribe(res =>{
        alert(res.toString());
      })
  }

  updateTrener(){
    var val = {Id:this.Id,
      FirstName:this.FirstName,
      LastName:this.LastName};
      this.service.updateTrener(val).subscribe(res =>{
        alert(res.toString());
      })
  }



}
