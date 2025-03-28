import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddressComponent } from './address/address.component';
import { DetailsComponent } from './details/details.component';
import { authGuard } from './service/authguard';

export const routes: Routes = [
    {path:'address', component:AddressComponent,canActivate: [authGuard] },
    {path:'', component:LoginComponent},
    {path:'login', component:LoginComponent},
    {path:'details', component:DetailsComponent,canActivate: [authGuard] },
    {path:'pageNotFound', component:PageNotFoundComponent},
    {path:"**", redirectTo:'pageNotFound' }
];
