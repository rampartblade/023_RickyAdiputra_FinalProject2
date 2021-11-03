import { Component, OnInit,Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from '../services/database.service';
import { Userdata } from 'src/models/userdata';


@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  @Input() id: number = 0
  database: Userdata[] = []
  constructor(public activeModal: NgbActiveModal, public databaseService: DatabaseService) { }

  ngOnInit(): void {
  }

  getUser(){
    this.databaseService.getAll().subscribe((res:any)=>{
      if(res){
        this.database = res
        //this.dtTrigger.next()
      }
    })
  }

  deleteUser(event:number){
    //console.log(event)
    this.databaseService.deleteData(event).subscribe((res: any)=>{
      if(res){ 
        this.getUser()
        location.reload()
      }
    })
  }
}
