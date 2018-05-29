import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DialogService } from './dialog.service';
import { ErrorDialogComponent } from './error-dialog/error-dialog.component';
import {
  MatDialogModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule
} from '@angular/material';

@NgModule({
  imports: [
    CommonModule,

    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule
  ],
  declarations: [ErrorDialogComponent],
  entryComponents: [ErrorDialogComponent],
  providers: [DialogService]
})
export class DialogModule {}
