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

  getOptions(){
    return  this.httpClient.get(this.baseUrl+"/options/");
  }

  getLatestQuestion(){
    return  this.httpClient.get(this.baseUrl+"/recent/");
    
  }

  saveSurvey(survey){
    this.survey = survey;
   
  }

  getPriviewSurvey(){
    return this.survey;
  }

}
