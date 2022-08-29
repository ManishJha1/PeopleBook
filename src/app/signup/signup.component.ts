
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AdminDetail } from '../interfaces/admin-detail';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  //private adminDetail : AdminDetail | undefined; //means value for undefined will also be assigned
  public adminDetail!: AdminDetail;//for definite assignment assertion.

  constructor(private adminService : AdminService, private router : Router) { }

  ngOnInit(): void {
  }

  // create the form object.
  form = new FormGroup({
      fullName : new FormControl('' , Validators.required),
      email : new FormControl('' , Validators.required),
      password : new FormControl('' , Validators.required),
      confirmPassword : new FormControl('' , Validators.required),
      role : new FormControl('' , Validators.required),
  });

  AdminForm(AdminInformation: any)
  {
     let pass = this.Password?.value;
     let confirmPass = this.ConfirmPassword?.value;

     if(pass == confirmPass)
     {
        this.adminDetail.name = this.FullName?.value;
        this.adminDetail.emailId = this.Email?.value;
        this.adminDetail.password = this.Password?.value;
        this.adminDetail.role = this.Role?.value;

        this.adminService.saveAdminDetails(this.adminDetail).subscribe(
          response => {
              let result = response.json();

              if(result > 0)
              {
                this.router.navigate(['/login']);
              }
              else
              {
                  alert("error occur while registring User. please try after sometime.")
              }
          },
          // error => {
          //   alert("error occur while registring User. please try after sometime.")
          // }
        );

     }
     else
     {
        alert("Password and confirm password not match.");
     }
  }

  get FullName(){
    return this.form.get('fullName');
  }

  get Email(){
      return this.form.get('email');
  }

  get Password(){
      return this.form.get('password');
  }

  get ConfirmPassword(){
      return this.form.get('confirmPassword');
  }

  get Role(){
      return this.form.get('role');
  }


}
