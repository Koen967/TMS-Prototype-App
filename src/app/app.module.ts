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
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';

import { AppComponent } from './app.component';
import { FuseMainModule } from './main/main.module';

const appRoutes: Routes = [
  {
    path: 'truckData',
    loadChildren: './main/content/truck-data/truck-data.module#TruckDataModule'
  },
  {
    path: 'sample',
    loadChildren: './main/content/sample/sample.module#FuseSampleModule'
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
    NgxsModule.forRoot([]),
    NgxsLoggerPluginModule.forRoot(),
    NgxsReduxDevtoolsPluginModule.forRoot(),

    // Fuse Main and Shared modules
    FuseModule.forRoot(fuseConfig),
    FuseSharedModule,
    FuseMainModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
