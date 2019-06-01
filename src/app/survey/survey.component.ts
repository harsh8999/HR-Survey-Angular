import { Component, OnInit} from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AddSurveyQuestionComponent } from '../add-survey-question/add-survey-question.component';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  questions=[];
  surveys=[];
  loadComponent
  constructor(private _apiServices: ApiServiceService,
    public dialog: MatDialog) { }

    openDialog(): void {
      const dialogRef = this.dialog.open(AddSurveyQuestionComponent, {
        width: '1300px',
      });
  
      dialogRef.afterClosed().subscribe(result => {
        console.log('The dialog was closed');

        this._apiServices.getLatestQuestion().subscribe((data)=>
        {
          console.log(data);
          this.questions.push(data)
        })
        // console.log(result.questionGroup)
        // this.questions.push(result)
        // this.questions.push(result.questionGroup);
      });
    }

  ngOnInit() { 

    this._apiServices.getQuestions().subscribe(
      (data: [])=>{
        for(let question of data){
          this.questions.push(question)
        }
       
        console.log(this.questions);
       
      })

  }
  
    drop(event: CdkDragDrop<string[]>) {
      if (event.previousContainer === event.container) {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      } 
      else {
        transferArrayItem(event.previousContainer.data,
                          event.container.data,
                          event.previousIndex,
                          event.currentIndex);
      }
      console.log(this.questions);
      console.log(this.surveys);
      
    }
  
    
    // noReturnPredicate() {
    //   return false;
    // }

    addQuesion(question){
      this.surveys.push(question)
    }

    onPreview(){
      this._apiServices.saveSurvey(this.surveys);
    }
  
}