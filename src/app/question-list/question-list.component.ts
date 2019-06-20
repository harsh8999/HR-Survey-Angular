import { ApiServiceService } from './../api-service.service';
import { Component, OnInit } from '@angular/core';
import { QuestionEditComponent } from '../question-edit/question-edit.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit {
  isActive=true;
  questions;
  constructor(private _apiService:ApiServiceService, public dialog: MatDialog) { }

  ngOnInit() {
    this._apiService.getQuestions().subscribe(
      (data)=>{
        this.questions = data;
        console.log(this.questions);
      },
      (err)=>{
        console.log(err)
      }
    )
  }

  deleteQuestion(i){
    this._apiService.deleteQuestion(this.questions[i].id).subscribe(
      (data)=>
      {
        // console.log(data)
        this.questions.splice(i,1)
      }
      )
  }

  openDialog(i){
    this._apiService.saveLocalData(this.questions[i]);
    const dialogRef = this.dialog.open(QuestionEditComponent, {
      width: '1300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
