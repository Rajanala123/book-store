import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  login: FormGroup;
  passwordVisible = false;


  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.login = this.formBuilder.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  postLogin() {
    if (this.login.invalid) {
      this.login.markAllAsTouched();
    }
    else {
      const result = this.login.value;
      const reqBody = {
        userName: result.userName,
        password: result.password,
      };

      let data = localStorage.getItem('userDetails');
      if (data) {
        const users = JSON.parse(data);
        const user = users.find(
          (u: any) => u.email === reqBody.userName && u.password === reqBody.password
        );
        if (user) {
          // Store the email of the logged-in user
          localStorage.setItem('currentUserEmail', user.email);
          this.router.navigate(['dashboard']);
        } else {
          alert('Invalid username or password');
        }
      } else {
        alert('No user details found');
      }
    }

  }
  getControl(controlName: string) {
    return this.login.get(controlName);
  }

}
