import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TranslateModule } from '@ngx-translate/core';
import { DxDataGridModule } from 'devextreme-angular';

import { FuseSharedModule } from '@fuse/shared.module';

import { GridComponent } from './grid.component';

@NgModule({
  imports: [TranslateModule, FuseSharedModule, DxDataGridModule],
  declarations: [GridComponent],
  exports: [GridComponent]
})
export class GridModule {}
