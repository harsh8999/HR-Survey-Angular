import { ApiServiceService } from './../api-service.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-responses-list',
    templateUrl: './responses-list.component.html',
  styleUrls: ['./responses-list.component.scss']
})


export class ResponsesListComponent implements OnInit {
  


  isActiveWidth=false;
  ////////////
  
  
  view: any[] = [1000, 300];
  
  colorScheme = {
    // domain: ['#f44336',"#9c27b0","#03a9f4","e91e63","#ffc107"]
    domain: ['#008000',"#FF4500","#FFFF00","#00FF00","#00CED1"]
  };  
  
  onSelect(event) {
    console.log(event);
  }

  ////////////
  

  chart = []; // This will hold our chart info
  myData;
  questionList:any[]=[];
  chartData:any;
  
  constructor(private _apiService: ApiServiceService) {}

  ngOnInit() {
      this._apiService.getSurveyResponse(this._apiService.getLocalData()).subscribe(
      (data)=>{
        this.myData = data
        this.chartData = data[0]['survey_response']
  
        
        this.chartData.forEach(element => {
          this._apiService.getSpecificQuestions(element['q_id']).subscribe(
            (question)=>{
              
              
              if(question['selected_type'] == 'multi_choice'){
                this._apiService.getDataForChart(this._apiService.getLocalData(),element['q_id']).subscribe(
                  res=>{
                    this.questionList.push(question)
                    this.chart.push(res)
                  })
              }
              if(question['selected_type'] == 'radio_button' ){
                this._apiService.getDataForChart(this._apiService.getLocalData(),element['q_id']).subscribe(
                
                  res=>{
                    this.questionList.push(question)
                    this.chart.push(res)
                    
                  })
              }
              if(question['selected_type'] == 'textarea'){
                let c:any[]=[];
                this.questionList.push(question)
                this.myData.forEach(element => {
                  element['survey_response'].forEach(response => {
                    
                    if(response['q_id'] == question['id']){
                      c.push(response['answer'])
                    }
                  });
                });
                this.chart.push(c)
              }
              
            }
          )
        console.log("chart",this.chart)  
        console.log("quetionList",this.questionList)
        });
          
      });
  }
}
