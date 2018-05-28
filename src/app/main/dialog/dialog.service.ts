import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';

import { ErrorDialogComponent } from './error-dialog/error-dialog.component';

@Injectable({
  providedIn: 'root'
})
export class DialogService {
  dialogType: string;
  dialogData: any;
  dialogRef: any;

  constructor(private dialog: MatDialog) {}

  openDialog(dialogType: string, dialogData: any) {
    switch (dialogType) {
      case 'Error':
        this.dialogRef = this.dialog.open(ErrorDialogComponent, {
          data: dialogData
        });
        break;
      case '':
        return;
      default:
        return;
    }
    this.dialogRef.afterClosed().subscribe(response => {
      console.log(response);
    });
  }
}
