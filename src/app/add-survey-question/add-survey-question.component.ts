import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormArray, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-add-survey-question',
  templateUrl: './add-survey-question.component.html',
  styleUrls: ['./add-survey-question.component.scss']
})
export class AddSurveyQuestionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<AddSurveyQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private fb: FormBuilder,
    private _apiServices: ApiServiceService,
  ){
    this.createForm();
   }

  ngOnInit() {
  }



  isActive = true;
  disableButton=true;
  disableOption=true;
  
  myForm: FormGroup;

  createForm(){
    this.myForm = this.fb.group({
      questionGroup: this.fb.array([
        this.fb.group({
          question: [,Validators.required],
          is_required: [false,Validators.required],
          selected_type: [,Validators.required],
          optionsGroup: this.fb.array([this.fb.group({
                option: [null],
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


  // add options
  addOptions(question){
    console.log('clicked')
    const optionsGrp = this.fb.group({
      option: [null],
    });
    const arr = question.get('optionsGroup') as FormArray;
    arr.push(optionsGrp);
    this.disableOption = false;
  }



  // deleteOptions
  deleteOption(question,i){
    const arr = question.get('optionsGroup') as FormArray;
    arr.removeAt(i);
    console.log(this.myForm.value);
  }



  submit(){
    this._apiServices.postQuestions(this.myForm.value).subscribe((data)=>{
      console.log(data),
      (err)=>console.log(err)
    });

    this.dialogRef.close();
  }

  onCancel(){
    this.dialogRef.close();
  }
}
