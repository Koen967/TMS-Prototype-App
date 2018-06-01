import { NgModule } from '@angular/core';

import { LoginModule } from './authentication/login/login.module';
import { RegisterModule } from './authentication/register/register.module';

@NgModule({
  imports: [
    // Auth
    LoginModule,
    RegisterModule
  ]
})
export class FusePagesModule {}
