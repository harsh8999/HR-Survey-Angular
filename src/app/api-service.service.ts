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


  getQuestions(){
    return  this.httpClient.get(this.baseUrl+"/questions/");
  }

  getSpecificQuestions(id){
    return  this.httpClient.get(this.baseUrl+"/questions/"+id+"/");
  }

  getOptions(){
    return  this.httpClient.get(this.baseUrl+"/options/");
  }

  getLatestQuestion(){
    return  this.httpClient.get(this.baseUrl+"/recent/");
    
  }
  // ---------------
  // save localally
  saveSurvey(survey){
    this.survey = survey;    
  }
  getPriviewSurvey(){
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

  
}
