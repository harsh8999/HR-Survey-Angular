import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.scss']
})
export class QuestionEditComponent implements OnInit {
  question;
  constructor(public dialogRef: MatDialogRef<QuestionEditComponent>,
    @Inject(MAT_DIALOG_DATA) private data,
    private _apiServices: ApiServiceService) { }

  ngOnInit() {
    this.question = this._apiServices.getLocalData();
    // console.log(this.question)
  }


  submit(){
    // call service here
    this._apiServices.putQuestion(this.question, this.question.id).subscribe(
      (data)=>{
        console.log(data)
      },
      (err)=>{
        console.log(err)
      }
    );

    this.dialogRef.close();
  }

  onCancel(){
    this.dialogRef.close();
  }

  deleteOption(i){
    // console.log(i)
    this.question.options.splice(i,1);
  }

  addOptions(){
    this.question.options.push({
      option:'',
      questionID:this.question.id
    });
  }
}
