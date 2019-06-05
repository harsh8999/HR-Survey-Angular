import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import 'hammerjs';

import { MatTooltipModule } from '@angular/material/tooltip';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatDialogModule } from '@angular/material/dialog';
//Material Section
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { QuestionComponent } from './question/question.component';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatListModule, MatNativeDateModule } from '@angular/material';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {DragDropModule} from '@angular/cdk/drag-drop';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { SurveyComponent } from './survey/survey.component';
import {MatDividerModule} from '@angular/material/divider';
import { AddSurveyQuestionComponent } from './add-survey-question/add-survey-question.component';
import { SurveyPreviewComponent } from './survey-preview/survey-preview.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatMenuModule} from '@angular/material/menu';

import { FormsModule } from '@angular/forms';
import { SurveyListComponent } from './survey-list/survey-list.component';
import { EditSurveyQuestionComponent } from './edit-survey-question/edit-survey-question.component';
@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    SurveyComponent,
    AddSurveyQuestionComponent,
    SurveyPreviewComponent,
    SurveyListComponent,
    EditSurveyQuestionComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatIconModule,
    MatSidenavModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatRadioModule,
    MatCardModule,
    MatCheckboxModule,
    MatTooltipModule,
    HttpClientModule,
    MatListModule,
    DragDropModule,
    MatDividerModule,
    MatDialogModule,
    MatExpansionModule,
    FormsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMenuModule
  ],
  providers: [MatDatepickerModule,],
  bootstrap: [AppComponent],
  entryComponents: [AddSurveyQuestionComponent,EditSurveyQuestionComponent]
})
export class AppModule { }
