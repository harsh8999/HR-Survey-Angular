import { questionClass } from './../Class';
import { ApiServiceService } from './../api-service.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, FormArray } from '@angular/forms';


@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {

 
  HighLight=true
  myForm: FormGroup;
  survey_id;
  ActiveData; 
  questions;
  // ActiveNow=[];   //contains data to be shown
  isHighLight=true; 
  ActiveNow;
  answers=[];
  options=[];
  title;

  constructor(private _apiServices:ApiServiceService,
    private fb: FormBuilder,) { }

  ngOnInit() {
    this.createForm();
    ///
    this._apiServices.getActiveSurvey().subscribe(
      (data)=>{
        let  element = data[0]
        this._apiServices.getSurveyQuestion(element['id'])   
        .subscribe(
          (data)=>{
            this.questions=data;
            // console.log("Questions",this.questions)
            this.questions.forEach(question => {
              // console.log("question",question)
              this.options.push(question['options'])
              // console.log('options',this.options)
              this.createOption(question);
            });
    //               this.options.push(this.questions[i].options);
    //               this.createOption(this.questions[i]);
    //               console.log("myForm",this.myForm.value)
    //               i=i+1;    
          },
          err=>{
            console.log("err",err)
          }
        )
        
      }
    );
    ///



    // this._apiServices.getSurvey().subscribe(
    //   (data)=>{
    //     // console.log(data)
    //     this.ActiveData = data;
    //     // console.log(this.ActiveData)
    //     // for(let isActive of this.ActiveData){
    //     //   if(isActive.is_active == true){
    //     //     // this.ActiveNow.push(isActive)
    //     //     this.ActiveNow = isActive
    //     //     this.title = this.ActiveNow.title
    //     //   }
    //     // }
    //     this.ActiveData.forEach(element => {
    //       if(element['is_active'] == true){
    //         // this.ActiveNow.push(isActive)
    //         this.ActiveNow = element
    //         this.title = this.ActiveNow.title
    //       }
    //     });
    //     console.log(this.ActiveNow.title)

    //     let i=0;
    //     for (let id of this.ActiveNow.questionID){
    //       // this.ActiveData.questionID.forEach(element => {
    //          this._apiServices.getSpecificQuestions(id).subscribe(
              
    //           (data)=>{
    //             this.questions.push(data);
    //               this.options.push(this.questions[i].options);
    //               this.createOption(this.questions[i]);
    //               console.log("myForm",this.myForm.value)
    //               i=i+1;    
    //           }
    //         )
    //       }
    //     // );
    //   },
    //   (err)=>{
    //     console.log(err)
    //   }
    // )


  }




  createForm(){
    // console.log("in createForm")
    this.myForm = this.fb.group({
      survey_id : [''],
        employee_id: ['',Validators.required],
        answers: this.fb.array([])
    });
  }

  get AnswerGroupForm(){
    const x =  this.myForm.get('answers') as FormArray;
    return x
  }


  createOption(question){
    // console.log("in CreateOption question=",question.options[0].id)
    // console.log(question.selected_type)
    let _id = question['options'][0]['id']
    let questionID = question['options'][0]['question']
    
    let optionsGrp;
    if(question['selected_type'] != 'multi_choice'){
    
      optionsGrp = this.fb.group({
        id: [_id,Validators.required],
        question: [questionID,Validators.required],
        option: ['',Validators.required]
     });

    
    }
    else{
      // console.log("multi")
      optionsGrp = this.fb.group({
        id: ['',Validators.required],
        question: ['',Validators.required],
        option: ['',Validators.required]
       });
    }
    (this.myForm.get('answers') as FormArray).push(optionsGrp);
  }

  // pushAnswer(question){
  //   // if(question.selected_type == 'textarea'){
  //   // console.log(question)}
  //   if(question.selected_type != 'multi_choice'){
  //     let answer={
  //       survey_id : this.ActiveNow.id,
  //       employee_id: '',
  //       answer: [{
  //         id: question.options[0].id,
  //         question: question.options[0].question,
  //         option: question.options[0].option
  //       }]
  //     };
  //     this.answers.push(answer)
  //   }
  //   else{
  //     let answer={
  //     survey_id : this.ActiveNow.id,
  //     employee_id: '',
  //     answer: []
  //   };
  //   this.answers.push(answer)
  // }
  
  // }

 

  changeOption(i,int,option,choice){
    // console.log(i,int,option,choice)
    
    if(choice == true){
      // this.answers[i].answer.push(this.options[i][int]);
      

      const optionsGrp = this.fb.group({
        id: [this.options[i][int].id,Validators.required],
        question: [this.options[i][int].question,Validators.required],
        option: [this.options[i][int].option,Validators.required]
       });
       this.AnswerGroupForm.push(optionsGrp)
    }
    else{
      const arr = this.AnswerGroupForm;
      let index = 0;
      for (let i of arr.controls){
        // console.log("i",i.value.option)
        if(i.value.option == option){
          // console.log("in if",i.value.option)
          break;
        }
        else{
          index = index + 1
        }
      }
      this.AnswerGroupForm.removeAt(index)
    }
    // console.log("changed",this.answers)
    // console.log("myForm",this.myForm.value)
  }


  changeRadio(i,int,option,choice){
    // console.log(i,int,option,choice)
    if(choice == true){
      // this.answers[i].answer[0].option = this.options[i][int].option;
      this.AnswerGroupForm.at(i).get('option').setValue(this.options[i][int].option);
    }
    // console.log("changed",this.myForm.value)
  }

  submit(){
   
  this.myForm.get('survey_id').setValue(this.ActiveNow.id)
  //  console.log("Submit",this.myForm.value) 
   this._apiServices.postResponse(this.myForm.value).subscribe(
     (data)=>{
       console.log(data)
     },
     (err)=>{
       console.log(err)
     }
   );
  }

}
