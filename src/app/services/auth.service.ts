import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../model/User.model';



@Injectable({
  providedIn: 'root'
})
export class AuthService {

/*  users: User[] = [{"username":"admin","password":"123","roles":['ADMIN']},
                   {"username":"nadhem","password":"123","roles":['USER']} ]; */



apiURL: string = 'http://localhost:8081/users';
token!:string;

public loggedUser!:string;
public isloggedIn: Boolean = false;
public roles!:string[];
private helper = new JwtHelperService();

  constructor(private router : Router,
              private http : HttpClient
) { }

login(user : User)
{
    return this.http.post<User>(this.apiURL+'/login', user , {observe:'response'});
}

saveToken(jwt:string){
  localStorage.setItem('jwt',jwt);
  this.token = jwt;
  this.isloggedIn = true;
  this.decodeJWT();
  }

decodeJWT()
  { if (this.token == undefined)
    return;
  const decodedToken = this.helper.decodeToken(this.token);
  this.roles = decodedToken.roles;
  this.loggedUser = decodedToken.sub;
}

loadToken() {
  this.token = localStorage.getItem('jwt')!;
  this.decodeJWT();
}


getToken():string {
  return this.token;
}

isAdmin():Boolean{
if (!this.roles)
return false;
return this.roles.indexOf('ADMIN') >=0;
}

logout() {
this.loggedUser = undefined!;
this.roles = undefined!;
this.token= undefined!;
this.isloggedIn = false;
localStorage.removeItem('jwt');
this.router.navigate(['/login']);
}

isTokenExpired(): Boolean
{
return this.helper.isTokenExpired(this.token); 
}


  
    
}