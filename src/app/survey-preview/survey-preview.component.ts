import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { CdkDragDrop } from '@angular/cdk/drag-drop/typings/drag-events';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-survey-preview',
  templateUrl: './survey-preview.component.html',
  styleUrls: ['./survey-preview.component.scss']
})
export class SurveyPreviewComponent implements OnInit {
  surveyQuestions;
  isActive=true;
  panelOpenState = false;
  questionId:any[]=[];
  startDate ;
  endDate;

  survey= {
    title : '',
    startDate: null,
    endDate: null,
    questionID : this.questionId
  };

  constructor(private _apiServices: ApiServiceService) { }

  ngOnInit() {
    this.surveyQuestions = this._apiServices.getLocalData();

    console.log("priview",this.surveyQuestions);
    for(let i of this.surveyQuestions){
      this.questionId.push(i.id);
    }
  }
  
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.surveyQuestions, event.previousIndex, event.currentIndex);
  }
  
  postSurvey(){
    this.survey.startDate =  new DatePipe('en-US').transform(this.startDate, 'yyyy-MM-dd');
    this.survey.endDate =  new DatePipe('en-US').transform(this.endDate, 'yyyy-MM-dd');
    this._apiServices.postSurvey(this.survey).subscribe(
      (data)=>
      {
        console.log(data)
      }
      );
  }
}
