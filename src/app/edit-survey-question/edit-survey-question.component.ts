import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ApiServiceService } from '../api-service.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-edit-survey-question',
  templateUrl: './edit-survey-question.component.html',
  styleUrls: ['./edit-survey-question.component.scss']
})
export class EditSurveyQuestionComponent implements OnInit {

  surveyQuestions;
  isActive=true;
  _id:any[]=[];
  startDate;
  endDate;
  questions=[]
  survey;  
  constructor(public dialogRef: MatDialogRef<EditSurveyQuestionComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private _apiServices: ApiServiceService) { }

  ngOnInit() {
    this.survey = this._apiServices.getLocalData();
    console.log(this.survey);
    for (let id of this.survey.questionID){
        this._apiServices.getSpecificQuestions(id).subscribe(
          (data)=>{
            this.questions.push(data)
          }
        )
      } 
      console.log(this.questions)
    this.startDate = this.survey.startDate;
    this.endDate = this.survey.endDate;
  }


  // deleteQuestion(i){
  //   this.survey.questionID.splice(i,1);
  // }


  submit(){
    // call service here
    this.survey.startDate =  new DatePipe('en-US').transform(this.startDate, 'yyyy-MM-dd');
    this.survey.endDate =  new DatePipe('en-US').transform(this.endDate, 'yyyy-MM-dd');
    this._apiServices.putSurvey(this.survey, this.survey.id).subscribe(
      (data)=>
      {
        console.log(data)
      },
      (err)=>{
        console.error(err)
      });
    
    this.dialogRef.close();
  }

  onCancel(){
    this.dialogRef.close();
  }
}
