import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';
import { EditSurveyQuestionComponent } from '../edit-survey-question/edit-survey-question.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-survey-list',
  templateUrl: './survey-list.component.html',
  styleUrls: ['./survey-list.component.scss']
})
export class SurveyListComponent implements OnInit {
  isActiveWidth=true;
  questionID:any[]=[];
  surveyItems;

 

  constructor(private _apiServices: ApiServiceService,public dialog: MatDialog) { }

  ngOnInit() {
    this._apiServices.getSurvey().subscribe(
      (data)=>{
        this.surveyItems = data;
        // console.log("data  ",data)
        // console.log("Survey Items",this.surveyItems);
      }
    )
        
  }

  getQuestions(id){
    this._apiServices.getSpecificQuestions(id).subscribe(
      (data)=>{
        
      }
    )
  }

  deleteSurvey(id,i){
    console.log(id)
    this._apiServices.deleteSurvey(id).subscribe(
      (data)=>{
        console.log(data);
      }
    )

    this.surveyItems.splice(i,1);
  }


  
  openDialog(i): void {

    this._apiServices.saveSurvey(this.surveyItems[i]);
    
    const dialogRef = this.dialog.open(EditSurveyQuestionComponent, {
      width: '1300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  
  startStopSurvey(i){
    // send email logic

   
    this.surveyItems[i].is_active = !this.surveyItems[i].is_active
    
    this._apiServices.putSurvey(this.surveyItems[i], this.surveyItems[i].id).subscribe(
      (data)=>
      {
        console.log(data)
      },
      (err)=>
      {
        console.log(err)
      }
    );
  }

}
