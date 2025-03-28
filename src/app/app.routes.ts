import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AddressComponent } from './address/address.component';
import { DetailsComponent } from './details/details.component';

export const routes: Routes = [
    {path:'', component:LoginComponent},
    {path:'login', component:LoginComponent},
    {path:'address', component:AddressComponent},
    {path:'details', component:DetailsComponent},
    {path:'pageNotFound', component:PageNotFoundComponent},
    {path:"**", redirectTo:'pageNotFound' }
];
