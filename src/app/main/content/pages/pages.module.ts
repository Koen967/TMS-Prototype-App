import { NgModule } from '@angular/core';

import { LoginModule } from './authentication/login/login.module';
import { RegisterModule } from './authentication/register/register.module';
import { AuthorisationComponent } from './authentication/authorisation/authorisation.component';
import { AuthorisationModule } from './authentication/authorisation/authorisation.module';

@NgModule({
  imports: [
    // Auth
    LoginModule,
    RegisterModule,
    AuthorisationModule
  ],
  declarations: []
})
export class FusePagesModule {}
