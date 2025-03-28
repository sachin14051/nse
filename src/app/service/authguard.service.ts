import { inject, Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, GuardResult, MaybeAsync, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';
import { Router } from 'express';


@Injectable({
  providedIn: 'root'
})
export class AuthguardService implements CanActivate {
  private router = inject(Router);

  constructor(private authService:AuthService) { }
  
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    if (this.authService.isLoggedIn()) {
    this.router.navigate(['/address']);
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
  }
