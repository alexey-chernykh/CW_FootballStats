import { Component, OnInit } from '@angular/core';
import { SharedService } from "src/app/shared.service";

@Component({
  selector: 'app-show-tr',
  templateUrl: './show-tr.component.html',
  styleUrls: ['./show-tr.component.css']
})
export class ShowTrComponent implements OnInit {
  trenerList:any = [];
  modalTitle:any;
  activateAddEditTrCom:boolean = false;
  trener:any;

  constructor(private sharedService: SharedService) { }

  ngOnInit(): void {
    this.refreshTrenerList();
  }

  refreshTrenerList() {
    this.sharedService.getTrenerList().subscribe(data =>{
      this.trenerList = data;
    });
  }

  AddTrener(){
    this.trener={
      Id:0,
      FirstName:"",
      LastName:""
    }
    this.modalTitle = "Add Trener";
    this.activateAddEditTrCom = true;
  }

  EditTrener(item: any){
    this.trener = item;
    this.activateAddEditTrCom = true;
    this.modalTitle = "Update Trener";
  }

  deleteClick(item: any){
    if(confirm('Are you sure??')){
      this.sharedService.deleteTrener(item.Id).subscribe(data =>{
        alert(data.toString());
        this.refreshTrenerList();
      })
    }
  }

  closeClick(){
    this.activateAddEditTrCom=false;
    this.refreshTrenerList();
  }



}
