import { Component } from '@angular/core';
import { User } from '../model/User.model';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { Role } from '../model/role.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent {
  users? : User[];
  roles?: Role[];
  constructor(public authService: AuthService, private userService:UserService) {}

  ngOnInit(): void {
    this.listeUser();
  }

  listeUser(): void {
    this.userService.listeUser().subscribe((users: User[]) => {
      this.users = users;
    });
  }



  supprimerUser(u: User) {
    this.userService.supprimerUser(u.user_id!).subscribe(() => {
      console.log("Utilisateur supprimé");
      this.listeUser();
    });
  }
  

}
