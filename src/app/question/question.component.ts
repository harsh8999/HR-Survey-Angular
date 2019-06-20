
import { Component, OnInit } from '@angular/core';

import {  FormGroup, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';


@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  isActive = true;
  disableButton=true;
  disableOption=true;
  
  myForm: FormGroup;

  constructor(private fb: FormBuilder,
          private _apiServices: ApiServiceService,
         
    ) { 
    this.createForm();
   }


  createForm(){
    this.myForm = this.fb.group({
      questionGroup: this.fb.array([
        this.fb.group({
          question: ['',Validators.required],
          is_required: [false,Validators.required],
          selected_type: [,Validators.required],
          optionsGroup: this.fb.array([this.fb.group({
                option: [,Validators.required],
              })
          ])
        })
      ]),
    });
  }

  get QuestionGroupForm()
  {
    const x =  this.myForm.get('questionGroup') as FormArray;
    return x
  }
  



  // add question
  addQuesion(){
    const questGrp = this.fb.group({
      question: ['',Validators.required],
      is_required: [false,Validators.required],
      selected_type: [,Validators.required],
      optionsGroup: this.fb.array([this.fb.group({
            option: [,Validators.required],
          })
      ])
    });
    this.QuestionGroupForm.push(questGrp);
    this.disableButton = false;
    // console.log((this.myForm.get('question') as FormGroup).get('optionsGroup'));
  }

  // add options
  addOptions(question){
    console.log('clicked')
    const optionsGrp = this.fb.group({
      option: [,Validators.required],
    });
    const arr = question.get('optionsGroup') as FormArray;
    arr.push(optionsGrp);
    this.disableOption = false;
  }


  // delete Questions
  deleteQuestion(i){
    this.QuestionGroupForm.removeAt(i);
    console.log(this.myForm.value);
    
  }

  // deleteOptions
  deleteOption(question,i){
    const arr = question.get('optionsGroup') as FormArray;
    arr.removeAt(i);
    console.log(this.myForm.value);
  }
  
  ngOnInit() {
    
  }


  submit(){
    this._apiServices.postQuestions(this.myForm.value).subscribe((data)=>
    {
      console.log(data);
      
    },
    (err)=>
    {
      console.log(err)
    }
    );
    console.log(this.myForm.value);
    this.myForm.reset();
  }
}