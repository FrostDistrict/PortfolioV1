import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import { Error404Component } from "./error404/error404.component";
import { CrudComponent } from "./crud/crud.component";
import { FormulaireComponent } from "./formulaire/formulaire.component";


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'crud', component: CrudComponent},
  {path: 'formulaire', component: FormulaireComponent},

  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: '**', component: Error404Component}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
