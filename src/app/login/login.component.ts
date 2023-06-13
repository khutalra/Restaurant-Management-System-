import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb : FormBuilder , private router :Router , private http :HttpClient){}

loginForm !: FormGroup ;
  ngOnInit(){
      this.loginForm = this.fb.group({
        email : [" "],
        password : [""]
      });
  }
  LogIn(){
    this.http.get<any>("http://localhost:3000/signup/").subscribe((res)=>{
    const user = res.find((a:any)=>{
     return a.email === this.loginForm.value.email &&
     a.password === this.loginForm.value.password
    })
    if (user) {
      alert("user login succreessfully");
      this.loginForm.reset();
      this.router.navigate(['restaurant']);

    } else {
        alert("User not found");
    }
    } ,
    err =>{
      alert("something wrong.");
    });

  }
}
