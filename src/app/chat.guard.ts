import { Injectable } from '@angular/core';
import { AuthService } from './services/auth.service';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatGuard  {
  constructor (private authService: AuthService,
               private router : Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
     
    if (this.authService.isAdmin()){
        return true;

        
    }
    else
    {
        this.router.navigate(['app-forbidden']);
        return false;
    }
    }
  
}
