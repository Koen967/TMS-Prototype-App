import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatDialogModule } from '@angular/material';

import { FuseSharedModule } from '@fuse/shared.module';

import { FuseContentComponent } from 'app/main/content/content.component';

@NgModule({
  declarations: [FuseContentComponent],
  imports: [RouterModule, MatDialogModule, FuseSharedModule],
  exports: [FuseContentComponent]
})
export class FuseContentModule {}
