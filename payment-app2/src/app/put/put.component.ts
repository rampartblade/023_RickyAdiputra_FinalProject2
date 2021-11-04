import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';


import { Userdata } from 'src/models/userdata';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-put',
  templateUrl: './put.component.html',
  styleUrls: ['./put.component.css']
})
export class PutComponent implements OnInit {

  @Input() id: number = 0
  constructor(
    public activeModal: NgbActiveModal, 
    public databaseService: DatabaseService
  ) { }
  form = {
    updateData: new FormGroup({
      paymentDetailId: new FormControl(''),
      cardOwnerName: new FormControl('', [Validators.required, Validators.minLength(5)]),
      cardNumber: new FormControl('', [Validators.required, Validators.minLength(16)]),
      expirationDate : new FormControl('',[Validators.required, Validators.minLength(3)]),
    })
  }

  database: Userdata[]=[]
  tempNumber:number = 0
  ngOnInit(): void {
    this.databaseService.getDataById(this.id).subscribe(res=>{
      this.form.updateData.controls['cardOwnerName'].setValue(res.cardOwnerName)
      this.form.updateData.controls['cardNumber'].setValue(res.cardNumber)
      this.form.updateData.controls['expirationDate'].setValue(res.expirationDate)
      this.form.updateData.controls['paymentDetailId'].setValue(res.paymentDetailId)
    })
  }

  isNumberKey(event:any): boolean
  {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode != 46 && charCode > 31 
    && (charCode < 48 || charCode > 57))
    return false;
    return true;
  }

  get paymentId(){
    return this.form.updateData.get('id')
  }

  get cardOwnerName(){
    return this.form.updateData.get('cardOwnerName')
  }

  get cardNumber(){
    return this.form.updateData.get('cardNumber')
  }
  
  get expirationDate(){
    return this.form.updateData.get('expirationDate')
  }

  updateUser(id:number){
    if(this.form.updateData.invalid)
    return
    this.databaseService.updateData(id, this.form.updateData.value).subscribe((res: any)=>{
      if(res){
        //this.form.updateData.reset()
        this.databaseService.getAll()
      }
    })
    //console.log(this.form.updateData.value)
    location.reload()
  }
}
