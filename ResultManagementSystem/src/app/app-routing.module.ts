import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { SearchResultComponent } from './search-result/search-result.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { StudentComponent } from './student/student.component';

const routes: Routes = [
  {path:'login', component:LoginComponent},
  {path:'signUp', component:SignUpComponent},
  {path:'student', component:StudentComponent},
  {path:'home', component:HomeComponent},
  {path:'searchResult', component:SearchResultComponent},
  {path:'', redirectTo:'home',pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
