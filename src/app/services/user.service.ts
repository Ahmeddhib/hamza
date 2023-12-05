import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../model/User.model';
import { Role } from '../model/role.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    user! : User;
    role! : Role [];
    
    apiURLUser: String ='http://localhost:8081/users'


    constructor(private http: HttpClient, private  authService:AuthService, private router : Router) {}
    
 


    listeUser():Observable<User[]>{
        
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.get<User[]>(this.apiURLUser+"/all",{headers:httpHeaders});
      }
      
      ajouterUser(user: { password: any; confirmPassword: any; email: any; username: any }): Observable<User> {
          return this.http.post<User>(this.apiURLUser + "/addUser", user);
      }
      
      
      supprimerUser(id : number) {
        const url = `${this.apiURLUser +"/deleteUser"}/${id}`;
        let jwt = this.authService.getToken();
        jwt = "Bearer "+jwt;
        let httpHeaders = new HttpHeaders({"Authorization":jwt})
        return this.http.delete(url, {headers:httpHeaders});
      }
      
      consulterUser(id: number): Observable<User> {
        const url = `${this.apiURLUser +"/getUser"}/${id}`;
        return this.http.get<User>(url);
      }
      
      addRoleToUser(id: number, role: Role) {
        const url = `${this.apiURLUser}/addRole/${id}`;
        return this.http.post(url, role);
      }
      
      getAllRoles() {
        return this.http.get<Role[]>(this.apiURLUser + '/allRoles');
      }
      getRoleById(id: number) {
        return this.http.get<Role>(this.apiURLUser + '/role/' + id);
      }
      
      removeRoleFromUser(id: number, role: Role) {
        const url = `${this.apiURLUser }/removeRole/${id}`;
        return this.http.post(url, role);
      }
      getUserById(id: number) {
        return this.http.get<User>(this.apiURLUser + '/getUser/' + id);
      }
      
      activateUser(username: string, verificationCode: string): Observable<User> {
        const url = `${this.apiURLUser}/activateUser/${username}/${verificationCode}`;
        const body = { verification_code: verificationCode };
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        console.log(url);
        return this.http.post<User>(url, { headers });
      }
      
}