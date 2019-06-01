import { QuestionComponent } from './question/question.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SurveyComponent } from './survey/survey.component';
import { SurveyPreviewComponent } from './survey-preview/survey-preview.component';

const routes: Routes = [
  {
    path:'question',
    component:QuestionComponent
  },
  {
    path:'survey',
    component:SurveyComponent
  },
  {
    path:'survey-preview',
    component:SurveyPreviewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
