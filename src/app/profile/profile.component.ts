
import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { HttpParams } from '@angular/common/http';
import { AdminDetail } from '../interfaces/admin-detail';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  private adminId: any;
  public haveData= 0;
  public data: AdminDetail[] = [];

  //public data = [];

  public dataRequest = false;

  constructor(public adminService  : AdminService, private route : ActivatedRoute, private router : Router) { }

  ngOnInit() {

    if((this.adminService.isLoggedIn()) )
    {
      // this.route.paramMap.subscribe(params => {
      //   this.adminId =+ params.get('adminId');
      this.route.params.subscribe(
        (params: Params) => {
          this.adminId = +params["id"];
          console.log(this.adminId);
      });
    }
    else
    {
        this.router.navigate(['/login']);
    }

  }

  getAdminData()
  {
      this.haveData = 0;

      this.dataRequest = true;

      this.adminService.getAdminDetail(this.adminId).subscribe(
        response => {
              //let result = response.json();
              let result : any = response;
              this.data = result;

              if(result == " ")
              {
                  this.haveData = 0;
              }
              else
              {
                this.haveData = this.haveData + 1;
              }
          },
          // error => {
          //     console.log("error while getting Admin Data");
          // }
      );
  }

}
function forEach(data: AdminDetail[]) {
  throw new Error('Function not implemented.');
}

