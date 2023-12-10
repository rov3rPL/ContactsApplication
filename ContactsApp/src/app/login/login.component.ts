// import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from "@angular/router";
import { NgForm } from '@angular/forms';
//import config from '../../assets/config/config.json';
//import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthorizationService } from '../services/authorization.service';
//import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'login',
  templateUrl: './login.component.html'
})
export class LoginComponent {
  
  invalidLogin?: boolean;

  //url = config.apiServer.url + '/api/authentication/';

  //constructor(private router: Router, private http: HttpClient
    //, private jwtHelper : JwtHelperService,
    // private toastr: ToastrService) { }
    //) { }
  
  // constructor(private router: Router, private http: HttpClient,
  //   private authorizationService: AuthorizationService) { }

  constructor(private router: Router, 
    private authorizationService: AuthorizationService) { }

  // public login = (form: NgForm) => {
  //   const credentials = JSON.stringify(form.value);
  //   this.http.post(this.url +"login", credentials, {
  //     headers: new HttpHeaders({
  //       "Content-Type": "application/json"
  //     })
  //   }).subscribe(response => {
  //     const token = (<any>response).token;
  //     localStorage.setItem("jwt", token);
  //     this.invalidLogin = false;
  //     //this.toastr.success("Logged In successfully");
  //     this.router.navigate(["/contacts"]);
  //   }, err => {
  //     this.invalidLogin = true;
  //   });
  // }

  // isUserAuthenticated() {
    // const token = localStorage.getItem("jwt");
    // if (token && !this.jwtHelper.isTokenExpired(token)) {
    //   return true;
    // }
    // else {
    //   return false;
    // }
  // }

  public login = (form: NgForm) => {

    const credentials = JSON.stringify(form.value);
    
    this.authorizationService.login(credentials).subscribe(response => {
      //alert("udane logowanie!");
      this.router.navigate(["/contacts"])
    }, err => {
      alert("nieudane logowanie!");
    });
    

  }

}