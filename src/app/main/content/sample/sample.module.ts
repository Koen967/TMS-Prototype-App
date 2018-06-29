import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseSampleComponent } from './sample.component';

const routes = [
  {
    path: 'sample',
    component: FuseSampleComponent
  },
  {
    path: 'testRoute1'
  },
  {
    path: 'testRoute2'
  },
  {
    path: 'testRoute3'
  }
];

@NgModule({
  declarations: [FuseSampleComponent],
  imports: [RouterModule.forChild(routes), TranslateModule, FuseSharedModule],
  exports: [FuseSampleComponent]
})
export class FuseSampleModule {}
