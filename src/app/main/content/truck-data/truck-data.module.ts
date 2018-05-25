import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FuseSharedModule } from '@fuse/shared.module';
import { RouterModule } from '@angular/router';

import { DxDataGridModule } from 'devextreme-angular';
import { NgxsModule } from '@ngxs/store';
import { TruckState } from './store/states/truck.state';

import { TruckDataComponent } from './truck-data.component';
import { TruckDataService } from './truck-data.service';
import { TruckGuard } from './store/guards/truck.guard';
import { TruckDataModalComponent } from './truck-data-modal/truck-data-modal.component';
import {
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatDialogModule,
  MatCheckboxModule
} from '@angular/material';

const routes = [
  {
    path: '',
    component: TruckDataComponent
    // canActivate: [TruckGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    FuseSharedModule,
    RouterModule.forChild(routes),
    NgxsModule.forFeature([TruckState]),
    DxDataGridModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCheckboxModule
  ],
  declarations: [TruckDataComponent, TruckDataModalComponent],
  exports: [TruckDataComponent],
  providers: [TruckDataService, TruckGuard],
  entryComponents: [TruckDataModalComponent]
})
export class TruckDataModule {}
