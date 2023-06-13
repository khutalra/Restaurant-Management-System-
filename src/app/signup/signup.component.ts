import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {

  }
  signupForm !: FormGroup;
  ngOnInit() {
    this.signupForm = this.fb.group({
      name: [""],
      email: [""],
      number: [""],
      password: [""],
    });
  }

  signUp() {
    this.http.post<any>("http://localhost:3000/signup/", this.signupForm.value).subscribe((res) => {
      alert("Registration successfully ");
      this.signupForm.reset();
      this.router.navigate(['login']);

    }
      ,
      err => {
            alert("something Wrong.")
      });

  }


}
