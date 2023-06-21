import{NgModule} from '@angular/core'
import {Routes, RouterModule} from '@angular/router'
import { PersonsComponent } from './components/persons/persons.component';
import { AddpersonComponent } from './components/addperson/addperson.component';


const routes: Routes = [
  {path:'', component:PersonsComponent},
  {path:'add', component:AddpersonComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
