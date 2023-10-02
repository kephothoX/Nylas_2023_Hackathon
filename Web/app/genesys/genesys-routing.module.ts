import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GenesysComponent } from './genesys.component';
import { AdminComponent } from './admin/admin.component';



const routes: Routes = [
  { path: '', component: GenesysComponent },
  { path: 'admin', title: 'Admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GenesysRoutingModule { }
