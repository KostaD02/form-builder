import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './views/home-page/home-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: '**', pathMatch: 'full', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],

  exports: [RouterModule],
})
export class AppRoutingModule {}
