import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  signUpForm!: FormGroup
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) { }
  ngOnInit(): void {
    this.signUpForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  //credentials
  signUp() {
    this.http.post<any>("http://localhost:3000/signUp", this.signUpForm.value).
      subscribe(res => {
        alert("Student registered successfully");
        this.signUpForm.reset();
        this.router.navigate(['login'])
      }, err => {
        alert("Something went wrong");
      }

      )
  }

}
