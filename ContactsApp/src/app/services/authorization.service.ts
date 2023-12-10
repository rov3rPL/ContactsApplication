//https://localhost:7168/api/Authentication/login


import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import config from '../../assets/config/config.json'

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

    constructor(private http: HttpClient, private jwtHelper : JwtHelperService) { }

    // login(): Observable<boolean> {
    //     this.http.get<string>(this.url + 'Authentication/login').subscribe(token => {

    //     });
    // }

    login(credentials: string) {
        
        var loginAction = this.http.post(config.apiServer.url +"Authentication/login", credentials, {
            headers: new HttpHeaders({
              "Content-Type": "application/json"
            })
          });

        loginAction.subscribe(
            response => {
                const token = (<any>response).token;
                localStorage.setItem("jwt", token);
            },
             err => {
                localStorage.removeItem("jwt");
            }
        );

        return loginAction;
    }

    public logOut = () => {
        localStorage.removeItem("jwt");
    }

    isUserAuthenticated() {
        const token = localStorage.getItem("jwt");
        if (token && !this.jwtHelper.isTokenExpired(token)) {
            return true;
        }
        else {
            return false;
        }
    }

}