
import { Injectable } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AdminDetail } from '../interfaces/admin-detail';
import { Router } from '@angular/router';

import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  // Base URL
  private  baseUrl = "http://localhost:8080/LoginLogoutExample/api/";



  constructor(private httpClient: HttpClient, private router : Router) { }

  saveAdminDetails(adminDetail : AdminDetail) : Observable<any>
  {
      let url = this.baseUrl + "saveAdmin";
      return this.httpClient.post(url,adminDetail);
  }

  login(adminDetail : AdminDetail) : Observable<any>
  {
      let url = this.baseUrl + "login";
      return this.httpClient.post(url, adminDetail);
  }

  logout()
  {
    // Remove the token from the localStorage.
    localStorage.removeItem('token');

    this.router.navigate(['']);

  }

  /*
  * Check whether User is loggedIn or not.
  */

  isLoggedIn() : boolean {

    // create an instance of JwtHelper class.
    let jwtHelper = new JwtHelperService();

    // get the token from the localStorage as we have to work on this token.
    let token = localStorage.getItem('token');

    // check whether if token have something or it is null.
    if(!token)
    {
      return false;
    }

    // get the Expiration date of the token by calling getTokenExpirationDate(String) method of JwtHelper class. this method accepts a string value which is nothing but a token.

    if(token)
    {
      let expirationDate = jwtHelper.getTokenExpirationDate(token);

      // check whether the token is expired or not by calling isTokenExpired() method of JwtHelper class.

      let isExpired = jwtHelper.isTokenExpired(token);

      return !isExpired;
    }
    return false;
  }


  getAdminDetail(adminId: any) : Observable<Object>
  {
      let url = this.baseUrl + "getAdminData/" + adminId;

      // get token from localStorage.
      let token = localStorage.getItem('token');

       // create an instance of Header object.
      let headers = new HttpHeaders()
      .set('content-type', 'application/json')
      .set('Access-Control-Allow-Origin', '*')
      .append('Authorization' , 'Bearer ' + token);

      // Append Authorization header.
     // headers.append('Authorization' , 'Bearer ' + token);

      // create object of RequestOptions and include that in it.
      //let options = new RequestOptions( { headers : headers } );

      return this.httpClient.get(url , { 'headers': headers });
  }
  //{a,b} => a is key and b is value.
}
