import { AuthGuard } from './guards/auth.guard';
import { ClientsAddComponent } from './components/clients-add/clients-add.component';
import { ClientsEditComponent } from './components/clients-edit/clients-edit.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ClientsListComponent } from './components/clients-list/clients-list.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  {path: "", redirectTo: '/clients', pathMatch: 'full', canActivate: [AuthGuard] },
  {path: "clients", canActivate: [AuthGuard], children: [

    {path: "", component: ClientsListComponent },
    {path: "add", component: ClientsAddComponent },
    {path: ":id/edit", component: ClientsEditComponent },
  ] },
  {path: "register", component: RegisterComponent },
  {path: "login", component: LoginComponent },
  {path: "**", component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
