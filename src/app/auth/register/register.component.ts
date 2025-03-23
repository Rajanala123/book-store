import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  registrationForm: FormGroup | any
  passwordVisible = false;
  useExistValidation: any;
  userErrormsgShow:boolean=false

  constructor(private formBuilder: FormBuilder,private router:Router) {

  }

  ngOnInit() {

    this.registrationForm = this.formBuilder.group({
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required]],
      phoneNumber: ['', [Validators.required]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],

    })
  }

  addRegistrationDetails() {
    const result = this.registrationForm.value

    if (this.registrationForm.invalid) {
      console.log('invalid')
      this.registrationForm.markAllAsTouched();


    }
    else {
      const reqBody = {
        firstName: result.firstName,
        lastName: result.lastName,
        email: result.email,
        phoneNumber: result.phoneNumber,
        password: result.password,
        confirmPassword: result.confirmPassword
      }
      console.log(reqBody, 'knfdnakj')
   
   let storedUsers = JSON.parse(localStorage.getItem('userDetails') || '[]');
 storedUsers.push(reqBody);
   localStorage.setItem('userDetails', JSON.stringify(storedUsers));
  this.registrationForm.reset()
  this.showToast();

 this.router.navigate([''])
    }
  }


  showToast() {
    // Select the toast element
    const toastSuccess = document.getElementById('toast-success');
    
    if (toastSuccess) {
      // Show the toast by removing the "hidden" class
      toastSuccess.classList.remove('hidden');
      
      // Hide the toast after 3 seconds
      setTimeout(() => {
        toastSuccess.classList.add('hidden');
      }, 3000);
    }
  }


  // Dynamically get the form control using control name
  getControl(controlName: string) {
    return this.registrationForm.get(controlName);
  }

  loginPage(){
    this.router.navigate([''])
  }

  clear(){
    this.registrationForm.reset()
  }

  userNameValidation(data: any) {
    console.log('Validating email:', data.email);
  
    // Retrieve user details from localStorage
    let userDetailsResponse = localStorage.getItem('userDetails');
    
    if (userDetailsResponse) {
      const users = JSON.parse(userDetailsResponse);
      
      // Find the user with the matching email
      console.log(data)
      const user = users.find((u: any) => u.email === data);
      
      if (user) {
        // If the email exists, perform the validation logic
        console.log('Email already in use:', user);
        // alert('This email is already registered.');
        this.userErrormsgShow = true;

        this.useExistValidation='This email is already registered'
      } else {
        console.log('Email is available');
        this.useExistValidation=''      }
    }
  }
}
