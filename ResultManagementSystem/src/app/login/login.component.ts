import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private http: HttpClient) { }
  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    this.http.get<any>("http://localhost:3000/signUp").
      subscribe(res => {
        //match email & password
        const user = res.find((a: any) => {
          return a.email == this.loginForm.value.email && a.password == this.loginForm.value.password
        })

        if (user) {
          alert("login successfully");
          this.loginForm.reset();
          this.router.navigate(['student'])
        } else {
          alert("User not found");
        }

      }, err => {
        alert("Something went wrong");
      })
  }

}
