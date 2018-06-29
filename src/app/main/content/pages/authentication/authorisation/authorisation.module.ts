import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorisationComponent } from './authorisation.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'auth/authorisation',
    component: AuthorisationComponent
  }
];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  declarations: [AuthorisationComponent]
})
export class AuthorisationModule {}
