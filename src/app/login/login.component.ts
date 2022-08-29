
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AdminDetail } from '../interfaces/admin-detail';
import { AdminService } from '../services/admin.service';
import { Router } from '@angular/router';
import { emitDistinctChangesOnlyDefaultValue } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public adminDetail! : AdminDetail;

  constructor(private adminService : AdminService, private router : Router) { }

  ngOnInit(): void {
    if((this.adminService.isLoggedIn()) )
    {
        this.router.navigate(['/profile' , localStorage.getItem('id')]);
    }
    else
    {
        this.router.navigate(['/login']);
    }
  }

  // create the form object.
  form = new FormGroup({
    email : new FormControl('' , Validators.required),
    password : new FormControl('' , Validators.required)
  });

   //LoginInformation : HTMLFormElement;

  Login(LoginInformation:HTMLFormElement )
  {
      this.adminDetail.emailId = this.Email?.value;
      this.adminDetail.password = this.Password?.value;

      this.adminService.login(this.adminDetail).subscribe(
        response => {
            let result =  response.json();

            if(result > 0)
            {
              let token = response.headers.get("Authorization");

              localStorage.setItem("token" , token);
              localStorage.setItem("id" , result);

              this.router.navigate(['/profile', result]);
            }
            if(result == -1)
            {
              alert("please register before login Or Invalid combination of Email and password");
            }

        },
        // error => {
        //     console.log("Error in authentication");
        // }
      );
  }

  get Email() {
      return this.form.get('email');
  }

  get Password(){
      return this.form.get('password');
  }

}
