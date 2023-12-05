import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { User } from '../model/User.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css'],
})

export class AddUserComponent {
  form: any = {
    username: null,
    email: null,
    password: null,
    confirmPassword: null,
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private userService: UserService, private router:Router){
  }

  user: User = new User();
  confirmPassword!:string;

  ngOnInit():void{}

  register() {
    const { username, email, password, confirmPassword } = this.form;
    
    if (password !== confirmPassword) {
      this.errorMessage = 'Password and Confirm Password do not match';
      this.isSignUpFailed = true;
      return;
    }
  
    let user = {
      username: username,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };
    console.log(user);
  
    this.userService.ajouterUser(user).subscribe(
      (data) => {
        console.log(data);
        this.router.navigate(['/verification', { username: user.username }]);
      },
      (err) => {
        if (err.error && err.error.message) {
          this.errorMessage = err.error.message;
          this.isSignUpFailed = true;
        } else {
          this.isSuccessful = true;
          this.isSignUpFailed = false;
          this.router.navigate(['/login']);
        }
      }
    );
  }
  



}
