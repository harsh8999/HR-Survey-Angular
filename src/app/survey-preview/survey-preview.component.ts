import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { SurveyComponent } from './../survey/survey.component';
import { Component, OnInit } from '@angular/core';
import { ApiServiceService } from '../api-service.service';

@Component({
  selector: 'app-survey-preview',
  templateUrl: './survey-preview.component.html',
  styleUrls: ['./survey-preview.component.scss']
})
export class SurveyPreviewComponent implements OnInit {
  surveyQuestions ;
  isActive=true;
  myForm = this.fb.group({questionGroup: this.fb.array([this.fb.group({})]),});
  
  get QuestionGroupForm()
  {
    const x =  this.myForm.get('questionGroup') as FormArray;
    return x
  }
  
  constructor(private _apiServices: ApiServiceService,private fb: FormBuilder,) { }

  ngOnInit() {
    this.surveyQuestions = this._apiServices.getPriviewSurvey();

    console.log("priview",this.surveyQuestions);

      for (var surveyQuestion of this.surveyQuestions)
      {  
        // console.log("survey",surveyQuestion)
        this.addQuestion(surveyQuestion);
      }
      console.log(this.myForm.value)

      this.QuestionGroupForm.removeAt(0);
      console.log(this.myForm.value)
  }

  addQuestion(surveyQuestion){
    const questGrp = this.fb.group({
      question: surveyQuestion.question,
      is_required: surveyQuestion.is_required,
      selected_type: surveyQuestion.selected_type,
      optionsGroup: this.fb.array([this.fb.group({
        option: [surveyQuestion.options,Validators.required],
      })
  ])
    });

    this.QuestionGroupForm.push(questGrp);
  }

 
}
