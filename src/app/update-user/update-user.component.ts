import { Component, OnInit } from '@angular/core';
import { Role } from '../model/role.model';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/User.model';
import { UserService } from '../services/user.service';



@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})

export class UpdateUserComponent implements OnInit{
  
  constructor(
    private userService: UserService,
    private activatedRoute: ActivatedRoute,
    private router : Router
  ) { }
  user: User = new User(); // Initialize with an empty user object
  users: User[] = [];
  role!: Role;
  roles: Role[] = [];
  roleId!: number;
  newRole!: Role;
  oldRole!: Role;
  currentUser = new User();

ngOnInit(): void {
  this.loadUserAndRoles();
}

loadUserAndRoles() {
  this.userService.listeUser().subscribe((users) => {
    this.users = users;
  });

  this.userService
    .getUserById(this.activatedRoute.snapshot.params['id'])
    .subscribe((user) => {
      this.user = user;
    });

  this.userService.getAllRoles().subscribe((roles) => {
    this.roles = roles;
  });
}

addRoleToUser() {
  this.userService
    .addRoleToUser(this.user.user_id, this.newRole)
    .subscribe((data) => {
      console.log('Role added to user');
      this.user.roles.push(this.newRole); // Add the new role to the user's roles
    });
}

removeRoleFromUser(id: number) {
  console.log('ROLE ID: ' + id);
  this.userService.getRoleById(id).subscribe((role) => {
    this.roleId = role.role_id;
    this.oldRole = role;
    console.log('OLD ROLE: ' + this.oldRole);
    this.userService
      .removeRoleFromUser(this.user.user_id, this.oldRole)
      .subscribe((data) => {
        console.log('Role removed from user');
        // Remove the role from the user's roles array
        this.user.roles = this.user.roles.filter(
          (userRole) => userRole.role_id !== id
        );
      });
  });
}


confirmAddRole() {
  if (!this.user.roles.find(role => role.role === this.newRole.role)) {
    // Your logic to add the role to the user goes here
    // Call the function addRoleToUser() or your relevant logic here to add the role

    // After adding the role, you can perform other actions
    // For example, navigation and page reload
    this.addRoleToUser();
    console.log('User modified');

    // Redirect to the user list and force a page reload
    this.router.navigate(['/listeUser'], { skipLocationChange: true }).then(() => {
      window.location.reload();
    });
  } else {
    // If the role is identical, you can display a message without using SweetAlert
    console.log('Aucune modification apportée');
  }
}



confirmDeleteRole(roleId: number) {
  const confirmation = confirm('Voulez-vous vraiment supprimer ce rôle ?');
  if (confirmation) {
    // Your logic to remove the role from the user goes here
    // Call the function removeRoleFromUser(roleId) or your relevant logic here to remove the role
    this.removeRoleFromUser(roleId);
  }
}

}
