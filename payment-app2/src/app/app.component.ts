import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

import { Userdata } from 'src/models/userdata';
import { DatabaseService } from './services/database.service';
import { DeleteComponent } from './delete/delete.component';
import { PutComponent } from './put/put.component';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'payment-app';

  database: Userdata[] = []
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  toastText: string = ""
  isToastShowing: boolean = true

  
  tempNumber = 0

  constructor(  
    public databaseService : DatabaseService,
    private modalService: NgbModal,
  ) {  }
    

  ngOnInit(): void {
    this.dtOptions={
      pagingType: 'full_numbers'
    }
    this.databaseService.getAll()
    .subscribe(res =>{
      this.database = res
      this.dtTrigger.next()
    }) 
  }

  getUser(){
    this.databaseService.getData().subscribe((res:any)=>{
      if(res){
        this.database = res
      }
    })
  }

  getIdDelete(event:number){
    const modalRef = this.modalService.open(DeleteComponent)
    modalRef.componentInstance.id = event
  }

  getIdEdit(event: number){
    const modalRef = this.modalService.open(PutComponent)
    modalRef.componentInstance.id = event
  }

  showToast(text: string) {
    this.toastText = text
    this.isToastShowing = true
  }

  onToastHidden() {
    this.isToastShowing = false
    // setTimeout(() => this.isToastShowing = true, 2000);
  }
}
