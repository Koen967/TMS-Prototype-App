import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';

import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';

import { fuseConfig } from './fuse-config';

import { NgxsModule } from '@ngxs/store';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsRouterPluginModule } from '@ngxs/router-plugin';
import { AuthenticationState } from './main/content/pages/authentication/store/states/authentication.state';

import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';
import { AuthenticationGuard } from './main/content/pages/authentication/authentication.guard';

import { JwtModule } from '@auth0/angular-jwt';

export function tokenGetter() {
  return localStorage.getItem('authentication.token');
}

const appRoutes: Routes = [
  {
    path: 'truckData',
    loadChildren: './main/content/truck-data/truck-data.module#TruckDataModule'
  },
  {
    path: 'sample',
    loadChildren: './main/content/sample/sample.module#FuseSampleModule',
    /* canActivate: [AuthenticationGuard], */
    data: { page: 'Sample' }
  },
  {
    path: 'pages',
    loadChildren: './main/content/pages/pages.module#FusePagesModule'
  },
  {
    path: '**',
    redirectTo: '/sample'
  }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(appRoutes),
    TranslateModule.forRoot(),
    NgxsModule.forRoot([AuthenticationState]),
    NgxsRouterPluginModule.forRoot(),
    NgxsStoragePluginModule.forRoot({
      key: 'authentication.token'
    }),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),

    // Fuse Main and Shared modules
    FuseModule.forRoot(fuseConfig),
    FuseSharedModule,
    FuseMainModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:62665']
      }
    })
  ],
  bootstrap: [AppComponent],
  providers: [AuthenticationGuard]
})
export class AppModule {}
