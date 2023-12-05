import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.css']
})
export class VerificationComponent {

  verificationCode!: string; // Using ! to indicate it will be initialized later
  username!: string;
  isLoading: boolean = false;
  msg="";
  constructor(private userService: UserService, private  routerr : ActivatedRoute, private router: Router) {
    this.username=this.routerr.snapshot.paramMap.get('username')!;
    console.log(this.routerr.snapshot.paramMap.get('username'))
  }

  activateUser(username: string, verificationCode: string) {
    this.userService.activateUser(username, verificationCode).subscribe(
      (user) => {
        if (user != null) {
          console.log('User activated successfully:', user);
          this.router.navigate(['/login']);
        } else {
          console.log('User activation failed: Please check your email to enter the correct verification code');
        }
      },
      (error) => {
        console.error('User activation failed:   ', error);
        console.log('User activation failed. Please try again later.');
      }
    );
  }
  
  

}
