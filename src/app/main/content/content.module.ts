import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseContentComponent } from 'app/main/content/content.component';
import { DialogModule } from '../dialog/dialog.module';

@NgModule({
  declarations: [FuseContentComponent],
  imports: [RouterModule, FuseSharedModule, DialogModule],
  exports: [FuseContentComponent]
})
export class FuseContentModule {}
