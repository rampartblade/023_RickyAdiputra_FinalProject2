import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ignoreElements } from 'rxjs/operators';

import { Userdata } from 'src/models/userdata';
import { DatabaseService } from '../services/database.service';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  database: Userdata[]=[]
  constructor(    
    public databaseService: DatabaseService
  ){}
  ngOnInit(): void {
  }

  isNumberKey(event:any): boolean
  {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 
    && (charCode < 48 || charCode > 57))
    return false;
    return true;
  }

  getUser(){
    this.databaseService.getData().subscribe((res:any)=>{
      if(res){
        this.database = res
        //this.dtTrigger.next()
      }
    })
  }

  
  form = {
    inputData: new FormGroup({
      cardOwnerName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      cardNumber: new FormControl('', [Validators.required, Validators.minLength(16)]),
      securityCode: new FormControl('', [Validators.required, Validators.minLength(3)]),
      expirationDate : new FormControl('',[Validators.required, Validators.minLength(3)]),
    })
  }
  
  get cardOwnerName(){
    return this.form.inputData.get('cardOwnerName')
  }

  get cardNumber(){
    return this.form.inputData.get('cardNumber')
  }
  get securityCode(){
    return this.form.inputData.get('securityCode')
  }
  
  get expirationDate(){
    return this.form.inputData.get('expirationDate')
  }

  addUser(){
    if(this.form.inputData.invalid)
    return alert('data tidak boleh kosong!')
    
    this.databaseService.addData(this.form.inputData.value).subscribe((res)=>{
      if(res){
        this.databaseService.getAll()
        this.form.inputData.reset()
        alert('data berhasil dibuat!')
        location.reload()
      }
    })
  }
}
