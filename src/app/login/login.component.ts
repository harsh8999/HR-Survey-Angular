import { Subject } from 'rxjs';
import { ApiServiceService } from './../api-service.service';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formBuilder: any;
  isActive=true

  loginForm: FormGroup;
  


  constructor( private _formBuilder: FormBuilder,
    private _apiService:ApiServiceService) { }

  ngOnInit() {
    this.loginForm = this._formBuilder.group({
      username   : ['', [Validators.required]],
      password: ['', Validators.required]
  });

  
    
  }           
  login(){
    // console.log(this.loginForm);
    this._apiService.login(this.loginForm.value).subscribe(
      data=>{
        console.log(data)
      },
      err=>{
        console.log(err)
      }
    )
    

  }  
}
