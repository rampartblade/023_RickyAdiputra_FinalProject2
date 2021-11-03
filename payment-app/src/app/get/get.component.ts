import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { Userdata } from 'src/models/userdata';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-get',
  templateUrl: './get.component.html',
  styleUrls: ['./get.component.css']
})
export class GetComponent implements OnInit {

  database: Userdata[] = []
  constructor(  
    public databaseService : DatabaseService
    ) { }
  

  ngOnInit(): void {
    this.databaseService.getData().subscribe((res: any)=>{
      if(res) this.database = res
    })
  }
}
