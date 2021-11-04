import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
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
  toastText: string = ""
  isToastShowing: boolean = false
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

  showToast(text: string) {
    this.toastText = text
    this.isToastShowing = true
  }

  onToastHidden() {
    this.isToastShowing = false
    // setTimeout(() => this.isToastShowing = true, 2000);
  }

  addUser(){
    /* if(this.form.inputData.invalid)
    return */
    
    this.databaseService.addData(this.form.inputData.value).subscribe((res)=>{
      if(res){
        this.form.inputData.reset()
        this.databaseService.getAll()
        alert('success')
        location.reload()
      }
    })

  }
}
