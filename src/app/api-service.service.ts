import { Injectable } from '@angular/core';

import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  survey: any;

  constructor(private httpClient: HttpClient) { }
  baseUrl = 'http://localhost:8000';
  header = new HttpHeaders('Content-Type:application/json');

  postQuestions(myform){
    return this.httpClient.post(this.baseUrl+"/questions/",myform,{headers:this.header});
  }

  putQuestion(question, id){
    return this.httpClient.put(this.baseUrl+"/question/"+id+"/",question,{headers:this.header});
  }
  getQuestions(){
    return  this.httpClient.get(this.baseUrl+"/questions/");
  }

  

  getSpecificQuestions(id){
    return  this.httpClient.get(this.baseUrl+"/question/"+id+"/");
  }

  getOptions(){
    return  this.httpClient.get(this.baseUrl+"/options/");
  }

  getLatestQuestion(){
    return  this.httpClient.get(this.baseUrl+"/recent/");
    
  }
  // ---------------
  // save localally
  saveLocalData(survey){
    this.survey = survey;    
  }
  getLocalData(){
    return this.survey;
  }
  // ---------------

  postSurvey(survey){
    // console.log(survey);
    return this.httpClient.post(this.baseUrl+"/survey/",survey,{headers:this.header});
  }

  getSurvey(){
    return this.httpClient.get(this.baseUrl+"/survey/");
  }

  putSurvey(survey,id){
    // console.log(survey)
    // console.log(id)
    // return null
    return this.httpClient.put(this.baseUrl+"/survey/"+id+"/",survey,{headers:this.header});
  }

  deleteSurvey(id){
    return this.httpClient.delete(this.baseUrl+"/survey/"+id+"/");
  }

  deleteQuestion(id){
    return this.httpClient.delete(this.baseUrl+"/question/"+id+"/");
  }

  postResponse(data){
    return this.httpClient.post(this.baseUrl+"/response/",data,{headers:this.header});
  }

  getSpecificResponse(id){
    //send survey id
    return this.httpClient.get(this.baseUrl+"/response/"+id+"/");
  }


  getSurveyResponse(id){
    return this.httpClient.get(this.baseUrl+"/survey-response/"+id+"/");
  }

  getDataForChart(survey_id,question_id){
    return this.httpClient.get(this.baseUrl+"/graph/"+survey_id+"/"+question_id+"/");
  }

  getSpecificSurvey(id){
    return this.httpClient.get(this.baseUrl+"/specific-survey/"+id+"/");
  }

  login(data){
    console.log(data)
    return this.httpClient.post(this.baseUrl+"/login/",data,{headers:this.header});
  }

  getActiveSurvey(){
    return this.httpClient.get(this.baseUrl+"/activeSurvey/");
  }

  getSurveyQuestion(id){
    
    return this.httpClient.get(this.baseUrl+"/surveyQuestion/"+id+"/")
  }
}



